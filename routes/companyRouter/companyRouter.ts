import { Router } from "express";

import { upload } from "../../helpers/multerConfiguration/multerConfiguration.js";

import {
  createCompany,
  deleteCompany,
  getCompanies,
  getCompanyByName,
  updateCompany,
} from "../../controllers/companyController/companyController.js";

import {
  createJobs,
  deleteJob,
  getJobDetails,
  updateJob,
} from "../../controllers/jobsControllers/jobsControllers.js";

import {
  createScrappingInstructions,
  deleteScrappingInstructionsDetails,
  getScrappingInstructionsDetails,
  updateScrappingInstructionsDetails,
} from "../../controllers/instructionsController/instructionsController.js";

import {
  createScrappingSteps,
  getScrappingStepsDetails,
  updateScrappingStepsDetails,
} from "../../controllers/stepsController/stepsController.js";

import { validateCreatingCompany } from "../../middlewares/validateCreatingCompany/validateCreatingCompany.js";

const companyRouter = Router();

companyRouter.post(
  "/",
  upload.single("file"),
  validateCreatingCompany,
  createCompany,
);

companyRouter.post("/:id/jobs", createJobs);

companyRouter.post("/:companyID/instructions", createScrappingInstructions);

companyRouter.put(
  "/:companyID/instructions/:id",
  updateScrappingInstructionsDetails,
);

companyRouter.get(
  "/:companyID/instructions/:id",
  getScrappingInstructionsDetails,
);

companyRouter.delete(
  "/:companyID/instructions/:id",
  deleteScrappingInstructionsDetails,
);

companyRouter.post(
  "/:companyID/instructions/:instructionsID/steps",
  createScrappingSteps,
);

companyRouter.get(
  "/:companyID/instructions/:instructionsID/steps",
  getScrappingStepsDetails,
);

companyRouter.put(
  "/:companyID/instructions/:instructionsID/steps/:id",
  updateScrappingStepsDetails,
);

companyRouter.delete(
  "/:companyID/instructions/:instructionID/steps",
  createScrappingSteps,
);

companyRouter.get("/:companyID/job/:id", getJobDetails);

companyRouter.put("/:companyID/job/:id", updateJob);

companyRouter.delete("/:companyID/job/:id", deleteJob);

companyRouter.get("/", getCompanies);

companyRouter.get("/:name", getCompanyByName);

companyRouter.put("/:id", upload.single("file"), updateCompany);

companyRouter.delete("/:id", deleteCompany);

export { companyRouter };
