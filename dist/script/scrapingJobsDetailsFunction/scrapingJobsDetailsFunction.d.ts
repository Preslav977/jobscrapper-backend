import type { JobsWithRelationsType } from "../../interfaces/JobsInterface/JobsInterface.js";
export declare function scrapingJobsDetailsFunction(job: JobsWithRelationsType): Promise<Pick<{
    description: string | null;
    title: string;
    id: number;
    companyID: number;
    location: string | null;
    remoteOrHybrid: string | null;
    datePosted: string | null;
    anchorHref: string | null;
    scrapedText: string | null;
    rawHTML: string | null;
    formattedData: import("@prisma/client/runtime/client").JsonValue | null;
}, "id" | "rawHTML" | "formattedData">>;
//# sourceMappingURL=scrapingJobsDetailsFunction.d.ts.map