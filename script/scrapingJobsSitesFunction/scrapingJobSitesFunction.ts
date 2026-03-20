import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import type { CompanyRelationInterface } from "../../interfaces/CompanyInterface/CompanyInterface.js";
import { extractJobsText } from "../extractDataFunctions/extractDataFunctions.js";
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
import type { ScrapedJobsArrayType } from "../../interfaces/JobsInterface/JobsInterface.js";
import type { UtilityInterface } from "../../interfaces/UtilityInterface/UtilityInterface.js";

puppeteer.default.use(StealthPlugin());

export async function scrapingJobSitesFunction(
  companySite: CompanyRelationInterface,
): Promise<ScrapedJobsArrayType[] | UtilityInterface[]> {
  const { URL, instructions, steps } = companySite;

  const browser = await puppeteer.default.launch({
    headless: false,
    args: ["--no-sandbox"],
  });

  const page: Page = await browser.newPage();

  await page.goto(URL, {
    waitUntil: "load",
  });

  await page.setViewport({ width: width, height: height });

  await page.emulateTimezone(`${getRandomTimezone}`);

  await sleepDelay(2500);

  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  let navigationResults: UtilityInterface[] = [];

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

        default: {
          break;
        }
      }
    }

    for (const navigationResult of navigationResults) {
      if (navigationResult.status === "success") {
        for (const instruction of instructions) {
          const jobScrapingResult = await extractJobsText(page, instruction);

          if (jobScrapingResult) {
            await sleepDelay(5000);

            return jobScrapingResult;
          }
        }
      }
    }
  } catch (error) {
    console.log(`Navigation script failed, reason: ${error}`);

    if (error) {
      navigationResults = [];

      await browser.close();
    }
  } finally {
    navigationResults = [];

    await browser.close();
  }

  return navigationResults;
}
