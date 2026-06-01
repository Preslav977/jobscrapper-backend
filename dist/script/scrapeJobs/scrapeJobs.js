import { prisma } from "../../db/client.js";
import { buildData, hasJobChanged, } from "../helperUtilities/helperUtilities.js";
import { scrapingJobsFunction } from "../scrapingJobsFunction/scrapingJobsFunction.js";
(async () => {
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
    if (companies.length > 0) {
        for (const company of companies) {
            try {
                const scrapedJobs = await scrapingJobsFunction(company);
                const existingJobsMap = new Map(company.jobs.map((job) => [job.anchorHref, job]));
                const existingJobsIds = new Set(company.jobs.map((job) => job.id));
                const scrapedJobsIds = new Set();
                await prisma.$transaction(async (tx) => {
                    for (const scrapedJob of scrapedJobs) {
                        if (!scrapedJob.anchorHref)
                            continue;
                        const existingJob = existingJobsMap.get(scrapedJob.anchorHref);
                        if (!existingJob) {
                            await tx.jobs.create({
                                data: buildData(scrapedJob),
                            });
                        }
                        else {
                            scrapedJobsIds.add(existingJob.id);
                            const scrapedJobChanged = hasJobChanged(existingJob, scrapedJob);
                            if (scrapedJobChanged) {
                                await tx.jobs.update({
                                    where: {
                                        id: existingJob.id,
                                    },
                                    data: {
                                        ...buildData(scrapedJob),
                                        scrapedText: null,
                                        rawHTML: null,
                                    },
                                });
                            }
                        }
                    }
                    const jobsToDelete = Array.from(existingJobsIds.difference(scrapedJobsIds));
                    if (jobsToDelete.length > 0) {
                        await tx.jobs.deleteMany({
                            where: {
                                id: {
                                    in: jobsToDelete,
                                },
                            },
                        });
                    }
                }, {
                    maxWait: 5000,
                    timeout: 20000,
                });
                console.log(`Successfully completed sync for: ${company.name}`);
            }
            catch (error) {
                console.error(`Failed to sync company: ${company.name} due to error: ${error}`);
            }
        }
    }
})();
//# sourceMappingURL=scrapeJobs.js.map