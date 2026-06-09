import { prisma } from "../../db/client.js";
import type { Jobs } from "../../generated/prisma/client.js";
import {
  JobsCreateManyInput,
  JobsUpdateArgs,
} from "../../generated/prisma/models.js";
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

    if (companies.length === 0) return;

    for (const company of companies) {
      try {
        const scrapedJobs = await scrapingJobsFunction(company);

        const existingJobsMap = new Map(
          company.jobs.map((job) => [job.anchorHref, job]),
        );

        const existingJobsIds = new Set(company.jobs.map((job) => job.id));

        const scrapedJobsIds: Set<number> = new Set();

        const jobsToCreate: JobsCreateManyInput[] = [];
        const jobsToUpdate: JobsUpdateArgs[] = [];

        for (const scrapedJob of scrapedJobs) {
          if (!scrapedJob.anchorHref) continue;

          const existingJob = existingJobsMap.get(scrapedJob.anchorHref);

          if (!existingJob) {
            jobsToCreate.push(buildData(scrapedJob as Jobs));
          } else {
            scrapedJobsIds.add(existingJob.id);

            if (hasJobChanged(existingJob, scrapedJob as Jobs)) {
              jobsToUpdate.push({
                where: {
                  id: existingJob.id,
                },
                data: {
                  ...buildData(scrapedJob as Jobs),
                  scrapedText: null,
                  rawHTML: null,
                },
              });
            }
          }
        }

        const jobsToDelete = Array.from(
          existingJobsIds.difference(scrapedJobsIds),
        );

        if (
          jobsToCreate.length > 0 ||
          jobsToUpdate.length > 0 ||
          (jobsToDelete.length > 0 && scrapedJobs.length > 0)
        ) {
          await prisma.$transaction(
            async (tx) => {
              if (jobsToCreate.length > 0) {
                await tx.jobs.createMany({
                  data: jobsToCreate,
                  skipDuplicates: true,
                });
              }

              if (jobsToUpdate.length > 0) {
                await Promise.all(
                  jobsToUpdate.map((updateJob) => tx.jobs.update(updateJob)),
                );
              }

              if (jobsToDelete.length > 0 && scrapedJobs.length > 0) {
                await tx.jobs.deleteMany({
                  where: {
                    id: {
                      in: jobsToDelete,
                    },
                  },
                });
              }
            },
            { maxWait: 2000, timeout: 10000 },
          );
        }

        console.log(
          `Successfully scraped jobs: ${scrapedJobs.length} for ${company.name}`,
        );
      } catch (error) {
        console.error(
          `Failed to scrap jobs for: ${company.name} due to error: ${error}`,
        );
      }
    }
  } catch (error) {
    console.log(
      `Failed to fetch companies from database due to error: ${error}`,
    );
  }
})();
