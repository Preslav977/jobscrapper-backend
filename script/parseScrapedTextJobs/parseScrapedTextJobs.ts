import { prisma } from "../../db/client.js";
import { parseMarkedUpText } from "../extractDataFunctions/extractDataFunctions.js";

const jobsToFormatScrapedText = await prisma.jobs.findMany({
  where: {
    scrapedText: { not: null },
  },
});

for (const jobs of jobsToFormatScrapedText) {
  const result = parseMarkedUpText(jobs.scrapedText ? jobs.scrapedText : "");

  await prisma.jobs.update({
    where: { id: jobs.id },
    data: {
      formattedData: result,
    },
  });
}
