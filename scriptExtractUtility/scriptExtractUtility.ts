import type { Page } from "puppeteer";
import type { ExtractionConfig } from "../interfaces/InstructionsInterface/InstructionsInterface.js";

async function extractJobsText(page: Page, { container }: ExtractionConfig) {
  console.log(container.extractType);
}
