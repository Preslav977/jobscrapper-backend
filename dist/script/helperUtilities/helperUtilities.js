const viewports = [
    { width: 1920, height: 1080 },
    { width: 1536, height: 864 },
    { width: 1440, height: 900 },
];
const randomViewport = viewports[Math.floor(Math.random() * viewports.length)];
function hasJobChanged(existingJob, scrapedJob) {
    let result = false;
    if (existingJob && scrapedJob) {
        const { title, location, remoteOrHybrid, datePosted, description, anchorHref, companyID, formattedData, scrapedText, rawHTML, } = existingJob;
        const existingJobObject = {
            title,
            location,
            remoteOrHybrid,
            datePosted,
            description,
            anchorHref,
            companyID,
            formattedData,
            scrapedText,
            rawHTML,
        };
        for (const propInExistingJob in existingJobObject) {
            for (const propInScrapedJob in scrapedJob) {
                const existingJobKey = propInExistingJob;
                const scrapedJobKey = propInScrapedJob;
                if (existingJobObject[existingJobKey] !== scrapedJob[scrapedJobKey]) {
                    result = true;
                    return result;
                }
                result = false;
                return result;
            }
        }
    }
    return result;
}
function buildData(job) {
    return {
        title: job.title,
        location: job.location,
        remoteOrHybrid: job.remoteOrHybrid,
        datePosted: job.datePosted,
        anchorHref: job.anchorHref,
        description: job.description,
        companyID: job.companyID,
        rawHTML: job.rawHTML,
    };
}
export { buildData, hasJobChanged, randomViewport };
//# sourceMappingURL=helperUtilities.js.map