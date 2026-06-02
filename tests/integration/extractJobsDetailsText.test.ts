import { Page } from "puppeteer";
import puppeteer from "puppeteer-extra";
import { describe, expect, it } from "vitest";
import { extractJobsDetailsText } from "../../script/extractDataFunctions/extractDataFunctions.js";

describe("Extract jobs details text implementation", () => {
  it("should extract job details text", async () => {
    const instruction = {
      id: 1,
      extractionInstructions: {
        container: {
          selector: ".data-row",
          extractType: "text",
        },
        title: {
          selector: "a",
          extractType: "text",
        },
        location: {
          extractType: "",
          attr: "",
        },
        remoteOrHybrid: {
          extractType: "",
          selector: "",
        },
        datePosted: { extractType: "", selector: "" },
        description: { extractType: "text", selector: ".job" },
        anchorHref: {
          extractType: "elementAttribute",
          selector: "a",
          attr: "href",
        },
      },
      companyID: 1,
    };

    const browser = await puppeteer.default.launch({
      headless: true,
      args: ["--no-sandbox"],
    });

    const mockPage: Page = await browser.newPage();

    await mockPage.goto(
      "http://127.0.0.1:5500/tests/test-fixtures/adastra-jobs-details.html",
    );

    const jobDetails = await extractJobsDetailsText(mockPage, instruction);

    expect(jobDetails).toBeInstanceOf(Object);

    expect(jobDetails).toHaveProperty("structuredText");

    expect(jobDetails.structuredText).toEqual(jobDetails.structuredText);

    expect(jobDetails).toHaveProperty("rawHTML");

    expect(jobDetails.rawHTML).toEqual(jobDetails!.rawHTML);
  });

  it("should return empty object if description selector is wrong", async () => {
    const instruction = {
      id: 1,
      extractionInstructions: {
        container: {
          selector: ".data-row",
          extractType: "text",
        },
        title: {
          selector: "a",
          extractType: "text",
        },
        location: {
          extractType: "",
          attr: "",
        },
        remoteOrHybrid: {
          extractType: "",
          selector: "",
        },
        datePosted: { extractType: "", selector: "" },
        description: { extractType: "", selector: "" },
        anchorHref: {
          extractType: "elementAttribute",
          selector: "a",
          attr: "href",
        },
      },
      companyID: 1,
    };

    const browser = await puppeteer.default.launch({
      headless: true,
      args: ["--no-sandbox"],
    });

    const mockPage: Page = await browser.newPage();

    await mockPage.goto(
      "http://127.0.0.1:5500/tests/test-fixtures/adastra-jobs-details.html",
    );

    const jobDetails = await extractJobsDetailsText(mockPage, instruction);

    expect(jobDetails.structuredText).toEqual("");

    expect(jobDetails.rawHTML).toEqual("");
  }, 15000);
});
