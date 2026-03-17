import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import type { CompanyInterface } from "../interfaces/CompanyInterface/CompanyInterface.js";
import {
  getRandomTimezone,
  height,
  width,
} from "../scriptHelperUtilities/scriptHelperUtilities.js";
import {
  selectOptionFromDropDown,
  sleepDelay,
  tryClick,
  tryClickEvaluate,
  tryClickLoadMore,
} from "../scriptNavigationUtility/scriptNavigationUtility.js";

puppeteer.default.use(StealthPlugin());

export async function scriptScrapJobsSites(companySite: CompanyInterface) {
  const { URL, name, instructions, steps } = companySite;

  const browser = await puppeteer.default.launch({
    headless: false,
    args: ["--no-sandbox"],
  });

  const page = await browser.newPage();

  await page!.goto(URL, {
    waitUntil: "load",
  });

  await page!.setViewport({ width: width, height: height });

  await page!.emulateTimezone(`${getRandomTimezone}`);

  await sleepDelay(2500);

  await page!.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  const navigationResults = [];

  try {
    for (const step of steps) {
      switch (step.action) {
        case "click": {
          const tryClickResult = await tryClick(page, step.selector, 3);

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
            3,
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
            step.option,
            3,
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
  } catch (error) {
    console.log(error);
  } finally {
    //if browserNavigation is successful

    for (const instruction of instructions) {
      const {
        container,
        title,
        location,
        remoteOrHybrid,
        datePosted,
        anchorHref,
      } = instruction.extractionInstructions;
    }
  }
}
