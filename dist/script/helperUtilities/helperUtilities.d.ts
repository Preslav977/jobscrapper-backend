import type { Jobs } from "../../generated/prisma/client.js";
declare const width: number;
declare const height: number;
declare const getRandomTimezone: string | undefined;
declare function hasJobChanged(existingJob: Jobs, scrapedJob: Jobs): boolean;
declare function buildData(job: Jobs): {
    title: string;
    location: string;
    remoteOrHybrid: string;
    datePosted: string;
    anchorHref: string;
    description: string;
    companyID: number;
};
export { buildData, getRandomTimezone, hasJobChanged, height, width };
//# sourceMappingURL=helperUtilities.d.ts.map