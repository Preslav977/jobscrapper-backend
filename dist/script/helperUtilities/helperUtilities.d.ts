import type { Jobs } from "../../generated/prisma/client.js";
declare const width: number;
declare const height: number;
declare const getRandomTimezone: string | undefined;
declare function hasJobChanged(existingJob: Jobs, scrapedJob: Jobs): boolean;
declare function buildData(job: Jobs): Omit<Jobs, "id">;
export { buildData, getRandomTimezone, hasJobChanged, height, width };
//# sourceMappingURL=helperUtilities.d.ts.map