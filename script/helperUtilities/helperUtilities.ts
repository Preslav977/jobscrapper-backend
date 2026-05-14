import type { Jobs } from "../../generated/prisma/client.js";

const viewports = [
  { width: 1920, height: 1080 },
  { width: 1536, height: 864 },
  { width: 1440, height: 900 },
];
const randomViewport = viewports[Math.floor(Math.random() * viewports.length)]!;

function hasJobChanged(existingJob: Jobs, scrapedJob: Jobs): boolean {
  let result: boolean = false;

  if (existingJob && scrapedJob) {
    const {
      title,
      location,
      remoteOrHybrid,
      datePosted,
      description,
      anchorHref,
      companyID,
    } = existingJob;

    const existingJobObject = {
      title,
      location,
      remoteOrHybrid,
      datePosted,
      description,
      anchorHref,
      companyID,
    };

    for (const propInExistingJob in existingJobObject) {
      for (const propInScrapedJob in scrapedJob) {
        const existingJobKey: keyof Omit<Jobs, "id"> =
          propInExistingJob as keyof Omit<Jobs, "id">;

        const scrapedJobKey: keyof Omit<Jobs, "id"> =
          propInScrapedJob as keyof Omit<Jobs, "id">;

        if (existingJobObject[existingJobKey] !== scrapedJob[scrapedJobKey]) {
          result = true;

          return result;
        }

        result = false;

        return result;
      }
    }
  }
  return result;
}

function buildData(job: Jobs): Omit<Jobs, "id"> {
  return {
    title: job.title,
    location: job.location,
    remoteOrHybrid: job.remoteOrHybrid,
    datePosted: job.datePosted,
    anchorHref: job.anchorHref,
    description: job.description,
    companyID: job.companyID,
  };
}

export { buildData, hasJobChanged, randomViewport };
