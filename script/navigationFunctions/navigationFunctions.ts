import type { ElementHandle, Page } from "puppeteer";

async function tryClick(
  page: Page,
  instruction: string,
  maxAttempt: number,
): Promise<string | void> {
  if (maxAttempt < 1) return "failure";

  for (let attempt = 1; attempt <= maxAttempt; attempt++) {
    const timeout = attempt * 10000;
    try {
      const el = await page.waitForSelector(instruction, { timeout });

      const isElementVisible = await page.$eval(instruction, (el) => {
        const style = window.getComputedStyle(el);
        return style.display !== "none" && style.visibility !== "hidden";
      });

      const isElementEnabled = await page.$eval(
        instruction,
        (el) => !el.ariaDisabled,
      );

      if (el && isElementVisible && isElementEnabled) {
        await page.click(instruction);

        return "success";
      }
    } catch (error) {
      if (attempt === maxAttempt) {
        console.log(`tryClick, failed to query, and click, reason: ${error}`);
        return "failure";
      }
    }
  }
}

async function tryClickEvaluate(
  page: Page,
  instruction: string,
  maxAttempt: number,
): Promise<string | void> {
  if (maxAttempt < 1) return "failure";

  for (let attempt = 1; attempt <= maxAttempt; attempt++) {
    const timeout = attempt * 10000;

    try {
      const clickedInstruction = (await page.waitForSelector(instruction, {
        timeout,
      })) as ElementHandle<HTMLElement>;

      await clickedInstruction.evaluate((element) => element.click());

      await sleepDelay(3000);

      return "success";
    } catch (error) {
      if (attempt === maxAttempt) {
        console.log(
          `tryClickEvaluate, failed to query, and click, reason: ${error}`,
        );
        return "failure";
      }
    }
  }
}

async function tryClickLoadMore(
  page: Page,
  instruction: string,
): Promise<string | void> {
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
      if (clickedMoreButtonCount > 0) {
        loadMoreJobs = false;

        return "success";
      } else {
        loadMoreJobs = false;

        console.log(
          `tryClickLoadMore, failed to query, and click, reason: ${error}`,
        );

        return "failure";
      }
    }
  }
}

async function selectOptionFromDropDown(
  page: Page,
  selectElement: string,
  selectOption: string,
  maxAttempt: number,
): Promise<string | void> {
  if (maxAttempt < 1) return "failure";

  for (let attempt = 1; attempt <= maxAttempt; attempt++) {
    try {
      await page.waitForSelector(selectElement);

      await page.select(selectElement, selectOption);

      await sleepDelay(2500);

      return "success";
    } catch (error) {
      if (attempt === maxAttempt) {
        console.log(
          `selectOptionFromDropDown, failed to query, and click, reason: ${error}`,
        );
        return "failure";
      }
    }
  }
}

async function tryEventLocator(
  page: Page,
  instruction: string,
  event: string,
  maxAttempt: number,
): Promise<string | void> {
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
        console.log(
          `tryEventLocator, failed to query, and click, reason: ${error} at event: ${event}`,
        );
        return "failure";
      }
    }
  }
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
