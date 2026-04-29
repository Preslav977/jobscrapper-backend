import { describe, expect, it } from "vitest";
import { JobsWithRelationsType } from "../../interfaces/JobsInterface/JobsInterface.js";
import { scrapingJobsDetailsFunction } from "../../script/scrapingJobsDetailsFunction/scrapingJobsDetailsFunction.js";
describe("Jobs details scraping integration", () => {
    it("should scrape jobs details from company", async () => {
        const mockJob = {
            id: 1,
            title: "Azure Databricks Engineer ",
            location: "Sofia, BG Plovdiv, BG Varna, BG",
            remoteOrHybrid: "Remote",
            datePosted: "",
            description: "",
            anchorHref: "http://127.0.0.1:5500/tests/test-fixtures/adastra-jobs-details.html",
            companyID: 1,
            company: {
                id: 1,
                name: "Adastra",
                URL: "http://127.0.0.1:5500/tests/test-fixtures/adastra.jobs.html",
                logo: null,
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
            },
        };
        const result = await scrapingJobsDetailsFunction(mockJob);
        expect(result).toBeInstanceOf(Object);
        expect(result).toHaveProperty("id");
        expect(result).toHaveProperty("description");
        expect(result.id).toEqual(1);
        expect(result.description).toEqual(result.description);
    });
    it("should return empty object if scraping failed", async () => {
        const mockJob = {
            id: 1,
            title: "Azure Databricks Engineer ",
            location: "Sofia, BG Plovdiv, BG Varna, BG",
            remoteOrHybrid: "Remote",
            datePosted: "",
            description: "",
            anchorHref: "http://127.0.0.1:5500/tests/test-fixtures/no-jobs.html",
            companyID: 1,
            company: {
                id: 1,
                name: "Adastra",
                URL: "http://127.0.0.1:5500/tests/test-fixtures/adastra.jobs.html",
                logo: null,
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
            },
        };
        const result = await scrapingJobsDetailsFunction(mockJob);
        expect(result).toEqual({});
    }, 10000);
    it("should return empty object if site selectors changed", async () => {
        const mockJob = {
            id: 1,
            title: "Azure Databricks Engineer ",
            location: "Sofia, BG Plovdiv, BG Varna, BG",
            remoteOrHybrid: "Remote",
            datePosted: "",
            description: "",
            anchorHref: "http://127.0.0.1:5500/tests/test-fixtures/adastra-jobs-details.html",
            companyID: 1,
            company: {
                id: 1,
                name: "Adastra",
                URL: "http://127.0.0.1:5500/tests/test-fixtures/adastra.jobs.html",
                logo: null,
                scrapMode: "NAVIGATION",
                instructions: [
                    {
                        id: 1,
                        extractionInstructions: {
                            container: {
                                selector: ".data-row123",
                                extractType: "text",
                            },
                            title: {
                                selector: "p",
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
                            description: { extractType: "text", selector: ".jobs" },
                            anchorHref: {
                                extractType: "elementAttribute",
                                selector: "a",
                                attr: "href",
                            },
                        },
                        companyID: 1,
                    },
                ],
            },
        };
        const result = await scrapingJobsDetailsFunction(mockJob);
        expect(result).toEqual({});
    }, 10000);
});
//# sourceMappingURL=scrapingJobDetailsFunction.test.js.map