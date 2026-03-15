import type { Page } from "puppeteer";
import type { ExtractionConfig } from "../interfaces/InstructionsInterface/InstructionsInterface.js";
declare function extractJobsText(page: Page, { container, title, location, remoteOrHybrid, datePosted, anchorHref, }: ExtractionConfig): Promise<{
    success: true | false | null;
    jobs: Array<{
        title: string | null | undefined;
        location: string | null | undefined;
        remoteOrHybrid: string | null | undefined;
        datePosted: string | null | undefined;
        anchorHref: string | null | undefined;
    }>;
    err: string | null | unknown;
} | undefined>;
export { extractJobsText };
//# sourceMappingURL=scriptExtractUtility.d.ts.map