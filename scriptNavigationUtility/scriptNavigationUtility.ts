import type { Page } from "puppeteer";

async function tryClick(
  page: Page,
  instruction: string,
  maxAttempt: number,
): Promise<string> {
  for (let attempt = 1; attempt <= maxAttempt; attempt++) {
    try {
      await page.waitForSelector(instruction);

      await page.click(instruction);

      return "success";
    } catch (error) {
      if (attempt === maxAttempt) {
        console.log(`Failed  to find and query ${error}`);
      }
    }
  }
  return "failure";
}

export { tryClick };
