import { prisma } from "../../db/client.js";
async function createScrappingSteps(req, res) {
    const { companyID, instructionsID } = req.params;
    if (req.body.length === 0) {
        res.json({
            message: "Failed to create scraping steps for company!",
        });
    }
    else {
        const stepsArray = req.body.map((step) => {
            return {
                ...step,
                companyID: Number(companyID),
                instructionsID: Number(instructionsID),
            };
        });
        const createStepsForCompany = await prisma.steps.createManyAndReturn({
            data: stepsArray,
        });
        res.json(createStepsForCompany);
    }
}
async function getScrappingStepsDetails(req, res) {
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
            message: "No steps has been found with that ID for the instructions company!",
        });
    }
    else {
        res.json(getStepsDetails);
    }
}
async function updateScrappingStepsDetails(req, res) {
    const { companyID, instructionsID, id } = req.params;
    const { order, action, selector } = req.body;
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
async function deleteScrappingStepsDetails(req, res) {
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
export { createScrappingSteps, deleteScrappingStepsDetails, getScrappingStepsDetails, updateScrappingStepsDetails, };
//# sourceMappingURL=stepsController.js.map