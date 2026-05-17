import type { Page } from "puppeteer";
import type { Instructions } from "../../generated/prisma/client.js";
import type { JobsCreateManyInput } from "../../generated/prisma/models.js";
import type {
  ApiResponse,
  ResponseResult,
} from "../../interfaces/ApiResponseInterface/ApiResponseInterface.js";
import type { ExtractionConfig } from "../../interfaces/InstructionsInterface/InstructionsInterface.js";

async function extractJobsText(
  page: Page,
  instruction: Instructions,
  id: number,
): Promise<JobsCreateManyInput[]> {
  const { container, title, location, remoteOrHybrid, datePosted, anchorHref } =
    instruction.extractionInstructions as ExtractionConfig;

  const containerExists = await page
    .waitForSelector(`${container.selector!}:not(empty)`)
    .catch(() => null);

  // console.log("DEBUGGER CHECK:", containerExists);

  if (!containerExists) {
    console.warn(
      `[Scraper] Active timeout: Container ${container.selector} not found.`,
    );

    return [];
  }

  try {
    return await page.evaluate(
      (cfg, companyID) => {
        function extractField(
          el: Element,
          field: {
            extractType: string;
            selector?: string;
            attr?: string;
          },
        ) {
          if (!field.extractType) return null;

          const target = field.selector ? el.querySelector(field.selector) : el;

          console.log(target);

          if (!target) return null;

          if (field.extractType === "text") {
            return target.textContent
              ? target.textContent.trim().replace("\n", "")
              : null;
          }

          if (
            field.extractType === "attribute" ||
            (field.extractType === "elementAttribute" && field.attr)
          ) {
            return el.getAttribute(field.attr!);
          }
          return null;
        }

        const jobsNodes = document.querySelectorAll(cfg.container.selector!);

        const scrapedJobs: JobsCreateManyInput[] = [];

        jobsNodes.forEach((node) => {
          const rawTitle = extractField(node, cfg.title) || "";

          scrapedJobs.push({
            title: rawTitle,
            location: extractField(node, cfg.location) || "",
            remoteOrHybrid: extractField(node, cfg.remoteOrHybrid) || "",
            datePosted: extractField(node, cfg.datePosted) || "",
            anchorHref: extractField(node, cfg.anchorHref) || "",
            companyID: companyID,
          });
        });

        console.log(scrapedJobs);

        return scrapedJobs;
      },
      { container, title, location, remoteOrHybrid, datePosted, anchorHref },
      id,
    );
  } catch (error) {
    console.error(`[Scraper] Critical evaluation failure: ${error}`);

    return [];
  }
}

async function extractJobsDetailsText(page: Page, instruction: Instructions) {
  const { description } =
    instruction.extractionInstructions as ExtractionConfig;

  const descriptionExists = await page
    .waitForSelector(description.selector!)
    .catch(() => null);

  if (!descriptionExists) {
    console.warn(
      `[Scraper] Active timeout: Description ${description.selector} not found.`,
    );

    return { structuredText: "", rawHTML: "" };
  }

  try {
    const extractionResult = await page.evaluate(
      (description) => {
        const container = document.querySelector(description.selector!);

        if (!container) return { structuredText: "", rawHTML: "" };

        const rawHTML = container!.outerHTML;

        const junk = container?.querySelectorAll(
          "script, style, nav, footer, svg, img",
        );
        junk?.forEach((el: Element) => el.remove());

        const walker = document.createTreeWalker(
          container!,
          NodeFilter.SHOW_ELEMENT,
        );

        let structuredText = "";

        let currentNode = walker?.nextNode();

        while (currentNode && currentNode instanceof Element) {
          const tagName = currentNode.tagName;
          const text = currentNode.textContent?.trim();

          if (text) {
            if (["H1", "H2", "H3", "H4", "STRONG", "B"].includes(tagName)) {
              structuredText += `\n\n[HEADER]: ${text}\n`;
            } else if (tagName === "LI") {
              structuredText += `\n* ${text}`;
            } else if (tagName === "P" || tagName === "DIV") {
              if (currentNode.children.length === 0) {
                structuredText += `\n\n${text}`;
              }
            }
          }
          currentNode = walker.nextNode();
        }

        return { structuredText, rawHTML };
      },

      description,
    );
    return extractionResult;
  } catch (error) {
    console.error(`[Scraper] Critical evaluation failure: ${error}`);
    return { structuredText: "", rawHTML: "" };
  }
}

function parseMarkedUpText(rawText: string) {
  const sections = rawText.split("[HEADER]:");

  const result = {
    responsibilities: [] as string[],
    requirements: [] as string[],
    benefits: [] as string[],
    other: [] as string[],
  };

  sections.forEach((section) => {
    const lines = section
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l !== "");
    if (lines.length === 0) return;

    const header = lines[0]!.toLowerCase();
    const content = lines.slice(1);

    if (header.match(/routine|responsibilities|tasks|daily/i)) {
      result.responsibilities.push(...content);
    } else if (
      header.match(
        /technology stack|qualification|requirements|skills|requirements/i,
      )
    ) {
      result.requirements.push(...content);
    } else if (header.match(/offer|gratitude|benefits|goodies/i)) {
      result.benefits.push(...content);
    } else {
      result.other.push(...lines);
    }
  });

  return result;
}

async function extractJobsJSON(attribute: string) {
  const queryElementByAttribute = document.querySelector(`${[attribute]}`);

  const getElementAttribute = queryElementByAttribute!.getAttribute(attribute)!;

  const parseAttributeToJSON: JobsCreateManyInput[] =
    JSON.parse(getElementAttribute);

  return parseAttributeToJSON;
}

function transform<T>(results: T[], mapper: (item: T) => JobsCreateManyInput) {
  return results.map(mapper);
}

async function extractJobsFetchURL(
  id: number,
  url: string,
  companyURL: string,
): Promise<JobsCreateManyInput[]> {
  let retrieveFetchedJobs: JobsCreateManyInput[] = [];

  try {
    const fetchJobsByURL = await fetch(url, {
      mode: "cors",
    });

    if (fetchJobsByURL.status >= 400) {
      console.log(`Failed to fetch jobs, reason: ${fetchJobsByURL.statusText}`);

      return retrieveFetchedJobs;
    }
    const getJobs =
      (await fetchJobsByURL.json()) as ApiResponse<ResponseResult>;

    const result = transform(getJobs.result, (job: ResponseResult) => ({
      title: job.jobOpeningName,
      location: job.location.city,
      remoteOrHybrid: job.isRemote,
      anchorHref: `${companyURL}${job.id}`,
      description: "",
      companyID: id,
    }));

    retrieveFetchedJobs = [...result];
  } catch (error) {
    console.log(error);
  }
  return retrieveFetchedJobs;
}

export {
  extractJobsDetailsText,
  extractJobsFetchURL,
  extractJobsJSON,
  extractJobsText,
  parseMarkedUpText,
};
