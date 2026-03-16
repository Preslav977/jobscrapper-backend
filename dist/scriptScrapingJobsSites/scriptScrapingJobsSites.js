import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { tryClick } from "../scriptNavigationUtility/scriptNavigationUtility.js";
puppeteer.default.use(StealthPlugin());
export async function scriptScrapJobsSites(companySite) {
    const { URL, browserNavigation, instructions, steps } = companySite;
    const browser = await puppeteer.default.launch({
        headless: false,
        args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(URL, {
        waitUntil: "load",
    });
    await page.setViewport({ width: 1920, height: 1080 });
    await page.emulateTimezone("Europe/Sofia");
    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
    });
    try {
        for (const step of steps) {
            switch (step.action) {
                case "click":
                    await tryClick(page, step.selector, 5);
                    break;
                default:
                    break;
            }
        }
    }
    catch (error) {
        console.log(error);
    }
    finally {
        //if browserNavigation is successful
        for (const instruction of instructions) {
            const { container, title, location, remoteOrHybrid, datePosted, anchorHref, } = instruction.extractionInstructions;
        }
    }
}
//# sourceMappingURL=scriptScrapingJobsSites.js.map