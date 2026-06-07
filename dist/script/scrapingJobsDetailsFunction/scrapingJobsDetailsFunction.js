import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { URL } from "node:url";
import { extractJobsDetailsText } from "../extractDataFunctions/extractDataFunctions.js";
import { randomViewport } from "../helperUtilities/helperUtilities.js";
const stealthPlugin = StealthPlugin();
stealthPlugin.enabledEvasions.add("user-agent-override");
puppeteer.default.use(stealthPlugin);
export async function scrapingJobsDetailsFunction(job) {
    const { id, anchorHref } = job;
    const { instructions } = job.company;
    const constructNewURL = new URL(anchorHref, job.company.URL);
    let scrapingJobsDetailsResult = {
        id,
        scrapedText: "",
        rawHTML: "",
    };
    let browser = null;
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
    const page = await browser.newPage();
    const consistentUA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
    await page.setUserAgent({ userAgent: consistentUA, platform: "Windows" });
    await page.setViewport({
        width: randomViewport.width,
        height: randomViewport.height,
    });
    await page.emulateTimezone("Europe/Sofia");
    await page.setExtraHTTPHeaders({
        "Accept-Language": "en-US,en;q=0.9",
        Accept: "text/html,application/xhtml+xml",
        "User-Agent": consistentUA,
    });
    await page.goto(`${constructNewURL.href}`, {
        waitUntil: "load",
    });
    try {
        if (instructions.length > 0) {
            for (const instruction of instructions) {
                const result = await extractJobsDetailsText(page, instruction);
                scrapingJobsDetailsResult = {
                    id,
                    scrapedText: result.structuredText,
                    rawHTML: result.rawHTML,
                };
                console.log(`Scraping details has succeeded for job: ${job.title} for company ${job.company.name}`);
            }
        }
    }
    catch (error) {
        console.error(`scrapingJobsDetailsFunction failed check the selector due to error: ${error}`);
    }
    finally {
        if (browser) {
            await browser.close();
        }
    }
    return scrapingJobsDetailsResult;
}
//# sourceMappingURL=scrapingJobsDetailsFunction.js.map