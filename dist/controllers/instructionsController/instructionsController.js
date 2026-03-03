import { prisma } from "../../db/client.js";
async function createScrappingInstructions(req, res) {
    const { companyID } = req.params;
    const { careersButton, careersHoverButton, joinUsButton, joinUsHoverButton, navigationMenuClick, loadMoreButton, locationSelect, locationSelectOption, locationClickSelect, categorySelect, categorySelectOption, categoryClickSelect, typingInput, submitFormButton, scrollToContainer, nextPageButton, showMoreJobsOnPage, jobContainer, jobTitle, jobLocation, jobRemoteOrHybrid, jobDatePosted, jobDescription, jobDetailsAnchorHref, } = req.body;
    const createInstructionsForCompany = await prisma.instructions.create({
        data: {
            careersButton,
            careersHoverButton,
            joinUsButton,
            joinUsHoverButton,
            navigationMenuClick,
            loadMoreButton,
            locationSelect,
            locationSelectOption,
            locationClickSelect,
            categorySelect,
            categorySelectOption,
            categoryClickSelect,
            typingInput,
            submitFormButton,
            scrollToContainer,
            nextPageButton,
            showMoreJobsOnPage,
            jobContainer,
            jobTitle,
            jobLocation,
            jobRemoteOrHybrid,
            jobDatePosted,
            jobDescription,
            jobDetailsAnchorHref,
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
    const { careersButton, careersHoverButton, joinUsButton, joinUsHoverButton, navigationMenuClick, loadMoreButton, locationSelect, locationSelectOption, locationClickSelect, categorySelect, categorySelectOption, categoryClickSelect, typingInput, submitFormButton, scrollToContainer, nextPageButton, showMoreJobsOnPage, jobContainer, jobTitle, jobLocation, jobRemoteOrHybrid, jobDatePosted, jobDescription, jobDetailsAnchorHref, } = req.body;
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
            navigationMenuClick,
            loadMoreButton,
            locationSelect,
            locationSelectOption,
            locationClickSelect,
            categorySelect,
            categorySelectOption,
            categoryClickSelect,
            typingInput,
            submitFormButton,
            scrollToContainer,
            nextPageButton,
            showMoreJobsOnPage,
            jobContainer,
            jobTitle,
            jobLocation,
            jobRemoteOrHybrid,
            jobDatePosted,
            jobDescription,
            jobDetailsAnchorHref,
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