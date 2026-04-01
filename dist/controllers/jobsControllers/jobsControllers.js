import { prisma } from "../../db/client.js";
async function createJobs(req, res) {
    const { id } = req.params;
    if (req.body.length === 0) {
        res.json({ message: "No jobs has been created. Scrapping failed!" });
    }
    else {
        const jobsArray = req.body.map((job) => {
            return {
                ...job,
                companyID: Number(id),
            };
        });
        const createJobsForCompany = await prisma.jobs.createManyAndReturn({
            data: jobsArray,
        });
        res.json(createJobsForCompany);
    }
}
async function getJobDetails(req, res) {
    const { companyID } = req.params;
    const getJobDetails = await prisma.jobs.findMany({
        include: {
            company: true,
        },
        where: {
            companyID: Number(companyID),
        },
    });
    if (getJobDetails.length === 0) {
        res.json({
            message: "No job has been found with that ID in that company!",
        });
    }
    else {
        res.json(getJobDetails);
    }
}
async function updateJob(req, res) {
    const { id, companyID } = req.params;
    const { title, location, remoteOrHybrid, datePosted, description, anchorHref, } = req.body;
    const updateJobDetails = await prisma.jobs.update({
        include: {
            company: true,
        },
        where: {
            companyID: Number(companyID),
            id: Number(id),
        },
        data: {
            title,
            location,
            remoteOrHybrid,
            datePosted,
            description,
            anchorHref,
        },
    });
    res.json(updateJobDetails);
}
async function deleteJob(req, res) {
    const { id, companyID } = req.params;
    //TODO: figure out how to check if job has been expired
    const jobDelete = await prisma.jobs.delete({
        include: {
            company: true,
        },
        where: {
            companyID: Number(companyID),
            id: Number(id),
        },
    });
    res.json({ message: `Job with ID: ${jobDelete.id} has been deleted!` });
}
export { createJobs, deleteJob, getJobDetails, updateJob };
//# sourceMappingURL=jobsControllers.js.map