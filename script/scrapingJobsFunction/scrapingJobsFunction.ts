import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import {
  extractJobsFetchURL,
  extractJobsText,
} from "../extractDataFunctions/extractDataFunctions.js";
import { randomViewport } from "../helperUtilities/helperUtilities.js";
import {
  selectOptionFromDropDown,
  tryClick,
  tryClickEvaluate,
  tryClickLoadMore,
} from "../navigationFunctions/navigationFunctions.js";

import { Browser, Page } from "puppeteer";
import type { UtilityInterface } from "../../interfaces/UtilityInterface/UtilityInterface.js";

import type { JobsCreateManyInput } from "../../generated/prisma/models.js";
import type { CompanyWithRelationsType } from "../../interfaces/CompanyInterface/CompanyInterface.js";

const stealthPlugin = StealthPlugin();

stealthPlugin.enabledEvasions.add("user-agent-override");

puppeteer.default.use(stealthPlugin);

export async function scrapingJobsFunction(
  company: CompanyWithRelationsType,
): Promise<JobsCreateManyInput[]> {
  const { id, URL, scrapMode, instructions, steps } = company;

  let scrapingJobsResult: JobsCreateManyInput[] = [];

  let browser: Browser | null = null;

  const navigationResults: UtilityInterface[] = [];

  browser = await puppeteer.default.launch({
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

  await page.setViewport({
    width: randomViewport.width,
    height: randomViewport.height,
  });

  await page.setExtraHTTPHeaders({
    "Accept-Language": "en-US,en;q=0.9",
    Accept: "text/html,application/xhtml+xml",
    "User-Agent": consistentUA,
  });

  await page.goto(URL, {
    waitUntil: "load",
  });

  await page.emulateTimezone("Europe/Sofia");

  try {
    for (const step of steps) {
      switch (step.action) {
        case "click": {
          const tryClickResult = await tryClick(page, step.selector, 5);

          navigationResults.push({
            step: step.selector,
            status: tryClickResult,
          });

          break;
        }

        case "clickEvaluate": {
          const tryClickEvaluateResult = await tryClickEvaluate(
            page,
            step.selector,
            5,
          );

          navigationResults.push({
            step: step.selector,
            status: tryClickEvaluateResult,
          });

          break;
        }

        case "clickMore": {
          const tryClickMoreResult = await tryClickLoadMore(
            page,
            step.selector,
          );

          navigationResults.push({
            step: step.selector,
            status: tryClickMoreResult,
          });

          break;
        }

        case "select": {
          const selectOptionFromDropDownResult = await selectOptionFromDropDown(
            page,
            step.selector,
            step.selectOption!,
            5,
          );

          navigationResults.push({
            step: step.selector,
            status: selectOptionFromDropDownResult,
          });

          break;
        }

        case "fetch": {
          const extractJobsFetchURLResult = await extractJobsFetchURL(
            id,
            step.url!,
            URL,
          );

          navigationResults.push({
            step: step.url!,
            status:
              extractJobsFetchURLResult.length > 0 ? "success" : "failure",
          });

          scrapingJobsResult = [...extractJobsFetchURLResult];

          break;
        }

        default: {
          navigationResults.push({
            step: step.selector,
            status: "failure",
          });
          break;
        }
      }
    }

    const executionHasFailures = navigationResults.some(
      (res) => res.status === "failure",
    );

    if (executionHasFailures) {
      throw new Error(
        "Scraping aborted: One or more navigation steps failed to execute.",
      );
    }

    if (scrapMode === "NAVIGATION") {
      for (const instruction of instructions) {
        const jobScrapingResult = await extractJobsText(page, instruction, id);

        scrapingJobsResult.push(...jobScrapingResult);
      }
    }
  } catch (error) {
    console.error(
      `scrapingJobsFunction failed check the selector due to error: ${error} for company: ${company.name} `,
    );

    scrapingJobsResult = [];
  } finally {
    if (browser) {
      await browser.close();
    }
  }

  return scrapingJobsResult;
}
