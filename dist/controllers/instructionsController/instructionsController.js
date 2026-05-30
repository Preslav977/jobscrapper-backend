import { prisma } from "../../db/client.js";
import { Prisma } from "../../generated/prisma/client.js";
async function createScrappingInstructions(req, res) {
    const { companyID } = req.params;
    if (req.body.length === 0 || companyID === null) {
        res.status(400).send({
            message: "Failed to create instructions! Is the array empty or the ID exists?",
        });
    }
    else {
        const instructionsArray = req.body.map((instruction) => {
            return {
                ...instruction,
                companyID: Number(companyID),
            };
        });
        const createInstructionsForCompany = await prisma.instructions.createManyAndReturn({
            data: instructionsArray,
        });
        res.json(createInstructionsForCompany);
    }
}
async function getScrappingInstructionsDetails(req, res) {
    const getInstructionsDetails = await prisma.instructions.findMany({
        include: {
            company: true,
        },
    });
    if (getInstructionsDetails.length === 0) {
        res.json({
            message: "No instructions has been found for the company!",
        });
    }
    else {
        res.json(getInstructionsDetails);
    }
}
async function updateScrappingInstructionsDetails(req, res) {
    const { companyID, id } = req.params;
    //pass an array of instructions skipping id, companyID and extractionInstructions
    const [extractionInstructions] = req.body;
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
    }
    else {
        res.status(400).send({
            message: "Failed to update instructions! Do the instructions exists or the ID exists?",
        });
    }
}
async function deleteScrappingInstructionsDetails(req, res) {
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
    }
    catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2025") {
            res.json({
                message: `Failed to delete instruction: ${id} and ${companyID}, check if IDs are not null`,
            });
        }
    }
}
export { createScrappingInstructions, deleteScrappingInstructionsDetails, getScrappingInstructionsDetails, updateScrappingInstructionsDetails, };
//# sourceMappingURL=instructionsController.js.map