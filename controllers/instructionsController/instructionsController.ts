import { prisma } from "../../db/client.js";

import type { Request, Response } from "express";

import type { InstructionsInterface } from "../../interfaces/InstructionsInterface/InstructionsInterface.js";

async function createScrappingInstructions(req: Request, res: Response) {
  const { companyID } = req.params;

  const {
    careersButton,
    joinUsButton,
    loadMoreButton,
    locationSelect,
    jobCategorySelect,
    jobTypingInput,
    submitFormButton,
    scrollToContainer,
    nextPageButton,
    jobsContainer,
  }: InstructionsInterface = req.body;

  const createInstructionsForCompany = await prisma.instructions.create({
    data: {
      careersButton,
      joinUsButton,
      loadMoreButton,
      locationSelect,
      jobCategorySelect,
      jobTypingInput,
      submitFormButton,
      scrollToContainer,
      nextPageButton,
      jobsContainer,
      companyID: Number(companyID),
    },
  });

  res.json(createInstructionsForCompany);
}

export { createScrappingInstructions };
