import type { Page } from "puppeteer";
import type { Instructions } from "../../generated/prisma/client.js";
import type { JobsCreateManyInput } from "../../generated/prisma/models.js";
declare function extractJobsText(page: Page, instruction: Instructions, id: number): Promise<JobsCreateManyInput[]>;
declare function extractJobsDetailsText(page: Page, instruction: Instructions): Promise<{
    structuredText: string;
    rawHTML: string;
}>;
declare function parseMarkedUpText(rawText: string): {
    responsibilities: string[];
    requirements: string[];
    benefits: string[];
    other: string[];
};
declare function extractJobsJSON(attribute: string): Promise<JobsCreateManyInput[]>;
declare function extractJobsFetchURL(id: number, url: string, companyURL: string): Promise<JobsCreateManyInput[]>;
export { extractJobsDetailsText, extractJobsFetchURL, extractJobsJSON, extractJobsText, parseMarkedUpText, };
//# sourceMappingURL=extractDataFunctions.d.ts.map