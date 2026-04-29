import { Page } from "puppeteer";
import puppeteer from "puppeteer-extra";
import { describe, expect, it } from "vitest";
import { tryClick, tryClickEvaluate, } from "../../script/navigationFunctions/navigationFunctions.js";
describe("tryClickEvaluate integration", () => {
    it("tryClickEvaluate should click element on page", async () => {
        const browser = await puppeteer.default.launch({
            headless: true,
            args: ["--no-sandbox"],
        });
        const mockPage = await browser.newPage();
        await mockPage.goto("http://127.0.0.1:5500/tests/test-fixtures/element.click.html");
        const result = await tryClickEvaluate(mockPage, ".btn", 1);
        expect(result).toBe("success");
    });
    it("tryClickEvaluate should fail if the element doesn't exist on page", async () => {
        const browser = await puppeteer.default.launch({
            headless: false,
            args: ["--no-sandbox"],
        });
        const mockPage = await browser.newPage();
        await mockPage.goto("http://127.0.0.1:5500/tests/test-fixtures/element.click.html");
        const result = await tryClickEvaluate(mockPage, "btn", 1);
        console.log(result);
        expect(result).toBe("failure");
    }, 12000);
    it("tryClickEvaluate should fail if attempts are lower than 1", async () => {
        const browser = await puppeteer.default.launch({
            headless: true,
            args: ["--no-sandbox"],
        });
        const mockPage = await browser.newPage();
        await mockPage.goto("http://127.0.0.1:5500/tests/test-fixtures/element.click.html");
        const result = await tryClick(mockPage, "btn", 0);
        expect(result).toBe("failure");
    }, 10000);
});
//# sourceMappingURL=tryClickEvaluate.test.js.map