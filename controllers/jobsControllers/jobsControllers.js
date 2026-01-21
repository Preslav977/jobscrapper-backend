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
export { createJobs };
//# sourceMappingURL=jobsControllers.js.map