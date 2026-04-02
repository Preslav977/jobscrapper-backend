import { prisma } from "../../db/client.js";
(async () => {
    try {
        const jobDetails = await prisma.jobs.findMany({
            where: {
                companyID: 2,
            },
            include: {
                company: {
                    include: {
                        instructions: true,
                    },
                },
            },
        });
        console.log(jobDetails[0]?.company.instructions);
    }
    catch (error) {
        console.log(error);
    }
})();
//# sourceMappingURL=scrapeJobsDetails.js.map