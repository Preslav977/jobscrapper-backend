async function extractJobsText(page, instruction, id) {
    const { container, title, location, remoteOrHybrid, datePosted, description, anchorHref, } = instruction.extractionInstructions;
    const containerExists = await page
        .waitForSelector(`${container.selector}`, { timeout: 15000 })
        .catch(() => null);
    if (!containerExists) {
        console.warn(`The container for the jobs is null: ${container.selector}!`);
        return [];
    }
    try {
        return await page.evaluate((cfg, companyID) => {
            function extractField(el, field) {
                if (!field.extractType)
                    return null;
                const target = field.selector
                    ? el.querySelector(field.selector)
                    : el;
                if (!target)
                    return null;
                if (field.extractType === "text") {
                    return target.textContent
                        ? target.textContent.trim().replace("\n", "")
                        : null;
                }
                if (field.extractType === "attribute" && field.attr) {
                    return el.getAttribute(field.attr);
                }
                if (field.extractType === "elementAttribute" && field.attr) {
                    return target.getAttribute(field.attr);
                }
                return null;
            }
            const jobsNodes = document.querySelectorAll(cfg.container.selector);
            const scrapedJobs = [];
            jobsNodes.forEach((node) => {
                const rawTitle = extractField(node, cfg.title) || "";
                if (rawTitle.includes("Developer") || rawTitle.includes("Engineer"))
                    scrapedJobs.push({
                        title: rawTitle,
                        location: extractField(node, cfg.location) || "",
                        remoteOrHybrid: extractField(node, cfg.remoteOrHybrid) || "",
                        datePosted: extractField(node, cfg.datePosted) || "",
                        description: cfg.description.selector,
                        anchorHref: extractField(node, cfg.anchorHref) || "",
                        companyID: companyID,
                    });
            });
            return scrapedJobs;
        }, {
            container,
            title,
            location,
            remoteOrHybrid,
            datePosted,
            description,
            anchorHref,
        }, id);
    }
    catch (error) {
        console.error(`extractJobsText failed to scrap, instruction might have changed: ${error}`);
        return [];
    }
}
async function extractJobsDetailsText(page, instruction) {
    const { description } = instruction.extractionInstructions;
    const descriptionExists = await page
        .waitForSelector(description.selector, { timeout: 15000 })
        .catch(() => null);
    if (!descriptionExists) {
        console.warn(`The description for the jobs details is null: ${description.selector}!`);
        return { structuredText: "", rawHTML: "" };
    }
    try {
        const extractionResult = await page.evaluate((description) => {
            const container = document.querySelector(description.selector);
            if (!container)
                return { structuredText: "", rawHTML: "" };
            const rawHTML = container.outerHTML;
            const junk = container.querySelectorAll("script, style, nav, footer, svg, img");
            junk?.forEach((el) => el.remove());
            const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT);
            let structuredText = "";
            let currentNode = walker.nextNode();
            while (currentNode && currentNode instanceof Element) {
                const tagName = currentNode.tagName;
                const text = currentNode.textContent.trim();
                if (text) {
                    if (["H1", "H2", "H3", "H4", "STRONG", "B"].includes(tagName)) {
                        structuredText += `\n\n[HEADER]: ${text}\n`;
                    }
                    else if (tagName === "LI") {
                        structuredText += `\n* ${text}`;
                    }
                    else if (tagName === "P" || tagName === "DIV") {
                        if (currentNode.children.length === 0) {
                            structuredText += `\n\n${text}`;
                        }
                    }
                }
                currentNode = walker.nextNode();
            }
            return { structuredText, rawHTML };
        }, description);
        return extractionResult;
    }
    catch (error) {
        console.error(`extractJobsDetailsText failed to scrap, instruction might have changed: ${error}`);
        return { structuredText: "", rawHTML: "" };
    }
}
function parseMarkedUpText(rawText) {
    const sections = rawText.split("[HEADER]:");
    const result = {
        responsibilities: [],
        requirements: [],
        benefits: [],
        other: [],
    };
    sections.forEach((section) => {
        const lines = section
            .split("\n")
            .map((l) => l.trim())
            .filter((l) => l !== "");
        if (lines.length === 0)
            return;
        const header = lines[0].toLowerCase();
        const content = lines.slice(1);
        if (header.match(/routine|responsibilities|tasks|daily|role/i)) {
            result.responsibilities.push(...content);
        }
        else if (header.match(/technology stack|qualification|requirements|skills|requirements|unique|you have/i)) {
            result.requirements.push(...content);
        }
        else if (header.match(/offer|gratitude|benefits|goodies/i)) {
            result.benefits.push(...content);
        }
        else {
            result.other.push(...lines);
        }
    });
    return result;
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
            description: "",
            anchorHref: `${companyURL}${job.id}`,
            companyID: id,
        }));
        retrieveFetchedJobs = [...result];
    }
    catch (error) {
        console.log(`extractJobsFetchURL failed to fetch, check the URL: ${error}`);
    }
    return retrieveFetchedJobs;
}
export { extractJobsDetailsText, extractJobsFetchURL, extractJobsJSON, extractJobsText, parseMarkedUpText, };
//# sourceMappingURL=extractDataFunctions.js.map