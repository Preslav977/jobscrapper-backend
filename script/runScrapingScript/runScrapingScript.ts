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

    // console.log(getCompanies);

    for (const company of getCompanies) {
      // console.log("Company", company.jobs);

      const existingJobsInDatabase = new Map(
        company.jobs.map((job) => [job.title, job]),
      );

      // console.log(existingJobsInDatabase);

      const result = await scrapingJobSitesFunction(company);

      for (const scrapedJobs of result) {
        const existingJob = existingJobsInDatabase.get(scrapedJobs.title);

        if (existingJob) {
          console.log(scrapedJobs, existingJob);
        } else {
          await prisma.jobs.createManyAndReturn({
            data: result,
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
})();
