const viewports = [
    { width: 1920, height: 1080 },
    { width: 1536, height: 864 },
    { width: 1440, height: 900 },
];
const randomViewport = viewports[Math.floor(Math.random() * viewports.length)];
function hasJobChanged(existingJob, scrapedJob) {
    if (!existingJob || !scrapedJob)
        return false;
    const keysToCompare = [
        "title",
        "location",
        "remoteOrHybrid",
        "datePosted",
        "description",
        "anchorHref",
        "companyID",
        "formattedData",
        "scrapedText",
        "rawHTML",
    ];
    return keysToCompare.some((key) => existingJob[key] !== scrapedJob[key]);
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