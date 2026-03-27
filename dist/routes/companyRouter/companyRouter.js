import { Router } from "express";
import { upload } from "../../helpers/multerConfiguration/multerConfiguration.js";
import { createCompany, deleteCompany, getCompanies, getCompanyByName, updateCompany, } from "../../controllers/companyController/companyController.js";
import { createJobs, deleteJob, getJobDetails, updateJob, } from "../../controllers/jobsControllers/jobsControllers.js";
import { createScrappingInstructions, deleteScrappingInstructionsDetails, getScrappingInstructionsDetails, updateScrappingInstructionsDetails, } from "../../controllers/instructionsController/instructionsController.js";
import { createScrappingSteps, getScrappingStepsDetails, updateScrappingStepsDetails, } from "../../controllers/stepsController/stepsController.js";
import { validateCreatingCompany } from "../../middlewares/validateCreatingCompany/validateCreatingCompany.js";
const companyRouter = Router();
///CRUD company routes
companyRouter.post("/", upload.single("file"), validateCreatingCompany, createCompany);
companyRouter.get("/", getCompanies);
companyRouter.get("/:name", getCompanyByName);
companyRouter.put("/:id", upload.single("file"), updateCompany);
companyRouter.delete("/:id", deleteCompany);
///CRUD jobs routes
companyRouter.post("/:id/jobs", createJobs);
companyRouter.get("/:companyID/job/:id", getJobDetails);
companyRouter.put("/:companyID/job/:id", updateJob);
companyRouter.delete("/:companyID/job/:id", deleteJob);
///CRUD instructions routes
companyRouter.post("/:companyID/instructions", createScrappingInstructions);
companyRouter.get("/:companyID/instructions/:id", getScrappingInstructionsDetails);
companyRouter.put("/:companyID/instructions/:id", updateScrappingInstructionsDetails);
companyRouter.delete("/:companyID/instructions/:id", deleteScrappingInstructionsDetails);
///CRUD steps routes
companyRouter.post("/:companyID/steps", createScrappingSteps);
companyRouter.get("/:companyID/steps", getScrappingStepsDetails);
companyRouter.put("/:companyID/steps", updateScrappingStepsDetails);
companyRouter.delete("/:companyID/steps", createScrappingSteps);
export { companyRouter };
//# sourceMappingURL=companyRouter.js.map