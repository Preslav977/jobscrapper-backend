import { sleepDelay } from "../navigationFunctions/navigationFunctions.js";
async function extractJobsText(page, instruction, id) {
    const { container, title, location, remoteOrHybrid, datePosted, anchorHref } = instruction.extractionInstructions;
    const scrapedJobs = [];
    try {
        const doesJobContainerExists = (await page.waitForSelector(container.selector));
        if (doesJobContainerExists) {
            const result = await page.evaluate((scrapedJobs, container, title, location, remoteOrHybrid, datePosted, anchorHref, id) => {
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
                    if (elementField.extractType === "elementAttribute") {
                        return HTMLElement.querySelector(elementField.selector)?.getAttribute(elementField.attr);
                    }
                    return null;
                }
                const queryAllJobsContainers = document.querySelectorAll(container.selector);
                queryAllJobsContainers.forEach((queryJobContainer) => {
                    const jobTitle = extractField(queryJobContainer, title);
                    const jobLocation = extractField(queryJobContainer, location);
                    const jobRemoteOrHybrid = extractField(queryJobContainer, remoteOrHybrid);
                    const jobDatePosted = extractField(queryJobContainer, datePosted);
                    const jobAnchorHref = extractField(queryJobContainer, anchorHref);
                    const jobsjobect = {
                        title: jobTitle,
                        location: jobLocation,
                        remoteOrHybrid: jobRemoteOrHybrid,
                        datePosted: jobDatePosted,
                        anchorHref: jobAnchorHref,
                        description: "",
                        companyID: id,
                    };
                    if (jobsjobect.title.includes("Developer") ||
                        jobsjobect.title.includes("Engineer")) {
                        scrapedJobs.push(jobsjobect);
                    }
                });
                return scrapedJobs;
            }, scrapedJobs, container, title, location, remoteOrHybrid, datePosted, anchorHref, id);
            sleepDelay(3000);
            return result;
        }
    }
    catch (error) {
        console.log(`Failed to scrap, check selectors, reason: ${error}`);
        throw error;
    }
    return scrapedJobs;
}
async function extractJobsJSON(attribute) {
    const queryElementByAttribute = document.querySelector(`${[attribute]}`);
    const getElementAttribute = queryElementByAttribute.getAttribute(attribute);
    const parseAttributeToJSON = JSON.parse(getElementAttribute);
    return parseAttributeToJSON;
}
function transform(results, mapper) {
    return results.map(mapper);
}
async function extractJobsFetchURL(id, url) {
    let retrieveFetchedJobs = [];
    try {
        const fetchJobsByURL = await fetch(url, {
            mode: "cors",
        });
        if (fetchJobsByURL.status >= 200) {
            throw new Error(`Failed to fetch jobs, reason: ${fetchJobsByURL.statusText}`);
        }
        const getJobs = (await fetchJobsByURL.json());
        const result = transform(getJobs.results, (job) => ({
            title: job.jobOpeningName,
            location: job.location.city,
            remoteOrHybrid: job.isRemote,
            anchorHref: `${url}${job.id}`,
            description: "",
            companyID: id,
        }));
        retrieveFetchedJobs = [...result];
    }
    catch (error) {
        console.log(error);
        return "failure";
    }
    return retrieveFetchedJobs;
}
export { extractJobsFetchURL, extractJobsJSON, extractJobsText };
//# sourceMappingURL=extractDataFunctions.js.map