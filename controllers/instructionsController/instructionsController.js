import { prisma } from "../../db/client.js";
async function createScrappingInstructions(req, res) {
    const { companyID } = req.params;
    const { careersButton, joinUsButton, loadMoreButton, locationSelect, jobCategorySelect, jobTypingInput, submitFormButton, scrollToContainer, nextPageButton, jobsContainer, } = req.body;
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
export { createScrappingInstructions };
//# sourceMappingURL=instructionsController.js.map