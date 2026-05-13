import type { JobsWithRelationsType } from "../../interfaces/JobsInterface/JobsInterface.js";
export declare function scrapingJobsDetailsFunction(job: JobsWithRelationsType): Promise<Partial<{
    responsibilities: string | null;
    requirements: string | null;
    niceToHave: string | null;
    benefits: string | null;
    interviewSteps: string | null;
    title: string;
    id: number;
    location: string | null;
    remoteOrHybrid: string | null;
    datePosted: string | null;
    anchorHref: string | null;
    companyID: number;
}>>;
//# sourceMappingURL=scrapingJobsDetailsFunction.d.ts.map