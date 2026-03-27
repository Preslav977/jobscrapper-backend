import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { extractJobsFetchURL, extractJobsText, } from "../extractDataFunctions/extractDataFunctions.js";
import { getRandomTimezone, height, width, } from "../helperUtilities/helperUtilities.js";
import { selectOptionFromDropDown, sleepDelay, tryClick, tryClickEvaluate, tryClickLoadMore, } from "../navigationFunctions/navigationFunctions.js";
import { Page } from "puppeteer";
puppeteer.default.use(StealthPlugin());
export async function scrapingJobSitesFunction(companySite) {
    const { id, URL, instructions, steps } = companySite;
    let scrapingJobsResult = [];
    let navigationResults = [];
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
                    const tryClickEvaluateResult = await tryClickEvaluate(page, step.selector, 5);
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
                    const selectOptionFromDropDownResult = await selectOptionFromDropDown(page, step.selector, step.selectOption, 5);
                    navigationResults.push({
                        step: step.selector,
                        status: selectOptionFromDropDownResult,
                    });
                    break;
                }
                case "fetch": {
                    const extractJobsFetchURLResult = await extractJobsFetchURL(id, step.url);
                    navigationResults.push({
                        step: step.url,
                        status: extractJobsFetchURLResult.length > 0 ? "success" : "failure",
                    });
                    scrapingJobsResult = [...extractJobsFetchURLResult];
                    break;
                }
                default: {
                    break;
                }
            }
        }
        const checkForNavigationResultsFailures = navigationResults.some((res) => res.status === "failure");
        if (!checkForNavigationResultsFailures) {
            for (const instruction of instructions) {
                const jobScrapingResult = await extractJobsText(page, instruction, id);
                scrapingJobsResult = [...jobScrapingResult];
                await sleepDelay(5000);
                navigationResults = [];
                await browser.close();
                return jobScrapingResult;
            }
        }
    }
    catch (error) {
        console.log(`Navigation script failed, reason: ${error}`);
        navigationResults = [];
        await browser.close();
        throw error;
    }
    navigationResults = [];
    await browser.close();
    return scrapingJobsResult;
}
//# sourceMappingURL=scrapingJobSitesFunction.js.map