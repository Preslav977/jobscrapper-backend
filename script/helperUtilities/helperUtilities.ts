import type { Jobs } from "../../generated/prisma/client.js";

const viewports = [
  { width: 1920, height: 1080 },
  { width: 1536, height: 864 },
  { width: 1440, height: 900 },
];
const randomViewport = viewports[Math.floor(Math.random() * viewports.length)]!;

function hasJobChanged(existingJob: Jobs, scrapedJob: Jobs): boolean {
  if (!existingJob || !scrapedJob) return false;

  const keysToCompare: Array<keyof Jobs> = [
    "title",
    "location",
    "remoteOrHybrid",
    "datePosted",
    "description",
    "anchorHref",
    "companyID",
  ];

  return keysToCompare.some((key) => existingJob[key] !== scrapedJob[key]);
}

function buildData(job: Jobs): Omit<Jobs, "id" | "formattedData"> {
  return {
    title: job.title,
    location: job.location,
    remoteOrHybrid: job.remoteOrHybrid,
    datePosted: job.datePosted,
    anchorHref: job.anchorHref,
    description: job.description,
    companyID: job.companyID,
    rawHTML: job.rawHTML,
    scrapedText: job.scrapedText,
    createdAt: job.createdAt,
    updateAt: job.updateAt,
  };
}

export { buildData, hasJobChanged, randomViewport };
