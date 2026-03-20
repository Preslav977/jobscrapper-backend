import { sleepDelay } from "../navigationFunctions/navigationFunctions.js";
async function extractJobsText(page, instruction) {
    const { container, title, location, remoteOrHybrid, datePosted, anchorHref, } = instruction.extractionInstructions;
    try {
        const doesJobContainerExists = (await page.waitForSelector(container.selector));
        if (doesJobContainerExists) {
            const result = await page.evaluate((container, title, location, remoteOrHybrid, datePosted, anchorHref) => {
                function extractField(HTMLElement, elementField) {
                    if (elementField.extractType === "" ||
                        elementField.selector === "") {
                        return null;
                    }
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
                    return null;
                }
                const scrapedJobs = [];
                const queryAllJobsContainers = document.querySelectorAll(container.selector);
                queryAllJobsContainers.forEach((queryJobContainer) => {
                    const jobTitle = extractField(queryJobContainer, title);
                    const jobLocation = extractField(queryJobContainer, location);
                    const jobRemoteOrHybrid = extractField(queryJobContainer, remoteOrHybrid);
                    const jobDatePosted = extractField(queryJobContainer, datePosted);
                    const jobAnchorHref = extractField(queryJobContainer, anchorHref);
                    const jobsArray = {
                        title: jobTitle,
                        location: jobLocation,
                        remoteOrHybrid: jobRemoteOrHybrid,
                        datePosted: jobDatePosted,
                        anchorHref: jobAnchorHref,
                    };
                    scrapedJobs.push(jobsArray);
                });
                return scrapedJobs;
            }, container, title, location, remoteOrHybrid, datePosted, anchorHref);
            sleepDelay(3000);
            return result;
        }
    }
    catch (error) {
        console.log(`Failed to scrap, check selectors, reason: ${error}`);
        throw error;
    }
    return;
}
async function extractJobsJSON(attribute) {
    const queryElementByAttribute = document.querySelector(`${[attribute]}`);
    const getElementAttribute = queryElementByAttribute.getAttribute(attribute);
    const parseAttributeToJSON = JSON.parse(getElementAttribute);
    return parseAttributeToJSON;
}
async function extractJobsFetchURL(url) {
    try {
        const fetchJobsByURL = await fetch(url, {
            mode: "cors",
        });
        if (fetchJobsByURL.status >= 200) {
            throw new Error(`Failed to fetch jobs, reason: ${fetchJobsByURL.statusText}`);
        }
        const getJobs = await fetchJobsByURL.json();
        return getJobs;
    }
    catch (error) {
        console.log(error);
    }
    return;
}
export { extractJobsFetchURL, extractJobsJSON, extractJobsText };
//# sourceMappingURL=extractDataFunctions.js.map