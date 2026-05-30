import type { Request, Response } from "express";
import { validationResult } from "express-validator";
import { prisma } from "../../db/client.js";
import { Prisma, type Jobs } from "../../generated/prisma/client.js";
import { parseMarkedUpText } from "../../script/extractDataFunctions/extractDataFunctions.js";

async function createJobs(req: Request, res: Response) {
  const { id } = req.params;

  if (req.body.length === 0 || id === null) {
    res.status(400).send({
      message: "Failed to create jobs! Is the array empty or the ID exists?",
    });
  } else {
    const jobsArray: Omit<Jobs, "formattedData"> = req.body.map((job: Jobs) => {
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

async function getJobs(req: Request, res: Response) {
  const { query } = req.query;

  switch (query) {
    case undefined:
      {
        const jobs = await prisma.jobs.findMany({
          include: {
            company: true,
          },
        });

        res.json(jobs);
      }

      break;

    case query:
      {
        const searchJobs = await prisma.jobs.findMany({
          include: {
            company: true,
          },

          where: {
            OR: [
              {
                title: {
                  contains: String(query),
                  mode: "insensitive",
                },
              },
              {
                location: {
                  contains: String(query),
                  mode: "insensitive",
                },
              },
              {
                remoteOrHybrid: {
                  contains: String(query),
                  mode: "insensitive",
                },
              },
            ],
          },
        });

        res.json(searchJobs);
      }

      break;

    default:
      res.json({ message: "No jobs has been found!" });
      break;
  }
}

async function getJobDetails(req: Request, res: Response) {
  const { id } = req.params;

  const jobDetails = await prisma.jobs.findFirst({
    include: {
      company: true,
    },
    where: {
      id: Number(id),
    },
  });

  if (jobDetails?.scrapedText) {
    const formattedData = parseMarkedUpText(jobDetails.scrapedText);

    await prisma.jobs.update({
      where: {
        id: Number(id),
      },
      data: {
        formattedData: formattedData,
      },
    });
  }

  if (id === null) {
    res.json({
      message: `No jobs has been found for the company with ID: ${id}`,
    });
  } else {
    res.json(jobDetails);
  }
}

async function getJobsBySearch(req: Request, res: Response) {}

async function updateJob(req: Request, res: Response) {
  const { id, companyID } = req.params;

  const errors = validationResult(req);

  const {
    title,
    location,
    remoteOrHybrid,
    datePosted,
    description,
    anchorHref,
  }: Jobs = req.body;

  if (!errors.isEmpty()) {
    res.status(400).send(errors.array());
  } else {
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

async function deleteJob(req: Request, res: Response) {
  const { id, companyID } = req.params;

  try {
    const jobDelete = await prisma.instructions.delete({
      where: {
        id: Number(id),
        companyID: Number(companyID),
      },
    });

    res.json({
      message: `Job with ID: ${jobDelete.id} has been deleted!`,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      res.json({
        message: `Failed to delete job: ${id} and ${companyID}, check if IDs are not null`,
      });
    }
  }
}

export {
  createJobs,
  deleteJob,
  getJobDetails,
  getJobs,
  getJobsBySearch,
  updateJob,
};
