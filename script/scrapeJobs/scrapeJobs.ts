import { prisma } from "../../db/client.js";
import type { Jobs } from "../../generated/prisma/client.js";
import {
  buildData,
  hasJobChanged,
} from "../helperUtilities/helperUtilities.js";
import { scrapingJobsFunction } from "../scrapingJobsFunction/scrapingJobsFunction.js";

(async () => {
  try {
    const companies = await prisma.company.findMany({
      include: {
        jobs: true,
        instructions: true,
        steps: true,
      },
    });

    if (companies.length > 0) {
      for (const company of companies) {
        const scrapedJobs = await scrapingJobsFunction(company);

        const existingJobsMap = new Map(
          company.jobs.map((job) => [job.anchorHref, job]),
        );

        const existingJobsIds = new Set(company.jobs.map((job) => job.id));

        const scrapedJobsIds: Set<number> = new Set();

        await prisma.$transaction(
          async (tx) => {
            for (const scrapedJob of scrapedJobs) {
              const existingJob = existingJobsMap.get(scrapedJob.anchorHref!);

              if (!existingJob) {
                await tx.jobs.create({
                  data: buildData(scrapedJob as Jobs),
                });
              } else if (existingJob) {
                scrapedJobsIds.add(existingJob.id);

                const scrapedJobChanged = hasJobChanged(
                  existingJob!,
                  scrapedJob as Jobs,
                );

                if (scrapedJobChanged) {
                  await tx.jobs.update({
                    where: {
                      id: existingJob.id,
                    },
                    data: buildData(scrapedJob as Jobs),
                  });
                }
              }
            }

            const jobsToDelete = Array.from(
              existingJobsIds.difference(scrapedJobsIds),
            );

            if (jobsToDelete.length > 0) {
              await tx.jobs.deleteMany({
                where: {
                  id: {
                    in: jobsToDelete,
                  },
                },
              });
            }
          },
          {
            maxWait: 5000,
            timeout: 20000,
          },
        );
      }
    }
  } catch (error) {
    console.error(`Failed to sync company:`, error);
  }
})();
