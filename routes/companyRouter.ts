import { Router } from "express";

import { upload } from "../helpers/multerConfiguration.js";

import {
  createCompany,
  getCompanies,
  getCompanyByName,
} from "../controllers/companyControllers.js";

import { validateCreatingCompany } from "../middlewares/validateCreatingCompany.js";

const companyRouter = Router();

companyRouter.post(
  "/",
  upload.single("file"),
  validateCreatingCompany,
  createCompany,
);

companyRouter.get("/", getCompanies);

companyRouter.get("/:name", getCompanyByName);

export { companyRouter };
