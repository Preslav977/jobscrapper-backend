import type { JobsWithRelationsType } from "../../interfaces/JobsInterface/JobsInterface.js";
export declare function scrapingJobsDetailsFunction(job: JobsWithRelationsType): Promise<Partial<{
    id: number;
    location: string | null;
    title: string;
    remoteOrHybrid: string | null;
    datePosted: string | null;
    description: string;
    anchorHref: string | null;
    companyID: number;
}>>;
//# sourceMappingURL=scrapingJobsDetailsFunction.d.ts.map