import type { Request, Response } from "express";
import { prisma } from "../../db/client.js";
import type { JobsInterface } from "../../interfaces/JobsInterface/JobsInterface.js";

async function createJobs(req: Request, res: Response) {
  const { id } = req.params;

  if (req.body.length === 0) {
    res.json({ message: "No jobs has been created. Scrapping failed!" });
  } else {
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
}

async function getJobDetails(req: Request, res: Response) {
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

  if (getJobDetails === null) {
    res.json({
      message: "No job has been found with that ID in that company!",
    });
  } else {
    res.json(getJobDetails);
  }
}

async function updateJob(req: Request, res: Response) {
  const { id, companyID } = req.params;

  const {
    hybridOrRemote,
    fullTimeOrNot,
    location,
    datePosted,
    jobTitle,
    jobDescription,
  }: JobsInterface = req.body;

  //TODO: figure out how to check if job has been expired

  const updateJobDetails = await prisma.jobs.update({
    include: {
      company: true,
    },

    where: {
      companyID: Number(companyID),
      id: Number(id),
    },

    data: {
      hybridOrRemote,
      fullTimeOrNot,
      location,
      datePosted,
      jobTitle,
      jobDescription,
    },
  });

  res.json(updateJobDetails);
}

export { createJobs, getJobDetails, updateJob };
