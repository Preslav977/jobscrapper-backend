import type { Request, Response } from "express";
import { prisma } from "../../db/client.js";
import type { JobsInterface } from "../../interfaces/JobsInterface/JobsInterface.js";

async function createJobs(req: Request, res: Response) {
  const { id } = req.params;

  const jobsArray: JobsInterface = req.body.map((job: JobsInterface) => {
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
