async function tryClick(page, instruction, maxAttempt) {
    if (maxAttempt < 1)
        return "failure";
    for (let attempt = 1; attempt <= maxAttempt; attempt++) {
        const timeout = attempt * 10000;
        try {
            await page.waitForSelector(instruction, { timeout });
            const isElementVisible = await page.$eval(instruction, (el) => {
                const style = window.getComputedStyle(el);
                return style.display !== "none" && style.visibility !== "hidden";
            });
            if (!isElementVisible) {
                await sleepDelay(3000);
            }
            const isElementEnabled = await page.$eval(instruction, (el) => !el.ariaDisabled);
            if (!isElementEnabled) {
                await sleepDelay(3000);
            }
            await page.click(instruction);
            return "success";
        }
        catch (error) {
            if (attempt === maxAttempt) {
                console.log(`tryClick, failed to query, and click, reason: ${error}`);
                return "failure";
            }
        }
    }
}
async function tryClickEvaluate(page, instruction, maxAttempt) {
    for (let attempt = 1; attempt <= maxAttempt; attempt++) {
        try {
            const clickedInstruction = (await page.waitForSelector(instruction));
            await clickedInstruction.evaluate((element) => element.click());
            await sleepDelay(3000);
            return "success";
        }
        catch (error) {
            if (attempt === maxAttempt) {
                console.log(`tryClickEvaluate, failed to query, and click, reason: ${error}`);
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
                await sleepDelay(5000);
                clickedMoreButtonCount++;
            }
        }
        catch (error) {
            if (clickedMoreButtonCount > 5) {
                loadMoreJobs = false;
                return "success";
            }
            else {
                loadMoreJobs = false;
                console.log(`tryClickLoadMore, failed to query, and click, reason: ${error}`);
                return "failure";
            }
        }
    }
}
async function selectOptionFromDropDown(page, selectElement, selectOption, maxAttempt) {
    for (let attempt = 1; attempt <= maxAttempt; attempt++) {
        try {
            await page.waitForSelector(selectElement);
            await page.select(selectElement, selectOption);
            await sleepDelay(2500);
            return "success";
        }
        catch (error) {
            if (attempt === maxAttempt) {
                console.log(`selectOptionFromDropDown, failed to query, and click, reason: ${error}`);
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
                console.log(`tryEventLocator, failed to query, and click, reason: ${error} at event: ${event}`);
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