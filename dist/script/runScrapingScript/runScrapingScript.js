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
        for (const company of getCompanies) {
            const existingJobsMap = new Map(company.jobs.map((job) => [job.anchorHref, job]));
            const scrapedJobs = await scrapingJobSitesFunction(company);
            for (const scrapedJob of scrapedJobs) {
                //does scraped jobs existing in the Database
                const existingJob = existingJobsMap.get(scrapedJob.anchorHref);
                // console.log(scrapedJob);
                if (existingJob) {
                    //   console.log(hasJobChanged(existingJob, scrapedJob as Jobs));
                }
            }
        }
    }
    catch (error) {
        console.log(error);
    }
})();
//# sourceMappingURL=runScrapingScript.js.map