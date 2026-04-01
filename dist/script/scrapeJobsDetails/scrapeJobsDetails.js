import { prisma } from "../../db/client.js";
(async () => {
    try {
        const jobDetails = await prisma.jobs.findMany({
            where: {
                companyID: 2,
            },
        });
        console.log(jobDetails);
    }
    catch (error) {
        console.log(error);
    }
})();
//# sourceMappingURL=scrapeJobsDetails.js.map