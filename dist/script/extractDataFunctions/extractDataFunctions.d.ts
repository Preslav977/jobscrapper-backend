import type { Page } from "puppeteer";
import type { ExtractionConfig } from "../../interfaces/InstructionsInterface/InstructionsInterface.js";
import type { ScrapedJobsObjectType } from "../../interfaces/JobsInterface/JobsInterface.js";
declare function extractJobsText(page: Page, { container, title, location, remoteOrHybrid, datePosted, anchorHref, }: ExtractionConfig): Promise<ScrapedJobsObjectType | undefined>;
declare function extractJobsJSON(attribute: string): Promise<ScrapedJobsObjectType>;
declare function extractJobsFetchURL(url: string): Promise<ScrapedJobsObjectType | undefined>;
export { extractJobsFetchURL, extractJobsJSON, extractJobsText };
//# sourceMappingURL=extractDataFunctions.d.ts.map