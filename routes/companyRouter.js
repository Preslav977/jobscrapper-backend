import { Router } from "express";
import { upload } from "../helpers/multerConfiguration.js";
import { createCompany } from "../controllers/companyControllers.js";
const companyRouter = Router();
companyRouter.post("/", upload.single("file"), createCompany);
export { companyRouter };
