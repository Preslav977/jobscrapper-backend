import type { Page } from "puppeteer";
import type { InstructionsInterface } from "../../interfaces/InstructionsInterface/InstructionsInterface.js";
import type { ScrapedJobsArrayType } from "../../interfaces/JobsInterface/JobsInterface.js";
declare function extractJobsText(page: Page, instruction: InstructionsInterface): Promise<ScrapedJobsArrayType[]>;
declare function extractJobsJSON(attribute: string): Promise<ScrapedJobsArrayType>;
declare function extractJobsFetchURL(url: string): Promise<ScrapedJobsArrayType | undefined>;
export { extractJobsFetchURL, extractJobsJSON, extractJobsText };
//# sourceMappingURL=extractDataFunctions.d.ts.map