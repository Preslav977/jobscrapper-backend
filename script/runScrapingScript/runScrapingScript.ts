import { prisma } from "../../db/client.js";
import type { Company } from "../../generated/prisma/client.js";

(async () => {
  try {
    const companies: Company[] = await prisma.company.findMany({
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
  } catch (error) {
    console.log(error);
  }
})();
