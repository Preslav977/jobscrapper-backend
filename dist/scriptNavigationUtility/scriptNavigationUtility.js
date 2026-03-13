async function tryClick(page, instruction, maxAttempt) {
    for (let attempt = 1; attempt <= maxAttempt; attempt++) {
        try {
            await page.waitForSelector(instruction);
            await page.click(instruction);
            return "success";
        }
        catch (error) {
            if (attempt === maxAttempt) {
                console.log(`Failed  to find and query ${error}`);
            }
        }
    }
    return "failure";
}
export { tryClick };
//# sourceMappingURL=scriptNavigationUtility.js.map