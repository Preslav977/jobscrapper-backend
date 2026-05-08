import { validationResult } from "express-validator";
import { prisma } from "../../db/client.js";
async function createJobs(req, res) {
    const { id } = req.params;
    if (req.body.length === 0 || id === null) {
        res.status(400).send({
            message: "Failed to create jobs! Is the array empty or the ID exists?",
        });
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
async function getJobs(req, res) {
    const jobs = await prisma.jobs.findMany({
        include: {
            company: true,
        },
    });
    if (jobs.length === 0) {
        res.json({
            message: `No jobs has been found!`,
        });
    }
    else {
        res.json(jobs);
    }
}
async function getJobDetails(req, res) {
    const { companyID } = req.params;
    const jobDetails = await prisma.jobs.findMany({
        include: {
            company: true,
        },
        where: {
            companyID: Number(companyID),
        },
    });
    if (jobDetails.length === 0) {
        res.json({
            message: `No jobs has been found for the company with ID: ${companyID}`,
        });
    }
    else {
        res.json(jobDetails);
    }
}
async function getJobsBySearch(req, res) {
    const { query } = req.query;
    const jobSearch = await prisma.$queryRaw `SELECT * FROM jobs WHERE title ILIKE ${`%${query}%`} OR location ILIKE ${`%${query}%`} OR "remoteOrHybrid" ILIKE ${`%${query}%`}`;
    if (jobSearch.length === 0) {
        res.json({
            message: `No jobs has been found for the search parameter: ${query}`,
        });
    }
    else {
        res.json(jobSearch);
    }
}
async function updateJob(req, res) {
    const { id, companyID } = req.params;
    const errors = validationResult(req);
    const { title, location, remoteOrHybrid, datePosted, description, anchorHref, } = req.body;
    if (!errors.isEmpty()) {
        res.status(400).send(errors.array());
    }
    else {
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
}
async function deleteJob(req, res) {
    const { id, companyID } = req.params;
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
export { createJobs, deleteJob, getJobDetails, getJobs, getJobsBySearch, updateJob, };
//# sourceMappingURL=jobsControllers.js.map