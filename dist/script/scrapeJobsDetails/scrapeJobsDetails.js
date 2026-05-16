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
                if (scrapedJobsDetails) {
                    await prisma.jobs.update({
                        where: {
                            id: scrapedJobsDetails.id,
                        },
                        data: {
                            rawHTML: scrapedJobsDetails.rawHTML,
                            formattedData: scrapedJobsDetails.formattedData,
                        },
                    });
                }
            }
        }
    }
    catch (error) {
        console.log(`Failed to update job details: ${error}`);
    }
})();
//# sourceMappingURL=scrapeJobsDetails.js.map