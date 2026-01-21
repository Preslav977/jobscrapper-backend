import { prisma } from "../../db/client.js";
async function createJobs(req, res) {
    const { id } = req.params;
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
async function getJobDetails(req, res) {
    const { id, companyID } = req.params;
    const getJobDetails = await prisma.jobs.findFirst({
        include: {
            company: true,
        },
        where: {
            companyID: Number(companyID),
            id: Number(id),
        },
    });
    res.json(getJobDetails);
}
export { createJobs, getJobDetails };
//# sourceMappingURL=jobsControllers.js.map