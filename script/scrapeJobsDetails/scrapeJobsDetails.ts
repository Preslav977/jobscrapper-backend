import { prisma } from "../../db/client.js";
import { scrapingJobsDetailsFunction } from "../scrapingJobsDetailsFunction/scrapingJobsDetailsFunction.js";

(async () => {
  try {
    const jobs = await prisma.jobs.findMany({
      include: {
        company: {
          include: {
            instructions: true,
          },
        },
      },
    });

    for (const job of jobs) {
      const scrapedJobsDetails = await scrapingJobsDetailsFunction(job);

      await prisma.jobs.update({
        where: {
          id: scrapedJobsDetails.id!,
        },
        data: {
          description: scrapedJobsDetails.description!,
        },
      });
    }
  } catch (error) {
    console.log(`Failed to update job details: ${error}`);
  }
})();
