async function extractJobsText(page, { container, title, location, remoteOrHybrid, datePosted, anchorHref, }) {
    const doesJobContainerExists = (await page.waitForSelector(container.selector));
    if (doesJobContainerExists) {
        const result = await page.evaluate((container, title, location, remoteOrHybrid, datePosted, anchorHref) => {
            function extractField(HTMLElement, elementField) {
                if (HTMLElement === null || elementField === null)
                    return null;
                if (elementField.extractType === "text") {
                    return HTMLElement.querySelector(elementField.selector)
                        ?.textContent.trim()
                        .replace("\n", "");
                }
                if (elementField.extractType === "attribute") {
                    return HTMLElement.getAttribute(elementField.attr);
                }
                if (elementField.extractType === "parentElementAttribute") {
                    return HTMLElement.querySelector(elementField.selector)?.getAttribute(elementField.attr);
                }
            }
        }, container, title, location, remoteOrHybrid, datePosted, anchorHref);
    }
}
export {};
//# sourceMappingURL=scriptExtractUtility.js.map