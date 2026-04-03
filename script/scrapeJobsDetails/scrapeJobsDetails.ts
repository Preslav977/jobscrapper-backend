import { prisma } from "../../db/client.js";
import { scrapingJobDetailsSitesFunction } from "../scrapingJobsDetailsSitesFunction/scrapingJobsDetailsSitesFunction.js";

(async () => {
  try {
    const jobs = await prisma.jobs.findMany({
      where: {
        company: {
          OR: [
            {
              scrapMode: "NAVIGATION",
            },
            { scrapMode: "DIRECT" },
          ],
        },
      },
      include: {
        company: {
          include: {
            instructions: true,
          },
        },
      },
    });

    for (const job of jobs) {
      const scrapedJobsDetails = await scrapingJobDetailsSitesFunction(job);

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
