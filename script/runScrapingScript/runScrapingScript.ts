import { prisma } from "../../db/client.js";
import type { Jobs } from "../../generated/prisma/client.js";
import {
  buildData,
  hasJobChanged,
} from "../helperUtilities/helperUtilities.js";
import { scrapingJobSitesFunction } from "../scrapingJobsSitesFunction/scrapingJobSitesFunction.js";

(async () => {
  try {
    const companies = await prisma.company.findMany({
      include: {
        jobs: true,
        instructions: true,
        steps: true,
      },
      where: {
        id: 2,
      },
    });

    for (const company of companies) {
      const scrapedJobs = await scrapingJobSitesFunction(company);

      const existingJobsMap = new Map(
        company.jobs.map((job) => [job.anchorHref!, job]),
      );

      const existingJobsIds = new Set(company.jobs.map((job) => job.id));

      const scrapedJobsIds: Set<number> = new Set();

      await prisma.$transaction(async (tx) => {
        scrapedJobs.map((scrapedJob) => {
          const existingJob = existingJobsMap.get(scrapedJob.anchorHref!);

          const scrapedJobChanged = hasJobChanged(
            existingJob!,
            scrapedJob as Jobs,
          );

          if (existingJob) {
            scrapedJobsIds.add(existingJob.id);
          } else if (scrapedJobChanged) {
            tx.jobs.update({
              where: {
                id: existingJob!.id,
              },
              data: buildData(scrapedJob as Jobs),
            });
          } else {
            tx.jobs.create({
              data: buildData(scrapedJob as Jobs),
            });
          }
        });

        const jobsToDelete = Array.from(
          existingJobsIds.difference(scrapedJobsIds),
        );

        console.log(jobsToDelete);

        if (jobsToDelete.length > 0) {
          tx.jobs.deleteMany({
            where: {
              id: {
                in: jobsToDelete,
              },
            },
          });
        }
      });
    }
  } catch (error) {
    console.error(`Failed to sync company:`, error);
  }
})();
