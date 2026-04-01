import { prisma } from "../../db/client.js";

import type { Request, Response } from "express";

import type { Steps } from "../../generated/prisma/client.js";

async function createScrappingSteps(req: Request, res: Response) {
  const { companyID } = req.params;

  if (req.body.length === 0) {
    res.json({
      message: "Failed to create scraping steps for company!",
    });
  } else {
    const stepsArray: Steps = req.body.map((step: Steps) => {
      return {
        ...step,
        companyID: Number(companyID),
      };
    });

    const createStepsForCompany = await prisma.steps.createManyAndReturn({
      data: stepsArray,
    });

    res.json(createStepsForCompany);
  }
}

async function getScrappingStepsDetails(req: Request, res: Response) {
  const { companyID } = req.params;

  const getStepsDetails = await prisma.steps.findMany({
    where: {
      companyID: Number(companyID),
    },
  });

  if (getStepsDetails.length === 0) {
    res.json({
      message:
        "No steps has been found with that ID for the instructions company!",
    });
  } else {
    res.json(getStepsDetails);
  }
}

async function updateScrappingStepsDetails(req: Request, res: Response) {
  const updateSteps = await Promise.all(
    req.body.map((step: Steps) =>
      prisma.steps.update({
        where: { id: step.id, companyID: step.companyID },
        data: {
          order: step.order,
          action: step.action,
          selector: step.selector,
          selectOption: step.selectOption,
          url: step.url,
        },
      }),
    ),
  );

  res.json(updateSteps);
}

async function deleteScrappingStepsDetails(req: Request, res: Response) {
  const { companyID } = req.params;

  await prisma.steps.deleteMany({
    where: {
      companyID: Number(companyID),
    },
  });

  res.json({
    message: `Steps related to companyID: ${companyID} has been deleted!`,
  });
}

export {
  createScrappingSteps,
  deleteScrappingStepsDetails,
  getScrappingStepsDetails,
  updateScrappingStepsDetails,
};
