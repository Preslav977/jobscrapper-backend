import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

import {
  getRandomTimezone,
  height,
  width,
} from "../helperUtilities/helperUtilities.js";

import { Page } from "puppeteer";

import UserAgent from "user-agents";
import type { Jobs } from "../../generated/prisma/client.js";
import type { JobsWithRelationsType } from "../../interfaces/JobsInterface/JobsInterface.js";
import { extractJobsDetailsText } from "../extractDataFunctions/extractDataFunctions.js";
import { sleepDelay } from "../navigationFunctions/navigationFunctions.js";

const stealthPlugin = StealthPlugin();

stealthPlugin.enabledEvasions.add("user-agent-override");

puppeteer.default.use(stealthPlugin);

export async function scrapingJobDetailsSitesFunction(
  job: JobsWithRelationsType,
) {
  const { id, anchorHref } = job;

  const { instructions } = job.company;

  let scrapingJobsDetailsResult: Partial<Jobs> = {};

  const browser = await puppeteer.default.launch({
    headless: false,
    args: [
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--no-first-run",
      "--no-zygote",
      "--enable-webgl",
      "--use-gl=desktop",
      "--disable-automation",
    ],
    ignoreDefaultArgs: ["--enable-automation"],
  });

  const page: Page = await browser.newPage();

  const userAgent = new UserAgent();

  const randomUserAgent = userAgent.toString();

  await page.setUserAgent({ userAgent: randomUserAgent });

  await page.setExtraHTTPHeaders({
    "Accept-Language": "en-US,en;q=0.9",
    Accept: "text/html,application/xhtml+xml",
    "User-Agent": randomUserAgent,
  });

  await page.goto(anchorHref!, {
    waitUntil: "load",
  });

  await page.setViewport({ width: width, height: height });

  await page.emulateTimezone(`${getRandomTimezone}`);

  await sleepDelay(2500);

  try {
    for (const instruction of instructions) {
      const result = await extractJobsDetailsText(page, instruction, id);

      scrapingJobsDetailsResult = { ...result };

      await browser.close();
    }
  } catch (error) {
    console.log(error);
  }
  return scrapingJobsDetailsResult;
}
