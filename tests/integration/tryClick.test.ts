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

    const mockPage: Page = await browser.newPage();

    await mockPage.goto(
      "http://127.0.0.1:5500/tests/test-fixtures/element.click.html",
    );

    const result = await tryClick(mockPage, ".btn", 5);

    expect(result).toBe("success");
  });
});
