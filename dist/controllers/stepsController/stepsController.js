import { prisma } from "../../db/client.js";
async function createScrappingSteps(req, res) {
    const { companyID } = req.params;
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
            };
        });
        const createStepsForCompany = await prisma.steps.createManyAndReturn({
            data: stepsArray,
        });
        res.json(createStepsForCompany);
    }
}
async function getScrappingStepsDetails(req, res) {
    const { companyID } = req.params;
    const getStepsDetails = await prisma.steps.findMany({
        where: {
            companyID: Number(companyID),
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
    const { companyID, id } = req.params;
    const { order, action, selector } = req.body;
    const updateStepsDetails = await prisma.steps.updateMany({
        where: {
            companyID: Number(companyID),
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
    const { companyID } = req.params;
    await prisma.steps.deleteMany({
        where: {
            companyID: Number(companyID),
        },
    });
    res.json({
        message: `Steps related to companyID: ${companyID} has been deleted!`,
    });
}
export { createScrappingSteps, deleteScrappingStepsDetails, getScrappingStepsDetails, updateScrappingStepsDetails, };
//# sourceMappingURL=stepsController.js.map