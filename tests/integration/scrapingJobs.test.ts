import { describe, expect, it } from "vitest";
import { CompanyWithRelationsType } from "../../interfaces/CompanyInterface/CompanyInterface.js";
import { scrapingJobsFunction } from "../../script/scrapingJobsFunction/scrapingJobsFunction.js";

describe("Company scraping integration", () => {
  it("should scrape jobs from company with navigation steps", async () => {
    const mockCompany: CompanyWithRelationsType = {
      id: 1,
      name: "Company",
      logo: null,
      URL: "http://127.0.0.1:5500/tests/test-fixtures/adastra.jobs.html",
      scrapMode: "NAVIGATION",
      instructions: [
        {
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
        },
      ],
      steps: [],
      jobs: [],
    };

    const result = await scrapingJobsFunction(mockCompany);

    expect(result).toBeInstanceOf(Array);

    expect(result[0]).toHaveProperty("title");

    expect(result[0]).toHaveProperty("location");

    expect(result[0]).toHaveProperty("remoteOrHybrid");

    expect(result[0]).toHaveProperty("datePosted");

    expect(result[0]).toHaveProperty("anchorHref");

    expect(result[0]).toHaveProperty("companyID");
  }, 10000);
});
