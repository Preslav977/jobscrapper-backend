import { Page } from "puppeteer";
import puppeteer from "puppeteer-extra";
import { describe, expect, it } from "vitest";
import { extractJobsText } from "../../script/extractDataFunctions/extractDataFunctions.js";

describe("Extracting text integration", async () => {
  it("should extract text from jobs", async () => {
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
      "http://127.0.0.1:5500/tests/test-fixtures/adastra.jobs.html",
    );

    const jobs = await extractJobsText(mockPage, instruction, 1);

    expect(jobs).toHaveLength(1);

    expect(jobs[0]).toHaveProperty("title");

    expect(jobs[0]).toHaveProperty("location");

    expect(jobs[0]).toHaveProperty("remoteOrHybrid");

    expect(jobs[0]).toHaveProperty("description");

    expect(jobs[0]).toHaveProperty("anchorHref");

    expect(jobs[0]).toHaveProperty("companyID");
  });

  it.only("should return empty array if no jobs exists", async () => {
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
      "http://127.0.0.1:5500/tests/test-fixtures/no-jobs.html",
    );

    const jobs = await extractJobsText(mockPage, instruction, 1);

    expect(jobs).toEqual([]);
  }, 20000);

  it("should return empty array if no provided instruction", async () => {
    const instruction = {
      id: 1,
      extractionInstructions: {
        container: {
          selector: "",
          extractType: "",
        },
        title: {
          selector: "",
          extractType: "",
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
          extractType: "",
          selector: "",
          attr: "",
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
      "http://127.0.0.1:5500/tests/test-fixtures/no-jobs.html",
    );

    const jobs = await extractJobsText(mockPage, instruction, 1);

    expect(jobs).toEqual([]);
  }, 20000);
});
