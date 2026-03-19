import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { extractJobsText } from "../extractDataFunctions/extractDataFunctions.js";
import { getRandomTimezone, height, width, } from "../helperUtilities/helperUtilities.js";
import { selectOptionFromDropDown, sleepDelay, tryClick, tryClickEvaluate, tryClickLoadMore, } from "../navigationFunctions/navigationFunctions.js";
import { Page } from "puppeteer";
puppeteer.default.use(StealthPlugin());
export async function scrapingJobSitesFunction(companySite) {
    const { URL, instructions, steps } = companySite;
    const browser = await puppeteer.default.launch({
        headless: false,
        args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(URL, {
        waitUntil: "load",
    });
    await page.setViewport({ width: width, height: height });
    await page.emulateTimezone(`${getRandomTimezone}`);
    await sleepDelay(2500);
    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
    });
    let navigationResults = [];
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
                    const tryClickEvaluateResult = await tryClickEvaluate(page, step.selector, 3);
                    navigationResults.push({
                        step: step.selector,
                        status: tryClickEvaluateResult,
                    });
                    break;
                }
                case "clickMore": {
                    const tryClickMoreResult = await tryClickLoadMore(page, step.selector);
                    navigationResults.push({
                        step: step.selector,
                        status: tryClickMoreResult,
                    });
                    break;
                }
                case "select": {
                    const selectOptionFromDropDownResult = await selectOptionFromDropDown(page, step.selector, step.selectOption, 3);
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
    }
    catch (error) {
        console.log(`Navigation script failed, reason: ${error}`);
    }
    finally {
        for (const navigationResult of navigationResults) {
            if (navigationResult.status === "success" || steps.length === 0) {
                for (const instruction of instructions) {
                    const jobScrapingResult = await extractJobsText(page, instruction.extractionInstructions);
                    navigationResults = [];
                    await browser.close();
                    // eslint-disable-next-line no-unsafe-finally
                    return jobScrapingResult;
                }
            }
            else {
                navigationResults = [];
                await browser.close();
            }
        }
    }
    return navigationResults;
}
//# sourceMappingURL=scrapingJobSitesFunction.js.map