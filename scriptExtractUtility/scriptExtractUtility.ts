import type { ElementHandle, Page } from "puppeteer";
import type { ExtractionConfig } from "../interfaces/InstructionsInterface/InstructionsInterface.js";

async function extractJobsText(
  page: Page,
  {
    container,
    title,
    location,
    remoteOrHybrid,
    datePosted,
    anchorHref,
  }: ExtractionConfig,
) {
  const doesJobContainerExists = (await page.waitForSelector(
    container.selector,
  )) as ElementHandle<HTMLElement>;

  if (doesJobContainerExists) {
    const result = await page.evaluate(
      (container, title, location, remoteOrHybrid, datePosted, anchorHref) => {
        function extractField(
          HTMLElement: Element,
          elementField: { extractType: string; selector: string; attr: string },
        ) {
          if (HTMLElement === null || elementField === null) {
            return null;
          }

          if (elementField.extractType === "text") {
            return HTMLElement.querySelector(elementField.selector)
              ?.textContent.trim()
              .replace("\n", "");
          }

          if (elementField.extractType === "attribute") {
            return HTMLElement.getAttribute(elementField.attr);
          }

          if (elementField.extractType === "parentElementAttribute") {
            return HTMLElement.querySelector(
              elementField.selector,
            )?.getAttribute(elementField.attr);
          }
          return;
        }

        type ScrapedJobsObjectType = {
          success: true | false | null;
          jobs: Array<{
            title: string | null | undefined;
            location: string | null | undefined;
            remoteOrHybrid: string | null | undefined;
            datePosted: string | null | undefined;
            anchorHref: string | null | undefined;
          }>;
          err: string | null | unknown;
        };

        const scrapedJobsObject: ScrapedJobsObjectType = {
          success: null,
          jobs: [],
          err: null,
        };

        const queryAllJobsContainers = document.querySelectorAll(
          container.selector,
        );

        try {
          queryAllJobsContainers.forEach((queryJobContainer) => {
            const jobTitle = extractField(queryJobContainer, title);

            const jobLocation = extractField(queryJobContainer, location);

            const jobRemoteOrHybrid = extractField(
              queryJobContainer,
              remoteOrHybrid,
            );

            const jobDatePosted = extractField(queryJobContainer, datePosted);

            const jobAnchorHref = extractField(queryJobContainer, anchorHref);

            const jobsObject = {
              title: jobTitle,
              location: jobLocation,
              remoteOrHybrid: jobRemoteOrHybrid,
              datePosted: jobDatePosted,
              anchorHref: jobAnchorHref,
            };

            scrapedJobsObject.success = true;

            scrapedJobsObject.jobs.push(jobsObject);
          });
          return scrapedJobsObject;
        } catch (error) {
          scrapedJobsObject.success = false;

          scrapedJobsObject.err = error;

          return scrapedJobsObject;
        }
      },
      container,
      title,
      location,
      remoteOrHybrid,
      datePosted,
      anchorHref,
    );
    return result;
  }
  return;
}

export { extractJobsText };
