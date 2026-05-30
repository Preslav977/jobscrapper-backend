import { prisma } from "../../db/client.js";

import type { Request, Response } from "express";

import { Prisma, type Instructions } from "../../generated/prisma/client.js";
import type { InstructionsCreateInput } from "../../generated/prisma/models.js";

async function createScrappingInstructions(req: Request, res: Response) {
  const { companyID } = req.params;

  if (req.body.length === 0 || companyID === null) {
    res.status(400).send({
      message:
        "Failed to create instructions! Is the array empty or the ID exists?",
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
  const getInstructionsDetails = await prisma.instructions.findMany({
    include: {
      company: true,
    },
  });

  if (getInstructionsDetails.length === 0) {
    res.json({
      message: "No instructions has been found for the company!",
    });
  } else {
    res.json(getInstructionsDetails);
  }
}

async function updateScrappingInstructionsDetails(req: Request, res: Response) {
  const { companyID, id } = req.params;

  //pass an array of instructions skipping id, companyID and extractionInstructions

  const [extractionInstructions]: Instructions[] = req.body;

  if (extractionInstructions) {
    const updateInstructionsDetails = await prisma.instructions.update({
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
  } else {
    res.status(400).send({
      message:
        "Failed to update instructions! Do the instructions exists or the ID exists?",
    });
  }
}

async function deleteScrappingInstructionsDetails(req: Request, res: Response) {
  const { companyID, id } = req.params;

  try {
    const instructionDelete = await prisma.instructions.delete({
      where: {
        id: Number(id),
        companyID: Number(companyID),
      },
    });

    res.json({
      message: `Instruction with ID: ${instructionDelete.id} has been deleted!`,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      res.json({
        message: `Failed to delete instruction: ${id} and ${companyID}, check if IDs are not null`,
      });
    }
  }
}

export {
  createScrappingInstructions,
  deleteScrappingInstructionsDetails,
  getScrappingInstructionsDetails,
  updateScrappingInstructionsDetails,
};
