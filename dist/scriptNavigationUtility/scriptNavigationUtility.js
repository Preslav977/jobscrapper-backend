async function tryClick(page, instruction, maxAttempt) {
    for (let attempt = 1; attempt <= maxAttempt; attempt++) {
        try {
            await page.waitForSelector(instruction);
            await page.click(instruction);
            return "success";
        }
        catch (error) {
            if (attempt === maxAttempt) {
                console.log(`Failed to find and query ${error}`);
            }
        }
    }
    return "failure";
}
async function tryClickEvaluate(page, instruction, maxAttempt) {
    for (let attempt = 1; attempt <= maxAttempt; attempt++) {
        try {
            const clickedInstruction = (await page.waitForSelector(instruction));
            await clickedInstruction.evaluate((element) => element.click());
            return "success";
        }
        catch (error) {
            if (attempt === maxAttempt) {
                console.log(`Failed to find and query ${error}`);
            }
        }
    }
    return "failure";
}
async function tryClickLoadMore(page, instruction, maxAttempt) {
    for (let attempt = 1; attempt <= maxAttempt; attempt++) {
        let loadMoreJobs = true;
        const loadMoreButton = (await page.waitForSelector(instruction));
        const loadMoreButtonText = await loadMoreButton.evaluate((btn) => btn.outerHTML);
        while (loadMoreJobs) {
            try {
                if (loadMoreButtonText !== null) {
                    await loadMoreButton.click();
                    await loadMoreButton.evaluate((element) => element.scrollIntoView());
                }
            }
            catch (error) {
                if (attempt === maxAttempt) {
                    loadMoreJobs = false;
                    await loadMoreButton.dispose();
                    console.log(`This instruction doesn't exists and is not clickable: ${error}`);
                }
            }
        }
    }
    return "failure";
}
async function selectOptionFromDropDown(page, selectElement, selectOption, maxAttempt) {
    for (let attempt = 1; attempt <= maxAttempt; attempt++) {
        try {
            await page.waitForSelector(selectElement);
            await page.select(selectElement, selectOption);
            return "success";
        }
        catch (error) {
            if (attempt === maxAttempt) {
                console.log(`This instruction doesn't exists and is not selectable: ${error}`);
            }
        }
    }
    return "failure";
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
                console.log(`This instruction doesn't exist: ${error}`);
            }
        }
    }
    return "failure";
}
export { selectOptionFromDropDown, tryClick, tryClickEvaluate, tryClickLoadMore, tryEventLocator, };
//# sourceMappingURL=scriptNavigationUtility.js.map