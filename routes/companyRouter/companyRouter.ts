import { Router } from "express";

import { upload } from "../../helpers/multerConfiguration/multerConfiguration.js";

import {
  createCompany,
  deleteCompany,
  getCompanies,
  getCompanyByName,
  updateCompany,
} from "../../controllers/companyController/companyController.js";

import { validateCreatingCompany } from "../../middlewares/validateCreatingCompany.js";

const companyRouter = Router();

companyRouter.post(
  "/",
  upload.single("file"),
  validateCreatingCompany,
  createCompany,
);

companyRouter.get("/", getCompanies);

companyRouter.get("/:name", getCompanyByName);

companyRouter.put("/:id", upload.single("file"), updateCompany);

companyRouter.delete("/:id", deleteCompany);

export { companyRouter };
