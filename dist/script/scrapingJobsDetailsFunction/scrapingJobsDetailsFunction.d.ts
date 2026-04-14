import type { JobsWithRelationsType } from "../../interfaces/JobsInterface/JobsInterface.js";
export declare function scrapingJobsDetailsFunction(job: JobsWithRelationsType): Promise<Partial<{
    id: number;
    companyID: number;
    title: string;
    location: string | null;
    remoteOrHybrid: string | null;
    datePosted: string | null;
    anchorHref: string | null;
    description: string;
}>>;
//# sourceMappingURL=scrapingJobsDetailsFunction.d.ts.map