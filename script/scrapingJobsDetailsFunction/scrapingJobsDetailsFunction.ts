import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import {
  extractJobsFetchURL,
  extractJobsText,
} from "../extractDataFunctions/extractDataFunctions.js";
import {
  getRandomTimezone,
  height,
  width,
} from "../helperUtilities/helperUtilities.js";
import {
  selectOptionFromDropDown,
  sleepDelay,
  tryClick,
  tryClickEvaluate,
  tryClickLoadMore,
} from "../navigationFunctions/navigationFunctions.js";

import { Page } from "puppeteer";
import type { UtilityInterface } from "../../interfaces/UtilityInterface/UtilityInterface.js";

import UserAgent from "user-agents";
import type { JobsCreateManyInput } from "../../generated/prisma/models.js";
import type { CompanyWithRelationsType } from "../../interfaces/CompanyInterface/CompanyInterface.js";

const stealthPlugin = StealthPlugin();

stealthPlugin.enabledEvasions.add("user-agent-override");

puppeteer.default.use(stealthPlugin);

export async function scrapingJobsFunction(
  companySite: CompanyWithRelationsType,
): Promise<JobsCreateManyInput[]> {
  const { id, URL, scrapMode, instructions, steps } = companySite;

  let scrapingJobsResult: JobsCreateManyInput[] = [];

  let navigationResults: UtilityInterface[] = [];

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

  await page.goto(URL, {
    waitUntil: "load",
  });

  await page.setViewport({ width: width, height: height });

  await page.emulateTimezone(`${getRandomTimezone}`);

  // await sleepDelay(2500);

  // await page.evaluate(() => {
  //   window.scrollTo(0, document.body.scrollHeight);
  // });

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

          console.log(scrapingJobsResult);

          break;
        }

        default: {
          break;
        }
      }
    }

    const checkForNavigationResultsFailures = navigationResults.some(
      (res) => res.status === "failure",
    );

    if (!checkForNavigationResultsFailures && scrapMode === "NAVIGATION") {
      for (const instruction of instructions) {
        const jobScrapingResult = await extractJobsText(page, instruction, id);

        scrapingJobsResult = [...jobScrapingResult];

        await sleepDelay(5000);

        navigationResults = [];

        await browser.close();

        return jobScrapingResult;
      }
    } else if (!checkForNavigationResultsFailures && scrapMode === "FETCH") {
      navigationResults = [];

      await browser.close();
    }
  } catch (error) {
    console.log(
      `Navigation script for jobs failed, check the selectors, ${error}`,
    );

    navigationResults = [];

    await browser.close();

    throw error;
  }

  navigationResults = [];

  await browser.close();

  return scrapingJobsResult;
}
