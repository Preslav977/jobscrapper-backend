async function extractJobsText(page, { container, title, location, remoteOrHybrid, datePosted, anchorHref, }) {
    const doesJobContainerExists = (await page.waitForSelector(container.selector));
    if (doesJobContainerExists) {
        const result = await page.evaluate((container, title, location, remoteOrHybrid, datePosted, anchorHref) => {
            function extractField(HTMLElement, elementField) {
                if (HTMLElement === null || elementField === null) {
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
            const scrapedJobsObject = {
                success: null,
                jobs: [],
                err: null,
            };
            const queryAllJobsContainers = document.querySelectorAll(container.selector);
            try {
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
                    };
                    scrapedJobsObject.success = true;
                    scrapedJobsObject.jobs.push(jobsObject);
                });
                return scrapedJobsObject;
            }
            catch (error) {
                scrapedJobsObject.success = false;
                scrapedJobsObject.err = error;
                return scrapedJobsObject;
            }
        }, container, title, location, remoteOrHybrid, datePosted, anchorHref);
        return result;
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
//# sourceMappingURL=scriptExtractUtility.js.map