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

async function tryClickLoadMore(
  page: Page,
  instruction: string,
  maxAttempt: number,
): Promise<string> {
  for (let attempt = 0; attempt <= maxAttempt; attempt++) {
    let loadMoreJobs = true;

    const loadMoreButton = (await page.waitForSelector(
      instruction,
    )) as ElementHandle<HTMLElement>;

    const loadMoreButtonText = await loadMoreButton.evaluate(
      (btn) => btn.outerHTML,
    );

    while (loadMoreJobs) {
      try {
        if (loadMoreButtonText !== null) {
          await loadMoreButton.click();

          await loadMoreButton.evaluate((element) => element.scrollIntoView());
        }
      } catch (error) {
        if (attempt === maxAttempt) {
          loadMoreJobs = false;

          await loadMoreButton.dispose();

          console.log(
            `This instruction doesn't exists and is not clickable: ${error}`,
          );
        }
      }
    }
  }
  return "failure";
}

async function selectOptionFromDropDown(
  page: Page,
  selectElement: string,
  selectOption: string,
  maxAttempt: number,
): Promise<string> {
  for (let attempt = 0; attempt <= maxAttempt; attempt++) {
    try {
      await page.waitForSelector(selectElement);

      await page.select(selectElement, selectOption);

      return "success";
    } catch (error) {
      if (attempt === maxAttempt) {
        console.log(
          `This instruction doesn't exists and is not selectable: ${error}`,
        );
      }
    }
  }
  return "failure";
}

export {
  selectOptionFromDropDown,
  tryClick,
  tryClickEvaluate,
  tryClickLoadMore,
};
