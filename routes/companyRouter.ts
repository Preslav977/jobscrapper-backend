import { Router } from "express";

import { upload } from "../helpers/multerConfiguration";

import { createCompany } from "../controllers/companyControllers";

const companyRouter = Router();

companyRouter.post("/company", upload.single("file"), createCompany);

export { companyRouter };
