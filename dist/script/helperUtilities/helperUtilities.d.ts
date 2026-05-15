import type { Jobs } from "../../generated/prisma/client.js";
declare const randomViewport: {
    width: number;
    height: number;
};
declare function hasJobChanged(existingJob: Jobs, scrapedJob: Jobs): boolean;
declare function buildData(job: Jobs): Omit<Jobs, "id" | "formattedData">;
export { buildData, hasJobChanged, randomViewport };
//# sourceMappingURL=helperUtilities.d.ts.map