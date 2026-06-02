import type { JobsWithRelationsType } from "../../interfaces/JobsInterface/JobsInterface.js";
export declare function scrapingJobsDetailsFunction(job: JobsWithRelationsType): Promise<Pick<{
    id: number;
    location: string | null;
    title: string;
    remoteOrHybrid: string | null;
    datePosted: string | null;
    description: string;
    scrapedText: string | null;
    rawHTML: string | null;
    formattedData: import("@prisma/client/runtime/client").JsonValue | null;
    anchorHref: string | null;
    createdAt: Date;
    updateAt: Date;
    companyID: number;
}, "id" | "scrapedText" | "rawHTML">>;
//# sourceMappingURL=scrapingJobsDetailsFunction.d.ts.map