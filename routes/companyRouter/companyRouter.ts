import { Router } from "express";

import { upload } from "../../helpers/multerConfiguration/multerConfiguration.js";

import {
  createCompany,
  createCompanyWithRelations,
  deleteCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  updateCompanyWithRelations,
} from "../../controllers/companyController/companyController.js";

import {
  createJobs,
  deleteJob,
  getJobDetails,
  getJobs,
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
  deleteScrappingStepsDetails,
  getScrappingStepsDetails,
  updateScrappingStepsDetails,
} from "../../controllers/stepsController/stepsController.js";
import { validateCreatingCompany } from "../../middlewares/validateCreatingCompany/validateCreatingCompany.js";
import { validateCreatingCompanyTest } from "../../middlewares/validateCreatingCompanyTest/validateCreatingCompanyTest.js";
import { validateImageUpload } from "../../middlewares/validateUploadingImage/validateUploadingImage.js";

const companyRouter = Router();

///CRUD company routes

companyRouter.post(
  "/",
  upload.single("file"),
  validateCreatingCompanyTest,
  createCompany,
);

companyRouter.post(
  "/relations",
  upload.single("file"),
  validateCreatingCompany,
  validateImageUpload,
  createCompanyWithRelations,
);

companyRouter.get("/:id", getCompanyById);

companyRouter.get("/", getCompanies);

companyRouter.put(
  "/:id",
  upload.single("file"),
  validateCreatingCompanyTest,
  validateImageUpload,
  updateCompany,
);

companyRouter.put(
  "/:id/relations/:companyID",
  upload.single("file"),
  validateImageUpload,
  updateCompanyWithRelations,
);

companyRouter.delete("/:id", deleteCompany);

///CRUD jobs routes

companyRouter.post("/:id/jobs", createJobs);

companyRouter.get("/get/jobs{/search}", getJobs);

companyRouter.get("/jobs/:id", getJobDetails);

companyRouter.put("/:companyID/jobs/:id", updateJob);

companyRouter.delete("/:companyID/jobs/:id", deleteJob);

//CRUD instructions routes

companyRouter.post("/:companyID/instructions", createScrappingInstructions);

companyRouter.get("/:companyID/instructions", getScrappingInstructionsDetails);

companyRouter.put(
  "/:companyID/instructions/:id",
  updateScrappingInstructionsDetails,
);

companyRouter.delete(
  "/:companyID/instructions/:id",
  deleteScrappingInstructionsDetails,
);

//CRUD steps routes

companyRouter.post("/:companyID/steps", createScrappingSteps);

companyRouter.get("/:companyID/steps", getScrappingStepsDetails);

companyRouter.put("/:companyID/steps", updateScrappingStepsDetails);

companyRouter.delete("/:companyID/steps", deleteScrappingStepsDetails);

export { companyRouter };
