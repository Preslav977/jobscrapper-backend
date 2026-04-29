import { prisma } from "../../db/client.js";
import { validationResult } from "express-validator";
async function createScrappingSteps(req, res) {
    const { companyID } = req.params;
    if (req.body.length === 0 || companyID === null) {
        res.status(400).send({
            message: "Failed to creates steps for company! Is the array empty or the ID exists?",
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
            message: `No steps has been found for the company with ID: ${companyID}`,
        });
    }
    else {
        res.json(getStepsDetails);
    }
}
async function updateScrappingStepsDetails(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty() || req.body.length === 0) {
        res.status(400).send(errors.array());
    }
    else {
        const updateSteps = await Promise.all(req.body.map((step) => prisma.steps.update({
            where: { id: step.id, companyID: step.companyID },
            data: {
                order: step.order,
                action: step.action,
                selector: step.selector,
                selectOption: step.selectOption,
                url: step.url,
            },
        })));
        res.json(updateSteps);
    }
}
async function deleteScrappingStepsDetails(req, res) {
    const { companyID } = req.params;
    await prisma.steps.deleteMany({
        where: {
            companyID: Number(companyID),
        },
    });
    res.json({
        message: `Steps with ID: ${companyID} has been deleted!`,
    });
}
export { createScrappingSteps, deleteScrappingStepsDetails, getScrappingStepsDetails, updateScrappingStepsDetails, };
//# sourceMappingURL=stepsController.js.map