import type { ElementHandle, Page } from "puppeteer";
import type { Instructions } from "../../generated/prisma/client.js";
import type { JobsCreateManyInput } from "../../generated/prisma/models.js";
import type { ExtractionConfig } from "../../interfaces/InstructionsInterface/InstructionsInterface.js";
import type { ScrapedJobsArrayType } from "../../interfaces/JobsInterface/JobsInterface.js";
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

            const jobsObject = {
              title: jobTitle,
              location: jobLocation,
              remoteOrHybrid: jobRemoteOrHybrid,
              datePosted: jobDatePosted,
              anchorHref: jobAnchorHref,
              description: "",
              companyID: id,
            };

            if (
              jobsObject.title.includes("Developer") ||
              jobsObject.title.includes("Engineer")
            ) {
              scrapedJobs.push(jobsObject);
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

  const parseAttributeToJSON: ScrapedJobsArrayType =
    JSON.parse(getElementAttribute);

  return parseAttributeToJSON;
}

async function extractJobsFetchURL(url: string) {
  try {
    const fetchJobsByURL = await fetch(url, {
      mode: "cors",
    });

    if (fetchJobsByURL.status >= 200) {
      throw new Error(
        `Failed to fetch jobs, reason: ${fetchJobsByURL.statusText}`,
      );
    }
    const getJobs: ScrapedJobsArrayType = await fetchJobsByURL.json();

    return getJobs;
  } catch (error) {
    console.log(error);
  }
  return;
}

export { extractJobsFetchURL, extractJobsJSON, extractJobsText };
