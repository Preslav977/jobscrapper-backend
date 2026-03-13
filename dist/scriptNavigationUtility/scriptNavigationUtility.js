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
export { tryClick, tryClickEvaluate };
//# sourceMappingURL=scriptNavigationUtility.js.map