import OpenAI from "openai";
import { Browser, Page } from "puppeteer";
import puppeteer from "puppeteer-extra";
import readline from "readline";
import { prisma } from "../db/client.js";
import { Prisma } from "../generated/prisma/client.js";
import { ScrapMode } from "../generated/prisma/enums.js";
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
- Instructions Style: ${JSON.stringify(example.instructions, null, 2)}
- Steps Setup: ${JSON.stringify(example.steps, null, 2)}
---`,
    )
    .join("\n");

  return `
You are an automated self-healing software agent for a Puppeteer web scraper.
Your task is to analyze updated HTML structure alterations and fix selectors cleanly.

CRITICAL SELECTOR PRESERVATION LAWS:
1. **ANCHOR TO OLD VALUES:** Look closely at the "Our Current Configuration" properties below. If an old selector (e.g., a specific tag or class title) is still perfectly valid and uniquely present in the New Cleaned HTML, **do not change it**. Use it exactly as it was.
2. **NO UNNECESSARY CHANGES:** Only modify a selector field if it returns null or is completely broken by the layout updates. Do not invent a new path configuration if the old saved one still works.
3. **SELECTOR DIRECTIVE:** Use the direct parent-child combinator style (e.g., "parent > child") rather than descendant spacing gaps when target adjustments are necessary. Keep it simple.
4. **ENUM AND EMPTY STEPS:** 'scrapMode' must exactly match one of these tokens: ["NAVIGATION", "DIRECT", "FETCH", "JSON"]. If no pagination/navigation elements are required on this screen layout, return 'steps' as an empty array (\`[]\`).

--------------------------------------------------

REFERENCE LIBRARY FOR EXTRACTION STYLE:
${examplesText}

--------------------------------------------------

OUR CURRENT CONFIGURATION (THE BASELINE ANCHOR):
- Target Business Entity: ${brokenCompany.name}
- Configuration Target URL: ${brokenCompany.URL}
- Existing Instructions: ${JSON.stringify(brokenCompany.instructions, null, 2)}
- Existing Navigation Steps: ${JSON.stringify(brokenCompany.steps, null, 2)}

- New Cleaned Target HTML Layout:
${cleanedHtml}

Output raw JSON containing corrected keys directly without markdown wrapper block strings:
`;
}

async function runAutoRepairAgent(
  page: Page,
  brokenCompany: CompanyWithSelectedFieldsType,
): Promise<CompanyWithSelectedFieldsType | null> {
  console.log(`\n🤖 Navigating to target site: ${brokenCompany.URL}...`);

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
            "You are a web scraping configuration healing engineer. Output pure custom structural JSON matching properties precisely.",
        },
        { role: "user", content: finalPrompt },
      ],
    });

    const aiOutput = response.choices[0]?.message?.content;
    if (!aiOutput)
      throw new Error(
        "Empty payload payload stream returned by the AI instance.",
      );

    const proposedUpdate: CompanyWithSelectedFieldsType = JSON.parse(aiOutput);

    const validModes: ScrapMode[] = ["NAVIGATION", "DIRECT", "FETCH", "JSON"];
    if (!validModes.includes(proposedUpdate.scrapMode)) {
      console.warn(
        `⚠️ AI invalidly returned mode "${proposedUpdate.scrapMode}". Falling back to database default: ${brokenCompany.scrapMode}`,
      );
      proposedUpdate.scrapMode = brokenCompany.scrapMode as ScrapMode;
    }

    return proposedUpdate;
  } catch (error) {
    console.error(
      `🚨 Self-healing engine faulted during verification stages:`,
      error,
    );
    return null;
  }
}
async function startInteractiveHealingSession(targetCompanyId: number) {
  console.log(
    `\n🔍 Searching database records for Target Company ID: ${targetCompanyId}...`,
  );

  const brokenCompany = (await prisma.company.findUnique({
    where: { id: targetCompanyId },
    select: {
      id: true,
      name: true,
      URL: true,
      logo: true,
      scrapMode: true,
      instructions: {
        select: { id: true, companyID: true, extractionInstructions: true },
      },
      steps: {
        select: {
          id: true,
          order: true,
          action: true,
          selector: true,
          selectOption: true,
          url: true,
          companyID: true,
        },
      },
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
    console.log("❌ Agent failed to generate an acceptable extraction layout.");
    return;
  }

  console.log("\n==================================================");
  console.log("✨ PROPOSED AUTONOMOUS STRUCTURAL FIX:");
  console.log(JSON.stringify(patchProposal, null, 2));
  console.log("==================================================");

  const isApproved = await askForApproval(
    "\n❓ Do you approve passing this fix profile to the database transactions? (y/n): ",
  );

  if (isApproved) {
    console.log(
      "\n✅ Configuration changes verified! Ready for application router controller parameters...",
    );

    const controllerPayload = {
      companyDetails: JSON.stringify({
        name: patchProposal.name,
        URL: patchProposal.URL,
        logo: patchProposal.logo,
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
      "\n🚀 Output payload structured for updateCompanyWithRelations call:",
    );
    console.log(controllerPayload);
  } else {
    console.log(
      "\n❌ System modification parameters discarded by manual supervisor rejection.",
    );
  }
}

startInteractiveHealingSession(1);
