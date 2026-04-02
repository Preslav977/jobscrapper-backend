import { prisma } from "../../db/client.js";
import { scrapingJobDetailsSitesFunction } from "../scrapingJobsDetailsSitesFunction/scrapingJobsDetailsSitesFunction.js";

(async () => {
  try {
    const jobs = await prisma.jobs.findMany({
      where: {
        companyID: 2,
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

      console.log(scrapedJobsDetails);
    }
  } catch (error) {
    console.log(error);
  }
})();
