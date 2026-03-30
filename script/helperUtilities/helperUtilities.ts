import type { Jobs } from "../../generated/prisma/client.js";

const width = Math.floor(Math.random() * (1920 - 1024) + 1024);

const height = Math.floor(Math.random() * (1080 - 768) + 768);

const arrayOfDifferentTimezones = [
  "Europe/Paris",
  "Europe/Andorra",
  "Europe/Tirane",
  "Europe/Vienna",
  "Europe/Sarajevo",
  "Europe/Brussels",
  "Europe/Zurich",
  "Europe/Prague",
  "Europe/Berlin",
  "Europe/Copenhagen",
  "Europe/Madrid",
  "Europe/Gibraltar",
  "Europe/Zagreb",
  "Europe/Budapest",
  "Europe/Rome",
  "Europe/Vaduz",
  "Europe/Luxembourg",
  "Europe/Monaco",
  "Europe/Podgorica",
  "Europe/Skopje",
  "Europe/Malta",
  "Europe/Amsterdam",
  "Europe/Oslo",
  "Europe/Warsaw",
  "Europe/Belgrade",
  "Europe/Stockholm",
  "Europe/Ljubljana",
  "Europe/Bratislava",
  "Europe/San_Marino",
  "Europe/Belgrade",
  "Africa/Tunis",
  "Europe/Vatican",
];

const shuffleArrayTimezones = Math.floor(
  Math.random() * arrayOfDifferentTimezones.length,
);

const getRandomTimezone = arrayOfDifferentTimezones[shuffleArrayTimezones];

function hasJobChanged(existingJob: Jobs, scrapedJob: Jobs): boolean {
  let result: boolean = false;

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
      }

      result = false;
    }
  }

  return result;
}

export { getRandomTimezone, hasJobChanged, height, width };
