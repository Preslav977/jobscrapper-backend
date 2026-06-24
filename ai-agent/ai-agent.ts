import OpenAI from "openai";
import { Browser, Page } from "puppeteer";
import puppeteer from "puppeteer-extra";
import { prisma } from "../db/client.js";
import { ScrapMode } from "../generated/prisma/enums.js";
import { CompanyWithSelectedFieldsType } from "../interfaces/CompanyInterface/CompanyInterface.js";

interface CompanyWithRelationsTypeId extends CompanyWithSelectedFieldsType {
  id: number;
}

const openRouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:5000",
    "X-OpenRouter-Title": "JobScraperAgent",
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

async function getHealthyExamples(): Promise<CompanyWithRelationsTypeId[]> {
  return (await prisma.company.findMany({
    where: {
      AND: [
        {
          id: 1,
        },
        {
          id: 2,
        },
      ],
    },
    include: {
      instructions: true,
      steps: true,
    },
  })) as unknown as CompanyWithRelationsTypeId[];
}

function buildAdvancedAgentPrompt(
  brokenCompany: CompanyWithRelationsTypeId,
  healthyExamples: CompanyWithRelationsTypeId[],
  cleanedHtml: string,
): string {
  const examplesText = healthyExamples
    .map(
      (company, index) => `
### EXAMPLE ${index + 1}: ${company.name}
- Scrap Mode: ${company.scrapMode}
- Instructions (Text & Attribute mix):
${JSON.stringify(company.instructions, null, 2)}
- Navigation Steps:
${JSON.stringify(company.steps, null, 2)}
---`,
    )
    .join("\n");

  return `
You are an automated self-healing software agent for a Puppeteer web scraper.

We have a system configuration that dictates how we scrape job web pages. Currently, the company "${brokenCompany.name}" has changed its website layout, and its selectors are broken.

Your job is to look at our "Golden Examples" of healthy configurations to understand our exact style, mixing text extraction, attribute extraction, and navigation steps. Then, look at the new HTML from ${brokenCompany.name} and output a brand new, fully corrected configuration.

Here is our Reference Library of healthy configurations to study:
${examplesText}

--------------------------------------------------

PROBLEM TO SOLVE:
The company "${brokenCompany.name}" is broken. 
- Its old configuration was:
Instructions: ${JSON.stringify(brokenCompany.instructions, null, 2)}
Steps: ${JSON.stringify(brokenCompany.steps, null, 2)}

- Here is the new cleaned HTML structure from their live website:
${cleanedHtml}

CRITICAL OUTPUT RULES:
1. Return ONLY a valid JSON object matching our configuration structure.
2. Do NOT include markdown backticks (\`\`\`) or words like "json".
3. Correct BOTH the 'instructions' (selectors/attributes) AND the 'steps' (navigation selectors if the button changed).
4. If a field or step is no longer needed or missing, set its selector to "" or null based on the examples.

Output the fully fixed JSON object matching our schema directly:
`;
}

async function runAutoRepairAgent(
  page: Page,
  brokenCompany: CompanyWithRelationsTypeId,
) {
  console.log(
    `\n🤖 Agent activated! Starting self-healing process for: ${brokenCompany.name}`,
  );

  const rawHtml = await page.content();
  const cleanedHtml = cleanHtml(rawHtml);

  let healthyExamples: CompanyWithRelationsTypeId[] = [];
  try {
    healthyExamples = await getHealthyExamples();
  } catch (dbError) {
    console.warn(
      "⚠️ Could not pull healthy configurations from NeonDB, using empty examples baseline." +
        dbError,
    );
  }

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
            "You are a web scraping self-healing assistant. Output raw JSON configurations containing fixed extraction fields and navigation steps matching the examples provided.",
        },
        {
          role: "user",
          content: finalPrompt,
        },
      ],
    });

    const aiOutput = response.choices[0]?.message?.content;
    if (!aiOutput) throw new Error("AI returned an empty response string.");

    const updatedConfig = JSON.parse(aiOutput);
    console.log(
      `\n✨ Fixed configuration generated successfully for ${brokenCompany.name}!`,
    );
    console.log(JSON.stringify(updatedConfig, null, 2));

    await prisma.company.update({
      where: { id: brokenCompany.id },
      data: updatedConfig,
    });

    return updatedConfig;
  } catch (error) {
    console.error(
      `🚨 Auto-repair agent failed for ${brokenCompany.name}:`,
      error,
    );
    return null;
  }
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

const mockBrokenCompany = {
  id: 1,
  name: "A1 Bulgaria",
  logo: null,
  URL: "https://jobs.a1.com/bg/jobs/?country=bulgaria&job-category=it",
  scrapMode: "NAVIGATION" as ScrapMode,
  instructions: [
    {
      extractionInstructions: {
        container: {
          selector: '[data-company="A1 Bulgaria"]',
          extractType: "text",
        },
        title: {
          selector: "h1",
          extractType: "text",
        },
        location: {
          attr: "location",
          extractType: "atr",
        },
        remoteOrHybrid: {
          selector: "span:nth-child",
          extractType: "text",
        },
        datePosted: { extractType: "", selector: "" },
        description: {
          extractType: "text",
          selector: "main",
        },
        anchorHref: {
          attr: "href",
          extractType: "attribute",
        },
      },
    },
  ],
  steps: [],
};

console.log(await runAutoRepairAgent(page, mockBrokenCompany));
