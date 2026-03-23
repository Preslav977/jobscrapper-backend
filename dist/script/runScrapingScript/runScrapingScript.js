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
        });
        for (const company of getCompanies) {
            if (company.jobs.length === 0) {
                const result = await scrapingJobSitesFunction(company);
                if (Array.isArray(result)) {
                    const jobs = await prisma.jobs.createManyAndReturn({
                        data: result,
                    });
                    console.log(jobs);
                }
            }
        }
    }
    catch (error) {
        console.log(error);
    }
})();
//# sourceMappingURL=runScrapingScript.js.map