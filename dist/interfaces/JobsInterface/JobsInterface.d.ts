import type { Prisma } from "../../generated/prisma/client.js";
export interface JobsInterface {
    id: number;
    title: string;
    location: string;
    remoteOrHybrid: string;
    datePosted: Date;
    description: string;
    anchorHref: string;
    companyID: number;
}
export type ScrapedJobsArrayType = {
    title: string | null;
    location: string | null;
    remoteOrHybrid: string | null;
    datePosted: string | null;
    description: string | null;
    anchorHref: string | null;
};
export type JobsWithRelationsType = Prisma.JobsGetPayload<{
    include: {
        company: {
            include: {
                instructions: true;
            };
        };
    };
}>;
//# sourceMappingURL=JobsInterface.d.ts.map