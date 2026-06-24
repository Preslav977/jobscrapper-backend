import OpenAI from "openai";
import { Browser, Page } from "puppeteer";
import puppeteer from "puppeteer-extra";
import readline from "readline";
import { prisma } from "../db/client.js";
import { Prisma } from "../generated/prisma/client.js";
import { ScrapMode } from "../generated/prisma/enums.js";
import { CompanyWithRelationsType } from "../interfaces/CompanyInterface/CompanyInterface.js";
import { randomViewport } from "../script/helperUtilities/helperUtilities.js";

type CompanyWithSelectedFieldsType = Prisma.CompanyGetPayload<{
  select: {
    id: true;
    name: true;
    URL: true;
    logo: true;
    scrapMode: true;
    instructions: {
      select: {
        id: true;
        extractionInstructions: true;
        companyID: true;
      };
    };
    steps: {
      select: {
        id: true;
        order: true;
        action: true;
        selector: true;
        selectOption: true;
        url: true;
        companyID: true;
      };
    };
  };
}>;

const openRouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:5000",
    "X-OpenRouter-Title": "InteractiveJobScraperAgent",
  },
});

const CHOSEN_MODEL = "nvidia/nemotron-3-ultra-550b-a55b:free";

function cleanHtml(rawHtml: string): string {
  return rawHtml
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<svg[^>]*>[\s\S]*?<\/svg>/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function askForApproval(query: string): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans.toLowerCase() === "y" || ans.toLowerCase() === "yes");
    }),
  );
}

async function getHealthyExamples(): Promise<CompanyWithSelectedFieldsType[]> {
  const companyRecords = await prisma.company.findMany({
    include: {
      instructions: true,
      steps: true,
    },
  });

  return companyRecords as CompanyWithSelectedFieldsType[];
}

function buildAdvancedAgentPrompt(
  brokenCompany: CompanyWithSelectedFieldsType,
  healthyExamples: CompanyWithSelectedFieldsType[],
  cleanedHtml: string,
): string {
  const examplesText = healthyExamples
    .map(
      (example, index) => `
### EXAMPLE ${index + 1}: ${example.name}
- Target URL Pattern: ${example.URL}
- Scrap Mode: ${example.scrapMode}
- Core Instructions Schema:
${JSON.stringify(example.instructions, null, 2)}
- Navigation Steps Setup:
${JSON.stringify(example.steps, null, 2)}
---`,
    )
    .join("\n");

  return `
You are an automated self-healing software agent for a Puppeteer web scraper.
The company "${brokenCompany.name}" has changed its website layout, and its current configuration is failing.

YOUR CRITICAL PARAMETER LAWS:
1. **SCRAP MODE ENUM RESTRICTION:** The property 'scrapMode' MUST ONLY be assigned one of these exact values: ["NAVIGATION", "DIRECT", "FETCH", "JSON"]. Do not use lowercase or invent new string labels.
2. **STRICT EXTRACTION TYPES:** For every key field inside 'extractionInstructions', 'extractType' MUST strictly evaluate to either "text" or "attribute".
3. **SELECTOR MINIMALISM:** Use the absolute simplest CSS selector structure possible (e.g., singular class names or plain tags). Avoid unnecessary tracking ID or element parent chaining unless uniquely necessary.
4. **OPTIONAL STEPS FALLBACK:** If listings can be extracted directly from the loaded HTML without interaction, set 'steps' to an empty array (\`[]\`). If steps are present, match the sequence patterns found in our database templates.

--------------------------------------------------

REFERENCE LIBRARY (HEALTHY LOOKUPS):
${examplesText}

--------------------------------------------------

PROBLEM TO RESOLVE:
- Target Company: ${brokenCompany.name}
- Target URL Endpoint: ${brokenCompany.URL}
- Current Broken Setup:
Instructions: ${JSON.stringify(brokenCompany.instructions, null, 2)}
Steps: ${JSON.stringify(brokenCompany.steps, null, 2)}

- Cleaned Live Target HTML:
${cleanedHtml}

OUTPUT SPECIFICATION:
- Return ONLY a valid, plain JSON block containing 'name', 'URL', 'scrapMode', 'instructions', and 'steps' matching our schema exactly. Do not wrap code blocks in markdown fences.
`;
}

