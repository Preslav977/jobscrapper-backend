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
            where: {
                company: {
                    name: "Anthill",
                },
            },
        });
        if (jobs.length > 0) {
            for (const job of jobs) {
                const scrapedJobsDetails = await scrapingJobsDetailsFunction(job);
                if (scrapedJobsDetails.id) {
                    await prisma.jobs.update({
                        where: {
                            id: scrapedJobsDetails.id,
                        },
                        data: {
                            description: scrapedJobsDetails.description
                                ? scrapedJobsDetails.description
                                : "",
                        },
                    });
                }
                else {
                    console.log(`Failed to update job with ID: ${scrapedJobsDetails.id}. Check selector!`);
                }
            }
        }
    }
    catch (error) {
        console.log(`Failed to update job details: ${error}`);
    }
})();
//# sourceMappingURL=scrapeJobsDetails.js.map