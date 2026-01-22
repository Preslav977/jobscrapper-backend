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
    const { careersButton, joinUsButton, loadMoreButton, locationSelect, jobCategorySelect, jobTypingInput, submitFormButton, scrollToContainer, nextPageButton, jobsContainer, } = req.body;
    const updateInstructionsDetails = await prisma.instructions.update({
        where: {
            companyID: Number(companyID),
            id: Number(id),
        },
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
        },
    });
    res.json(updateInstructionsDetails);
}
export { createScrappingInstructions, getScrappingInstructionsDetails, updateScrappingInstructionsDetails, };
//# sourceMappingURL=instructionsController.js.map