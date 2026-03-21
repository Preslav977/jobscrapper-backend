import { prisma } from "../../db/client.js";

import type { Request, Response } from "express";

import type { Instructions } from "../../generated/prisma/client.js";
import type {
  InstructionsCreateInput,
  InstructionsUpdateInput,
} from "../../generated/prisma/models.js";

async function createScrappingInstructions(req: Request, res: Response) {
  const { companyID } = req.params;

  if (req.body.length === 0) {
    res.json({
      message: "Failed to create instructions for company!",
    });
  } else {
    const instructionsArray: InstructionsCreateInput = req.body.map(
      (instruction: Instructions) => {
        return {
          ...instruction,
          companyID: Number(companyID),
        };
      },
    );

    const createInstructionsForCompany =
      await prisma.instructions.createManyAndReturn({
        data: instructionsArray,
      });

    res.json(createInstructionsForCompany);
  }
}

async function getScrappingInstructionsDetails(req: Request, res: Response) {
  const { companyID, id } = req.params;

  const getInstructionsDetails = await prisma.instructions.findMany({
    include: {
      company: true,
    },

    where: {
      companyID: Number(companyID),
      id: Number(id),
    },
  });

  if (getInstructionsDetails.length === 0) {
    res.json({
      message: "No instructions has been found with that ID for that company!",
    });
  } else {
    res.json(getInstructionsDetails);
  }
}

async function updateScrappingInstructionsDetails(req: Request, res: Response) {
  const { companyID, id } = req.params;

  const { extractionInstructions }: InstructionsUpdateInput = req.body;

  if (extractionInstructions) {
    const updateInstructionsDetails = await prisma.instructions.updateMany({
      where: {
        companyID: Number(companyID),
        id: Number(id),
      },

      data: {
        extractionInstructions,
        companyID: Number(companyID),
      },
    });

    res.json(updateInstructionsDetails);
  }
}

async function deleteScrappingInstructionsDetails(req: Request, res: Response) {
  const { companyID, id } = req.params;

  const deleteInstructionsDetails = await prisma.instructions.deleteMany({
    where: {
      companyID: Number(companyID),
      id: Number(id),
    },
  });

  res.json({
    message: `Instructions with ID: ${deleteInstructionsDetails} has been deleted!`,
  });
}

export {
  createScrappingInstructions,
  deleteScrappingInstructionsDetails,
  getScrappingInstructionsDetails,
  updateScrappingInstructionsDetails,
};
