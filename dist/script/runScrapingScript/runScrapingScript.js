import { prisma } from "../../db/client.js";
(async () => {
    try {
        const companies = await prisma.company.findMany({
            include: {
                jobs: true,
                instructions: true,
                steps: true,
            },
        });
        console.log(companies);
        for (const company of companies) {
            console.log(company);
        }
    }
    catch (error) {
        console.log(error);
    }
})();
//# sourceMappingURL=runScrapingScript.js.map