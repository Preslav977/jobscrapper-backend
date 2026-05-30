import { prisma } from "../../db/client.js";
import { scrapingJobsDetailsFunction } from "../scrapingJobsDetailsFunction/scrapingJobsDetailsFunction.js";

(async () => {
  try {
    const pendingJobs = await prisma.jobs.findMany({
      where: {
        formattedData: null,
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

          if (scrapedJobsDetails && scrapedJobsDetails.formattedData) {
            await prisma.jobs.update({
              where: {
                id: job.id,
              },
              data: {
                rawHTML: scrapedJobsDetails.rawHTML,
                formattedData: scrapedJobsDetails.formattedData,
              },
            });
            console.log(
              `[Sync] Successfully updated details for job ID: ${job.id}`,
            );
          } else {
            console.warn(
              `[Sync Warning] Scraper returned empty details payload for job ID: ${job.id}`,
            );
          }
        } catch (error) {
          console.error(
            `[Job Error] Failed to process details for job ID ${job.id}:`,
            error,
          );
        }
      }
    }
  } catch (error) {
    console.error(
      `[Global Error] Fatal failure fetching pending jobs list:`,
      error,
    );
  }
})();
