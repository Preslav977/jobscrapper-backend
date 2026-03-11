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
