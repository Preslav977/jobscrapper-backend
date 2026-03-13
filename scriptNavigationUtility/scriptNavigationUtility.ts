import type { ElementHandle, Page } from "puppeteer";

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
        console.log(`Failed to find and query ${error}`);
      }
    }
  }
  return "failure";
}

async function tryClickEvaluate(
  page: Page,
  instruction: string,
  maxAttempt: number,
): Promise<string> {
  for (let attempt = 1; attempt <= maxAttempt; attempt++) {
    try {
      const clickedInstruction = (await page.waitForSelector(
        instruction,
      )) as ElementHandle<HTMLElement>;

      await clickedInstruction.evaluate((element) => element.click());

      return "success";
    } catch (error) {
      if (attempt === maxAttempt) {
        console.log(`Failed to find and query ${error}`);
      }
    }
  }
  return "failure";
}

export { tryClick, tryClickEvaluate };
