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

async function getScrappingInstructionsDetails(req: Request, res: Response) {
  const { companyID, id } = req.params;

  const getInstructionsDetails = await prisma.instructions.findFirst({
    include: {
      company: true,
    },

    where: {
      companyID: Number(companyID),
      id: Number(id),
    },
  });

  if (getInstructionsDetails === null) {
    res.json({
      message: "No instructions has been found with that ID for that company!",
    });
  } else {
    res.json(getInstructionsDetails);
  }
}

async function updateScrappingInstructionsDetails(req: Request, res: Response) {
  const { companyID, id } = req.params;

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

  const updateInstructionsDetails = await prisma.instructions.update({
    where: {
      companyID: Number(companyID),
      id: Number(id),
    },

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
    },
  });

  res.json(updateInstructionsDetails);
}

async function deleteScrappingInstructionsDetails(req: Request, res: Response) {
  const { companyID, id } = req.params;

  const deleteInstructionsDetails = await prisma.instructions.delete({
    where: {
      companyID: Number(companyID),
      id: Number(id),
    },
  });

  res.json({
    message: `Instructions with ID: ${deleteInstructionsDetails.id} has been deleted!`,
  });
}

export {
  createScrappingInstructions,
  deleteScrappingInstructionsDetails,
  getScrappingInstructionsDetails,
  updateScrappingInstructionsDetails,
};
