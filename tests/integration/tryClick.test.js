import { Page } from "puppeteer";
import puppeteer from "puppeteer-extra";
import { describe, expect, it } from "vitest";
import { tryClick } from "../../script/navigationFunctions/navigationFunctions.js";
describe("tryClick integration", () => {
    it("tryClick should click element on page", async () => {
        const browser = await puppeteer.default.launch({
            headless: true,
            args: ["--no-sandbox"],
        });
        const mockPage = await browser.newPage();
        await mockPage.goto("http://127.0.0.1:5500/tests/test-fixtures/element.click.html");
        const result = await tryClick(mockPage, ".btn", 1);
        expect(result).toBe("success");
    });
    it("tryClick should fail if the element doesn't exist on page", async () => {
        const browser = await puppeteer.default.launch({
            headless: true,
            args: ["--no-sandbox"],
        });
        const mockPage = await browser.newPage();
        await mockPage.goto("http://127.0.0.1:5500/tests/test-fixtures/element.click.html");
        const result = await tryClick(mockPage, "btn", 1);
        expect(result).toBe("failure");
    }, 20000);
    it("tryClick should fail if attempts are lower than 1", async () => {
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
//# sourceMappingURL=tryClick.test.js.map