async function runAutoRepairAgent(
  page: Page,
  brokenCompany: Omit<CompanyWithRelationsType, "jobs">,
): Promise<CompanyWithSelectedFieldsType | null> {
  console.log(
    `\n🤖 Analyzing live page structural layers for: ${brokenCompany.name}...`,
  );

  await page.goto(brokenCompany.URL, { waitUntil: "networkidle2" });
  const rawHtml = await page.content();
  const cleanedHtml = cleanHtml(rawHtml);

  const healthyExamples = await getHealthyExamples();
  const finalPrompt = buildAdvancedAgentPrompt(
    brokenCompany,
    healthyExamples,
    cleanedHtml,
  );

  try {
    const response = await openRouter.chat.completions.create({
      model: CHOSEN_MODEL,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are a precise web scraping configuration utility. Output clean structural JSON matching our parameters.",
        },
        { role: "user", content: finalPrompt },
      ],
    });

    const aiOutput = response.choices[0]?.message?.content;
    if (!aiOutput)
      throw new Error("Empty response received from execution cluster.");

    const proposedUpdate: CompanyWithSelectedFieldsType = JSON.parse(aiOutput);

    const validModes: ScrapMode[] = ["NAVIGATION", "DIRECT", "FETCH", "JSON"];
    if (!validModes.includes(proposedUpdate.scrapMode)) {
      console.warn(
        `⚠️ Warning: AI attempted to use illegal scrapMode "${proposedUpdate.scrapMode}". Defaulting to DIRECT.`,
      );
      proposedUpdate.scrapMode = "DIRECT";
    }

    return proposedUpdate;
  } catch (error) {
    console.error(
      `🚨 Self-healing engine failed for ${brokenCompany.name}:`,
      error,
    );
    return null;
  }
}

async function startInteractiveHealingSession(targetCompanyId: number) {
  console.log(`\n🔍 Searching database for Company ID: ${targetCompanyId}...`);

  const brokenCompany = (await prisma.company.findUnique({
    where: { id: targetCompanyId },
    include: {
      instructions: true,
      steps: true,
    },
  })) as unknown as CompanyWithSelectedFieldsType;

  if (!brokenCompany) {
    console.error(
      `❌ Error: No company record matches ID ${targetCompanyId} in NeonDB.`,
    );
    return;
  }

  let browser: Browser | null = null;

  browser = await puppeteer.default.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-blink-features=AutomationControlled",
      "--window-position=0,0",
      "--disable-automation",
    ],
    ignoreDefaultArgs: ["--enable-automation"],
  });

  const page: Page = await browser.newPage();

  const consistentUA =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

  await page.setUserAgent({ userAgent: consistentUA, platform: "Windows" });

  await page.setViewport({
    width: randomViewport.width,
    height: randomViewport.height,
  });

  await page.setExtraHTTPHeaders({
    "Accept-Language": "en-US,en;q=0.9",
    Accept: "text/html,application/xhtml+xml",
    "User-Agent": consistentUA,
  });

  await page.emulateTimezone("Europe/Sofia");

  const patchProposal = await runAutoRepairAgent(page, brokenCompany);
  await browser.close();

  if (!patchProposal) {
    console.log(
      "❌ Agent was unable to construct a valid configuration profile path.",
    );
    return;
  }

  console.log("\n==================================================");
  console.log("✨ PROPOSED AUTONOMOUS CONFIGURATION REPAIR:");
  console.log(JSON.stringify(patchProposal, null, 2));
  console.log("==================================================");

  const isApproved = await askForApproval(
    "\n❓ Do you approve applying this update to the application router? (y/n): ",
  );

  if (isApproved) {
    console.log(
      "\n✅ Configuration approved! Mapping payload structures for updateCompanyWithRelations controller...",
    );

    const relationId =
      brokenCompany.instructions[0]?.companyID || brokenCompany.id;

    const controllerPayload = {
      companyDetails: JSON.stringify({
        name: patchProposal.name,
        URL: patchProposal.URL,
        scrapMode: patchProposal.scrapMode,
        instructions: patchProposal.instructions.map((inst, idx) => ({
          id: brokenCompany.instructions[idx]?.id,
          extractionInstructions: inst.extractionInstructions,
          companyID: brokenCompany.instructions[idx]?.companyID,
        })),
        steps: patchProposal.steps,
      }),
    };

    console.log(
      "\n🚀 Outbound HTTP Payload Body generated perfectly for your controller:",
    );
    console.log(controllerPayload);
    console.log(
      "\n🎉 Done. You can now route this object safely to your update api route!",
    );
  } else {
    console.log(
      "\n❌ Update rejected by operator. No records or relations modified.",
    );
  }
}

startInteractiveHealingSession(1);
