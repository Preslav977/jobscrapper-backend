import { prisma } from "../../db/client.js";
async function createScrappingInstructions(req, res) {
    const { companyID } = req.params;
    const { container, title, location, remoteOrHybrid, datePosted, description, anchorHref, } = req.body;
    const createInstructionsForCompany = await prisma.instructions.create({
        data: {
            container,
            title,
            location,
            remoteOrHybrid,
            datePosted,
            description,
            anchorHref,
            companyID: Number(companyID),
        },
    });
    res.json(createInstructionsForCompany);
}
async function getScrappingInstructionsDetails(req, res) {
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
    }
    else {
        res.json(getInstructionsDetails);
    }
}
async function updateScrappingInstructionsDetails(req, res) {
    const { companyID, id } = req.params;
    const { container, title, location, remoteOrHybrid, datePosted, description, anchorHref, } = req.body;
    const updateInstructionsDetails = await prisma.instructions.update({
        where: {
            companyID: Number(companyID),
            id: Number(id),
        },
        data: {
            container,
            title,
            location,
            remoteOrHybrid,
            datePosted,
            description,
            anchorHref,
            companyID: Number(companyID),
        },
    });
    res.json(updateInstructionsDetails);
}
async function deleteScrappingInstructionsDetails(req, res) {
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
export { createScrappingInstructions, deleteScrappingInstructionsDetails, getScrappingInstructionsDetails, updateScrappingInstructionsDetails, };
//# sourceMappingURL=instructionsController.js.map