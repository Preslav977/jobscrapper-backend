import { prisma } from "../../db/client.js";

import type { Request, Response } from "express";

import type { StepsInterface } from "../../interfaces/StepsInterface/StepsInterface.js";

async function createScrappingSteps(req: Request, res: Response) {
  const { instructionsID } = req.params;

  const { order, action, selector }: StepsInterface = req.body;

  const createStepsForInstructions = await prisma.steps.create({
    data: {
      order,
      action,
      selector,
      instructionsID: Number(instructionsID),
    },
  });

  res.json(createStepsForInstructions);
}

async function getScrappingSteps(req: Request, res: Response) {
  const { instructionsID } = req.params;

  const getStepsDetails = await prisma.steps.findFirst({
    include: {
      instructions: true,
    },

    where: {
      instructionsID: Number(instructionsID),
    },
  });

  if (getStepsDetails === null) {
    res.json({
      message:
        "No steps has been found with that ID for the instructions company!",
    });
  } else {
    res.json(getStepsDetails);
  }
}
