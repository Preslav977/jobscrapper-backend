import { sleepDelay } from "../navigationFunctions/navigationFunctions.js";
async function extractJobsText(page, instruction, id) {
    const { container, title, location, remoteOrHybrid, datePosted, anchorHref } = instruction.extractionInstructions;
    const scrapedJobs = [];
    try {
        const doesJobContainerExists = (await page.waitForSelector(container.selector, { timeout: 15000 }));
        const doesJobContainerHTMLExists = await doesJobContainerExists.evaluate((element) => element.outerHTML);
        if (doesJobContainerHTMLExists) {
            const result = await page.evaluate((scrapedJobs, container, title, location, remoteOrHybrid, datePosted, anchorHref, id) => {
                function extractField(HTMLElement, elementField) {
                    if (elementField.extractType === "" ||
                        elementField.selector === "") {
                        return null;
                    }
                    if (elementField.extractType === "text") {
                        return HTMLElement.querySelector(elementField.selector)
                            ?.textContent.trim()
                            .replace("/n", "");
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
                    const jobsObject = {
                        title: jobTitle,
                        location: jobLocation,
                        remoteOrHybrid: jobRemoteOrHybrid,
                        datePosted: jobDatePosted,
                        anchorHref: jobAnchorHref,
                        description: "",
                        companyID: id,
                    };
                    if (jobsObject.title.includes("Developer") ||
                        jobsObject.title.includes("Engineer")) {
                        scrapedJobs.push(jobsObject);
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
        return scrapedJobs;
    }
    return scrapedJobs;
}
async function extractJobsDetailsText(page, instruction, id) {
    const { description } = instruction.extractionInstructions;
    let scrapeJobsObject = {};
    try {
        const doesJobResponsibilitiesExists = (await page.waitForSelector(description.selector, { timeout: 10000 }));
        if (doesJobResponsibilitiesExists) {
            const result = await page.evaluate((description, id) => {
                const queryJobDescription = document.querySelector(description.selector);
                const junk = queryJobDescription?.querySelectorAll("script, style, nav, footer, svg, img");
                junk?.forEach((el) => el.remove());
                const jobsObject = {
                    id,
                    description: queryJobDescription
                        ? queryJobDescription.textContent
                        : null,
                };
                scrapeJobsObject = { ...jobsObject };
                return jobsObject;
            }, description, id);
            return result;
        }
    }
    catch (error) {
        console.log(`Failed to scrap, check selector, reason: ${error}`);
        return scrapeJobsObject;
    }
    return scrapeJobsObject;
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
async function extractJobsFetchURL(id, url, companyURL) {
    let retrieveFetchedJobs = [];
    try {
        const fetchJobsByURL = await fetch(url, {
            mode: "cors",
        });
        if (fetchJobsByURL.status >= 400) {
            console.log(`Failed to fetch jobs, reason: ${fetchJobsByURL.statusText}`);
            return retrieveFetchedJobs;
        }
        const getJobs = (await fetchJobsByURL.json());
        const result = transform(getJobs.result, (job) => ({
            title: job.jobOpeningName,
            location: job.location.city,
            remoteOrHybrid: job.isRemote,
            anchorHref: `${companyURL}${job.id}`,
            description: "",
            companyID: id,
        }));
        retrieveFetchedJobs = [...result];
    }
    catch (error) {
        console.log(error);
    }
    return retrieveFetchedJobs;
}
export { extractJobsDetailsText, extractJobsFetchURL, extractJobsJSON, extractJobsText, };
//# sourceMappingURL=extractDataFunctions.js.map