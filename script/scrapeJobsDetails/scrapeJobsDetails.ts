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

    if (jobs.length > 0) {
      for (const job of jobs) {
        const scrapedJobsDetails = await scrapingJobsDetailsFunction(job);

        if (scrapedJobsDetails.id) {
          const {
            responsibilities,
            requirements,
            niceToHave,
            benefits,
            interviewSteps,
          } = scrapedJobsDetails;

          await prisma.jobs.update({
            where: {
              id: scrapedJobsDetails.id,
            },
            data: {
              responsibilities: responsibilities ? responsibilities : null,
              requirements: requirements ? requirements : null,
              niceToHave: niceToHave ? niceToHave : null,
              benefits: benefits ? benefits : null,
              interviewSteps: interviewSteps ? interviewSteps : null,
            },
          });
        } else {
          console.log(
            `Failed to update job with ID: ${scrapedJobsDetails.id}. Check selector!`,
          );
        }
      }
    }
  } catch (error) {
    console.log(`Failed to update job details: ${error}`);
  }
})();
