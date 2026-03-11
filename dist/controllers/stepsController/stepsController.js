import { prisma } from "../../db/client.js";
async function createScrappingSteps(req, res) {
    const { instructionsID, companyID } = req.params;
    const { order, action, selector } = req.body;
    const createStepsForInstructions = await prisma.steps.create({
        data: {
            order,
            action,
            selector,
            instructionsID: Number(instructionsID),
            companyID: Number(companyID),
        },
    });
    res.json(createStepsForInstructions);
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
//# sourceMappingURL=stepsController.js.map