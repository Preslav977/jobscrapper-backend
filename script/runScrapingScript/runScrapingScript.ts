import { prisma } from "../../db/client.js";
import type { Jobs } from "../../generated/prisma/client.js";
import { hasJobChanged } from "../helperUtilities/helperUtilities.js";
import { scrapingJobSitesFunction } from "../scrapingJobsSitesFunction/scrapingJobSitesFunction.js";

(async () => {
  try {
    const getCompanies = await prisma.company.findMany({
      include: {
        jobs: true,
        instructions: true,
        steps: true,
      },
      where: {
        id: 2,
      },
    });

    for (const company of getCompanies) {
      const existingJobsMap = new Map(
        company.jobs.map((job) => [job.anchorHref!, job]),
      );

      const scrapedJobs = await scrapingJobSitesFunction(company);

      for (const scrapedJob of scrapedJobs) {
        //does scraped jobs existing in the Database
        const existingJob = existingJobsMap.get(scrapedJob.anchorHref!);

        if (existingJob) {
          const hasAnyScrapedJobChanged = hasJobChanged(
            existingJob,
            scrapedJob as Jobs,
          );

          if (hasAnyScrapedJobChanged) {
            await prisma.jobs.update({
              where: {
                id: existingJob.id,
                companyID: scrapedJob.companyID,
              },
              data: {
                title: scrapedJob.title,
                location: scrapedJob.location!,
                remoteOrHybrid: scrapedJob.remoteOrHybrid!,
                datePosted: scrapedJob.datePosted!,
                anchorHref: scrapedJob.anchorHref!,
                description: scrapedJob.description,
                companyID: scrapedJob.companyID,
              },
            });
          }
        } else {
          await prisma.jobs.create({
            data: {
              title: scrapedJob.title,
              location: scrapedJob.location!,
              remoteOrHybrid: scrapedJob.remoteOrHybrid!,
              datePosted: scrapedJob.datePosted!,
              anchorHref: scrapedJob.anchorHref!,
              description: scrapedJob.description,
              companyID: scrapedJob.companyID,
            },
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
})();
