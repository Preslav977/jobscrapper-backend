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
    const { responsibilities, requirements, niceToHave, benefits, interviewSteps, } = instruction.extractionInstructions;
    let scrapeJobsObject = {};
    try {
        const doesJobResponsibilitiesExists = (await page.waitForSelector(responsibilities.selector, { timeout: 10000 }));
        if (doesJobResponsibilitiesExists) {
            const result = await page.evaluate((responsibilities, requirements, niceToHave, benefits, interviewSteps, id) => {
                const queryJobRes = document.querySelector(responsibilities.selector)?.textContent;
                const queryJobReq = document.querySelector(requirements.selector)?.textContent;
                const queryJobNiceToHave = document.querySelector(niceToHave.selector)?.textContent;
                const queryJobBenefits = document.querySelector(benefits.selector)?.textContent;
                const queryInterviewSteps = document.querySelector(interviewSteps.selector)?.textContent;
                const jobsObject = {
                    id,
                    responsibilities: queryJobRes,
                    requirements: queryJobReq,
                    niceToHave: queryJobNiceToHave,
                    benefits: queryJobBenefits,
                    interviewSteps: queryInterviewSteps,
                };
                scrapeJobsObject = { ...jobsObject };
                return jobsObject;
            }, responsibilities, requirements, niceToHave, benefits, interviewSteps, id);
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