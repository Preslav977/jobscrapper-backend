import { describe, expect, it } from "vitest";
import { extractJobsFetchURL } from "../../script/extractDataFunctions/extractDataFunctions.js";
describe("Extracting URL integration", () => {
    it("should fetch and retrieve jobs", async () => {
        const mockJob = {
            id: 1,
            url: "https://anthill.bamboohr.com/careers/list",
            companyURL: "https://anthill.bamboohr.com/careers/",
        };
        const jobs = await extractJobsFetchURL(mockJob.id, mockJob.url, mockJob.companyURL);
        expect(jobs).toHaveLength(4);
    });
    it("should return empty array if URL is not correct", async () => {
        const mockJob = {
            id: 1,
            url: "https://anthill.bamboohr.com/careers/lis",
            companyURL: "https://anthill.bamboohr.com/career/",
        };
        const jobs = await extractJobsFetchURL(mockJob.id, mockJob.url, mockJob.companyURL);
        expect(jobs).toEqual([]);
    });
});
//# sourceMappingURL=extractJobsFetchURL.test.js.map