import type { ElementHandle, Page } from "puppeteer";
import type { Instructions } from "../../generated/prisma/client.js";
import type { JobsCreateManyInput } from "../../generated/prisma/models.js";
import type { ExtractionConfig } from "../../interfaces/InstructionsInterface/InstructionsInterface.js";
import { sleepDelay } from "../navigationFunctions/navigationFunctions.js";

async function extractJobsText(
  page: Page,
  instruction: Instructions,
  id: number,
): Promise<JobsCreateManyInput[]> {
  const { container, title, location, remoteOrHybrid, datePosted, anchorHref } =
    instruction.extractionInstructions as ExtractionConfig;

  const scrapedJobs: JobsCreateManyInput[] = [];

  try {
    const doesJobContainerExists = (await page.waitForSelector(
      container.selector!,
    )) as ElementHandle<HTMLElement>;

    if (doesJobContainerExists) {
      const result = await page.evaluate(
        (
          scrapedJobs,
          container,
          title,
          location,
          remoteOrHybrid,
          datePosted,
          anchorHref,
          id,
        ) => {
          function extractField(
            HTMLElement: Element,
            elementField: {
              extractType: string;
              selector?: string;
              attr?: string;
            },
          ) {
            if (
              elementField.extractType === "" ||
              elementField.selector === ""
            ) {
              return null;
            }

            if (elementField.extractType === "text") {
              return HTMLElement.querySelector(elementField.selector!)
                ?.textContent.trim()
                .replace("\n", "");
            }

            if (elementField.extractType === "attribute") {
              return HTMLElement.getAttribute(elementField.attr!);
            }

            if (elementField.extractType === "elementAttribute") {
              return HTMLElement.querySelector(
                elementField.selector!,
              )?.getAttribute(elementField.attr!);
            }

            return null;
          }

          const queryAllJobsContainers = document.querySelectorAll(
            container.selector!,
          );

          queryAllJobsContainers.forEach((queryJobContainer) => {
            const jobTitle = extractField(queryJobContainer, title)!;

            const jobLocation = extractField(queryJobContainer, location)!;

            const jobRemoteOrHybrid = extractField(
              queryJobContainer,
              remoteOrHybrid,
            )!;

            const jobDatePosted = extractField(queryJobContainer, datePosted)!;

            const jobAnchorHref = extractField(queryJobContainer, anchorHref)!;

            const jobsjobect = {
              title: jobTitle,
              location: jobLocation,
              remoteOrHybrid: jobRemoteOrHybrid,
              datePosted: jobDatePosted,
              anchorHref: jobAnchorHref,
              description: "",
              companyID: id,
            };

            if (
              jobsjobect.title.includes("Developer") ||
              jobsjobect.title.includes("Engineer")
            ) {
              scrapedJobs.push(jobsjobect);
            }
          });

          return scrapedJobs;
        },
        scrapedJobs,
        container,
        title,
        location,
        remoteOrHybrid,
        datePosted,
        anchorHref,
        id,
      );

      sleepDelay(3000);

      return result;
    }
  } catch (error) {
    console.log(`Failed to scrap, check selectors, reason: ${error}`);

    throw error;
  }

  return scrapedJobs;
}

async function extractJobsJSON(attribute: string) {
  const queryElementByAttribute = document.querySelector(`${[attribute]}`);

  const getElementAttribute = queryElementByAttribute!.getAttribute(attribute)!;

  const parseAttributeToJSON: JobsCreateManyInput[] =
    JSON.parse(getElementAttribute);

  return parseAttributeToJSON;
}

interface ResponseResult {
  id: string;
  jobOpeningName: string;
  location: { city: string };
  isRemote: null | string;
}

interface ApiResponse<T> {
  meta: { totalCount: number };
  results: T[];
  status: string;
}

function transform<T>(results: T[], mapper: (item: T) => JobsCreateManyInput) {
  return results.map(mapper);
}

async function extractJobsFetchURL(
  id: number,
  url: string,
): Promise<JobsCreateManyInput[] | string> {
  let retrieveFetchedJobs: JobsCreateManyInput[] | string = [];

  try {
    const fetchJobsByURL = await fetch(url, {
      mode: "cors",
    });

    if (fetchJobsByURL.status >= 200) {
      throw new Error(
        `Failed to fetch jobs, reason: ${fetchJobsByURL.statusText}`,
      );
    }
    const getJobs =
      (await fetchJobsByURL.json()) as ApiResponse<ResponseResult>;

    const result = transform(getJobs.results, (job: ResponseResult) => ({
      title: job.jobOpeningName,
      location: job.location.city,
      remoteOrHybrid: job.isRemote,
      anchorHref: `${url}${job.id}`,
      description: "",
      companyID: id,
    }));

    retrieveFetchedJobs = [...result];
  } catch (error) {
    console.log(error);

    return "failure";
  }
  return retrieveFetchedJobs;
}

export { extractJobsFetchURL, extractJobsJSON, extractJobsText };
