import { prisma } from "../../db/client.js";
async function createScrappingInstructions(req, res) {
    const { companyID } = req.params;
    const { careersButton, careersHoverButton, joinUsButton, joinUsHoverButton, loadMoreButton, locationSelect, locationClickSelect, jobCategorySelect, jobCategoryClickSelect, jobTypingInput, submitFormButton, scrollToContainer, nextPageButton, showMoreJobsOnPage, jobsContainer, jobsContainerTitle, jobsContainerLocation, jobsWorkingDay, jobsWorkingType, jobsDatePosted, jobsContainerDesc, jobsContainerDetailsAnchor, } = req.body;
    const createInstructionsForCompany = await prisma.instructions.create({
        data: {
            careersButton,
            careersHoverButton,
            joinUsButton,
            joinUsHoverButton,
            loadMoreButton,
            locationSelect,
            locationClickSelect,
            jobCategorySelect,
            jobCategoryClickSelect,
            jobTypingInput,
            submitFormButton,
            scrollToContainer,
            nextPageButton,
            showMoreJobsOnPage,
            jobsContainer,
            jobsContainerTitle,
            jobsContainerLocation,
            jobsWorkingDay,
            jobsWorkingType,
            jobsDatePosted,
            jobsContainerDesc,
            jobsContainerDetailsAnchor,
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
    const { careersButton, careersHoverButton, joinUsButton, joinUsHoverButton, loadMoreButton, locationSelect, locationClickSelect, jobCategorySelect, jobCategoryClickSelect, jobTypingInput, submitFormButton, scrollToContainer, nextPageButton, showMoreJobsOnPage, jobsContainer, jobsContainerTitle, jobsContainerLocation, jobsWorkingDay, jobsWorkingType, jobsDatePosted, jobsContainerDesc, jobsContainerDetailsAnchor, } = req.body;
    const updateInstructionsDetails = await prisma.instructions.update({
        where: {
            companyID: Number(companyID),
            id: Number(id),
        },
        data: {
            careersButton,
            careersHoverButton,
            joinUsButton,
            joinUsHoverButton,
            loadMoreButton,
            locationSelect,
            locationClickSelect,
            jobCategorySelect,
            jobCategoryClickSelect,
            jobTypingInput,
            submitFormButton,
            scrollToContainer,
            nextPageButton,
            showMoreJobsOnPage,
            jobsContainer,
            jobsContainerTitle,
            jobsContainerLocation,
            jobsWorkingDay,
            jobsWorkingType,
            jobsDatePosted,
            jobsContainerDesc,
            jobsContainerDetailsAnchor,
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