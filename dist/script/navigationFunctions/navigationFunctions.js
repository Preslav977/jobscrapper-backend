async function tryClick(page, instruction, maxAttempt) {
    if (maxAttempt < 1)
        return "failure";
    for (let attempt = 1; attempt <= maxAttempt; attempt++) {
        const timeout = attempt * 10000;
        try {
            const el = await page.waitForSelector(instruction, { timeout });
            const isElementVisible = await page.$eval(instruction, (el) => {
                const style = window.getComputedStyle(el);
                return style.display !== "none" && style.visibility !== "hidden";
            });
            const isElementEnabled = await page.$eval(instruction, (el) => !el.ariaDisabled);
            if (el && isElementVisible && isElementEnabled) {
                await page.click(instruction);
                return "success";
            }
        }
        catch (error) {
            if (attempt === maxAttempt) {
                console.error(`tryClick, failed to select the instruction, and click, reason: ${error}`);
                return "failure";
            }
        }
    }
}
async function tryClickEvaluate(page, instruction, maxAttempt) {
    if (maxAttempt < 1)
        return "failure";
    for (let attempt = 1; attempt <= maxAttempt; attempt++) {
        const timeout = attempt * 10000;
        try {
            const clickedInstruction = (await page.waitForSelector(instruction, {
                timeout,
            }));
            const isElementVisible = await page.$eval(instruction, (el) => {
                const style = window.getComputedStyle(el);
                return style.display !== "none" && style.visibility !== "hidden";
            });
            const isElementEnabled = await page.$eval(instruction, (el) => !el.ariaDisabled);
            if (clickedInstruction && isElementVisible && isElementEnabled) {
                await clickedInstruction.evaluate((element) => element.click());
                return "success";
            }
        }
        catch (error) {
            if (attempt === maxAttempt) {
                console.error(`tryClickEvaluate, failed to select the instruction, and click, reason: ${error}`);
                return "failure";
            }
        }
    }
}
async function tryClickLoadMore(page, instruction) {
    let loadMoreJobs = true;
    let clickedMoreButtonCount = 0;
    while (loadMoreJobs) {
        try {
            const loadMoreButton = (await page.waitForSelector(instruction));
            const loadMoreButtonText = await loadMoreButton.evaluate((btn) => btn.textContent);
            if (loadMoreButtonText !== null) {
                await loadMoreButton.click();
                await loadMoreButton.evaluate((element) => element.scrollIntoView());
                await sleepDelay(3000);
                clickedMoreButtonCount++;
            }
        }
        catch (error) {
            if (clickedMoreButtonCount > 0) {
                loadMoreJobs = false;
                return "success";
            }
            else {
                loadMoreJobs = false;
                console.error(`tryClickLoadMore, failed to select the instruction, and click, reason: ${error}`);
                return "failure";
            }
        }
    }
}
async function selectOptionFromDropDown(page, selectElement, selectOption, maxAttempt) {
    if (maxAttempt < 1)
        return "failure";
    for (let attempt = 1; attempt <= maxAttempt; attempt++) {
        try {
            await page.waitForSelector(selectElement);
            const isElementVisible = await page.$eval(selectElement, (el) => {
                const style = window.getComputedStyle(el);
                return style.display !== "none" && style.visibility !== "hidden";
            });
            const isElementEnabled = await page.$eval(selectElement, (el) => !el.ariaDisabled);
            if (isElementEnabled && isElementVisible) {
                await page.select(selectElement, selectOption);
                return "success";
            }
        }
        catch (error) {
            if (attempt === maxAttempt) {
                console.error(`selectOptionFromDropDown, failed to select the instruction, and click, reason: ${error}`);
                return "failure";
            }
        }
    }
}
async function tryEventLocator(page, instruction, event, maxAttempt) {
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
        }
        catch (error) {
            if (attempt === maxAttempt) {
                console.error(`tryEventLocator, failed to select the instruction, and click, reason: ${error}`);
                return "failure";
            }
        }
    }
}
async function sleepDelay(timeout) {
    return new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * timeout)));
}
export { selectOptionFromDropDown, sleepDelay, tryClick, tryClickEvaluate, tryClickLoadMore, tryEventLocator, };
//# sourceMappingURL=navigationFunctions.js.map