import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

import { URL } from "node:url";

import { Page } from "puppeteer";

import type { Jobs } from "../../generated/prisma/client.js";
import type { JobsWithRelationsType } from "../../interfaces/JobsInterface/JobsInterface.js";
import {
  extractJobsDetailsText,
  parseMarkedUpText,
} from "../extractDataFunctions/extractDataFunctions.js";
import { randomViewport } from "../helperUtilities/helperUtilities.js";
import { sleepDelay } from "../navigationFunctions/navigationFunctions.js";

const stealthPlugin = StealthPlugin();

stealthPlugin.enabledEvasions.add("user-agent-override");

puppeteer.default.use(stealthPlugin);

export async function scrapingJobsDetailsFunction(job: JobsWithRelationsType) {
  const { id, anchorHref } = job;

  const { instructions } = job.company;

  const constructNewURL = new URL(anchorHref!, job.company.URL);

  let scrapingJobsDetailsResult: Partial<Jobs> = {};

  const browser = await puppeteer.default.launch({
    headless: false,
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

  await page.setExtraHTTPHeaders({
    "Accept-Language": "en-US,en;q=0.9",
    Accept: "text/html,application/xhtml+xml",
    "User-Agent": consistentUA,
  });

  await page.goto(`${constructNewURL.href}`, {
    waitUntil: "load",
  });

  await page.setViewport({
    width: randomViewport.width,
    height: randomViewport.height,
  });

  await page.emulateTimezone("Europe/Sofia");

  await sleepDelay(2500);

  try {
    if (instructions.length > 0) {
      for (const instruction of instructions) {
        const result = await extractJobsDetailsText(page, instruction);

        const parseScrapedRes = parseMarkedUpText(result!.structuredText);

        scrapingJobsDetailsResult = {
          id,
          formattedData: parseScrapedRes,
          rawHTML: result!.rawHTML,
        };

        await browser.close();
      }
    }
  } catch (error) {
    console.log(
      `Navigation script for jobs details failed, check the selector, ${error}`,
    );

    return scrapingJobsDetailsResult;
  }

  console.log(
    `Scraping details has succeeded for job: ${job.title} with company ${job.company.name}`,
  );

  return scrapingJobsDetailsResult;
}
