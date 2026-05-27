import type { JobsWithRelationsType } from "../../interfaces/JobsInterface/JobsInterface.js";
export declare function scrapingJobsDetailsFunction(job: JobsWithRelationsType): Promise<Pick<{
    id: number;
    companyID: number;
    title: string;
    location: string | null;
    remoteOrHybrid: string | null;
    datePosted: string | null;
    description: string | null;
    scrapedText: string | null;
    rawHTML: string | null;
    formattedData: import("@prisma/client/runtime/client").JsonValue | null;
    anchorHref: string | null;
}, "id" | "rawHTML" | "formattedData">>;
//# sourceMappingURL=scrapingJobsDetailsFunction.d.ts.map