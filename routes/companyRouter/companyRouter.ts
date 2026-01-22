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
  getScrappingInstructionsDetails,
  updateScrappingInstructionsDetails,
} from "../../controllers/instructionsController/instructionsController.js";

import { validateCreatingCompany } from "../../middlewares/validateCreatingCompany.js";

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

companyRouter.get("/:companyID/job/:id", getJobDetails);

companyRouter.put("/:companyID/job/:id", updateJob);

companyRouter.delete("/:companyID/job/:id", deleteJob);

companyRouter.get("/", getCompanies);

companyRouter.get("/:name", getCompanyByName);

companyRouter.put("/:id", upload.single("file"), updateCompany);

companyRouter.delete("/:id", deleteCompany);

export { companyRouter };
