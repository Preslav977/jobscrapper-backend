import { prisma } from "../../db/client.js";
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

    console.log(getCompanies);

    for (const company of getCompanies) {
      const result = await scrapingJobSitesFunction(company);

      console.log("Job Scraping Result", result);

      // if (Array.isArray(result)) {
      //   const jobs = await prisma.jobs.createManyAndReturn({
      //     data: result,
      //   });

      //   console.log(jobs);
      // }
    }
  } catch (error) {
    console.log(error);
  }
})();
