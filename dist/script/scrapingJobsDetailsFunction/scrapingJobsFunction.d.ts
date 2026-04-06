import type { JobsWithRelationsType } from "../../interfaces/JobsInterface/JobsInterface.js";
export declare function scrapingJobsDetailsFunction(job: JobsWithRelationsType): Promise<Partial<{
    id: number;
    title: string;
    location: string | null;
    remoteOrHybrid: string | null;
    datePosted: string | null;
    description: string;
    anchorHref: string | null;
    companyID: number;
}>>;
//# sourceMappingURL=scrapingJobsFunction.d.ts.map