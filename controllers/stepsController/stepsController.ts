import { prisma } from "../../db/client.js";

import type { Request, Response } from "express";

import type { StepsInterface } from "../../interfaces/StepsInterface/StepsInterface.js";

async function createScrappingSteps(req: Request, res: Response) {
  const { companyID, instructionsID } = req.params;

  const { order, action, selector }: StepsInterface = req.body;

  const createStepsForInstructions = await prisma.steps.create({
    data: {
      order,
      action,
      selector,
      companyID: Number(companyID),
      instructionsID: Number(instructionsID),
    },
  });

  res.json(createStepsForInstructions);
}

async function getScrappingStepsDetails(req: Request, res: Response) {
  const { companyID, instructionsID } = req.params;

  const getStepsDetails = await prisma.steps.findMany({
    include: {
      instructions: true,
    },

    where: {
      companyID: Number(companyID),
      instructionsID: Number(instructionsID),
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
  const { companyID, instructionsID, id } = req.params;

  const { order, action, selector }: StepsInterface = req.body;

  const updateStepsDetails = await prisma.steps.update({
    where: {
      companyID: Number(companyID),
      instructionsID: Number(instructionsID),
      id: Number(id),
    },

    data: {
      order,
      action,
      selector,
    },
  });

  res.json(updateStepsDetails);
}

async function deleteScrappingStepsDetails(req: Request, res: Response) {
  const { companyID, instructionsID } = req.params;

  await prisma.steps.deleteMany({
    where: {
      companyID: Number(companyID),
      instructionsID: Number(instructionsID),
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
