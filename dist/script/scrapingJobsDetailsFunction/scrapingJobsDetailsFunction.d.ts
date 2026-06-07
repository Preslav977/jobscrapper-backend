import type { Jobs } from "../../generated/prisma/client.js";
import type { JobsWithRelationsType } from "../../interfaces/JobsInterface/JobsInterface.js";
type ScrapedJobsDetails = Pick<Jobs, "id" | "scrapedText" | "rawHTML">;
export declare function scrapingJobsDetailsFunction(job: JobsWithRelationsType): Promise<ScrapedJobsDetails>;
export {};
//# sourceMappingURL=scrapingJobsDetailsFunction.d.ts.map