import { prisma } from "../../db/client.js";
async function createScrappingSteps(req, res) {
    const { instructionsID } = req.params;
    const { order, action, selector } = req.body;
    const createStepsForInstructions = await prisma.steps.create({
        data: {
            order,
            action,
            selector,
            instructionsID: Number(instructionsID),
        },
    });
    res.json(createStepsForInstructions);
}
//# sourceMappingURL=stepsController.js.map