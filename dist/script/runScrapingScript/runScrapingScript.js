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
            //creating a map of anchorHref, since it is more unique than using titles and etc.
            const databaseSavedJobsMap = new Map(company.jobs.map((job) => [job.anchorHref, job]));
            //create a set of all jobs IDs
            const databaseSavedJobsSetIDs = new Set(company.jobs.map((job) => job.id));
            const scrapedJobs = await scrapingJobSitesFunction(company);
            //create a set of scraped jobs IDS
            const scrapedJobsSetIds = new Set();
            for (const scrapedJob of scrapedJobs) {
                //does scraped jobs existing in the Database
                const doesScrapedJobExistsInDatabase = databaseSavedJobsMap.get(scrapedJob.anchorHref);
                if (doesScrapedJobExistsInDatabase) {
                    scrapedJobsSetIds.add(doesScrapedJobExistsInDatabase.id);
                    //if any job has changed should return true
                    const hasAnyScrapedJobChanged = hasJobChanged(doesScrapedJobExistsInDatabase, scrapedJob);
                    if (hasAnyScrapedJobChanged) {
                        await prisma.jobs.update({
                            where: {
                                id: doesScrapedJobExistsInDatabase.id,
                                companyID: scrapedJob.companyID,
                            },
                            data: buildData(scrapedJob),
                        });
                    }
                }
                else {
                    await prisma.jobs.create({
                        data: buildData(scrapedJob),
                    });
                }
            }
            const getJobsIDsThatNeedsToBeDeleted = databaseSavedJobsSetIDs.difference(scrapedJobsSetIds);
            for (const jobID of getJobsIDsThatNeedsToBeDeleted) {
                await prisma.jobs.delete({
                    where: {
                        id: jobID,
                    },
                });
            }
        }
    }
    catch (error) {
        console.log(error);
    }
})();
//# sourceMappingURL=runScrapingScript.js.map