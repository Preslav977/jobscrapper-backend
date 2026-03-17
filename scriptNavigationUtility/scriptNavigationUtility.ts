import console from "node:console";
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

      await sleepDelay(3000);

      return "success";
    } catch (error) {
      if (attempt === maxAttempt) {
        console.log(`Failed to query and click: ${error}`);
        return "failure";
      }
    }
  }
  return "";
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

      await sleepDelay(3000);

      return "success";
    } catch (error) {
      if (attempt === maxAttempt) {
        console.log(`Failed to query and click ${error}`);
        return "failure";
      }
    }
  }
  return "";
}

async function tryClickLoadMore(
  page: Page,
  instruction: string,
): Promise<string> {
  let loadMoreJobs = true;

  let clickedMoreButtonCount = 0;

  while (loadMoreJobs) {
    try {
      const loadMoreButton = (await page.waitForSelector(
        instruction,
      )) as ElementHandle<HTMLElement>;

      const loadMoreButtonText = await loadMoreButton.evaluate(
        (btn) => btn.textContent,
      );

      if (loadMoreButtonText !== null) {
        await loadMoreButton.click();

        await loadMoreButton.evaluate((element) => element.scrollIntoView());

        await sleepDelay(5000);

        clickedMoreButtonCount++;
      }
    } catch (error) {
      if (clickedMoreButtonCount > 5) {
        loadMoreJobs = false;

        return "success";
      } else {
        loadMoreJobs = false;

        console.log(`Failed to query and click: ${error}`);

        return "failure";
      }
    }
  }

  return "";
}

async function selectOptionFromDropDown(
  page: Page,
  selectElement: string,
  selectOption: string,
  maxAttempt: number,
): Promise<string> {
  for (let attempt = 1; attempt <= maxAttempt; attempt++) {
    try {
      await page.waitForSelector(selectElement);

      await page.select(selectElement, selectOption);

      await sleepDelay(2500);

      return "success";
    } catch (error) {
      if (attempt === maxAttempt) {
        console.log(`Failed to query and select: ${error}`);
        return "failure";
      }
    }
  }
  return "";
}

async function tryEventLocator(
  page: Page,
  instruction: string,
  event: string,
  maxAttempt: number,
): Promise<string> {
  for (let attempt = 1; attempt <= maxAttempt; attempt++) {
    try {
      switch (event) {
        case "click":
          await page.locator(instruction).click();
          break;

        case "fill":
          break;

        case "scroll":
          break;

        default:
          break;
      }
      return "success";
    } catch (error) {
      if (attempt === maxAttempt) {
        console.log(`Failed to query and ${event}: ${error}`);
        return "failure";
      }
    }
  }
  return "";
}

async function sleepDelay(timeout: number): Promise<void> {
  return new Promise((resolve) =>
    setTimeout(resolve, Math.floor(Math.random() * timeout)),
  );
}

export {
  selectOptionFromDropDown,
  sleepDelay,
  tryClick,
  tryClickEvaluate,
  tryClickLoadMore,
  tryEventLocator,
};
