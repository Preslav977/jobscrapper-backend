import type { Jobs } from "../../generated/prisma/client.js";
declare const width: number;
declare const height: number;
declare const getRandomTimezone: string | undefined;
declare function hasJobChanged(existingJob: Jobs, scrapedJob: Jobs): boolean;
export { getRandomTimezone, hasJobChanged, height, width };
//# sourceMappingURL=helperUtilities.d.ts.map