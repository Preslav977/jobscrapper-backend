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
          HTMLElement: HTMLElement,
          elementField: { extractType: string; selector: string; attr: string },
        ) {
          if (HTMLElement === null || elementField === null) return null;

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
        }
      },
      container,
      title,
      location,
      remoteOrHybrid,
      datePosted,
      anchorHref,
    );
  }
}
