import { prisma } from "../../db/client.js";
import { scrapingJobsDetailsFunction } from "../scrapingJobsDetailsFunction/scrapingJobsDetailsFunction.js";

(async () => {
  try {
    const pendingJobs = await prisma.jobs.findMany({
      where: {
        scrapedText: null,
      },

      include: {
        company: {
          include: {
            instructions: true,
          },
        },
      },
    });

    if (pendingJobs.length > 0) {
      for (const job of pendingJobs) {
        try {
          const scrapedJobsDetails = await scrapingJobsDetailsFunction(job);

          if (scrapedJobsDetails && scrapedJobsDetails.scrapedText) {
            await prisma.jobs.update({
              where: {
                id: job.id,
              },
              data: {
                rawHTML: scrapedJobsDetails.rawHTML,
                scrapedText: scrapedJobsDetails.scrapedText,
              },
            });
            console.log(
              `Successfully scraped job details ${job.title} for ${job.company.name}`,
            );
          } else {
            console.warn(
              `Failed to scrap jobs details for ${job.title} check the ID: ${job.id}`,
            );
          }
        } catch (error) {
          console.error(
            `Failed to scrap jobs details for ${job.title} due to error: ${error}`,
          );
        }
      }
    }
  } catch (error) {
    console.error(
      `Failed to fetch jobs details from database due to error :${error}`,
    );
  }
})();
