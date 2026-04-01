import { prisma } from "../../db/client.js";
import { buildData, hasJobChanged, } from "../helperUtilities/helperUtilities.js";
import { scrapingJobSitesFunction } from "../scrapingJobsSitesFunction/scrapingJobSitesFunction.js";
(async () => {
    try {
        const companies = await prisma.company.findMany({
            include: {
                jobs: true,
                instructions: true,
                steps: true,
            },
            where: {
                id: 2,
            },
        });
        for (const company of companies) {
            const scrapedJobs = await scrapingJobSitesFunction(company);
            const existingJobsMap = new Map(company.jobs.map((job) => [job.anchorHref, job]));
            const existingJobsIds = new Set(company.jobs.map((job) => job.id));
            const scrapedJobsIds = new Set();
            await prisma.$transaction(async (tx) => {
                for (const scrapedJob of scrapedJobs) {
                    const existingJob = existingJobsMap.get(scrapedJob.anchorHref);
                    if (existingJob) {
                        scrapedJobsIds.add(existingJob.id);
                        const scrapedJobChanged = hasJobChanged(existingJob, scrapedJob);
                        if (scrapedJobChanged) {
                            await tx.jobs.update({
                                where: {
                                    id: existingJob.id,
                                },
                                data: buildData(scrapedJob),
                            });
                        }
                    }
                    else {
                        await tx.jobs.create({
                            data: buildData(scrapedJob),
                        });
                    }
                }
                const jobsToDelete = Array.from(existingJobsIds.difference(scrapedJobsIds));
                console.log(jobsToDelete);
                if (jobsToDelete.length > 0) {
                    await tx.jobs.deleteMany({
                        where: {
                            id: {
                                in: jobsToDelete,
                            },
                        },
                    });
                }
            });
        }
    }
    catch (error) {
        console.error(`Failed to sync company:`, error);
    }
})();
//# sourceMappingURL=runScrapingScript.js.map