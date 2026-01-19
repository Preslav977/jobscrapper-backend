import { Router } from "express";
import { upload } from "../helpers/multerConfiguration.js";
import { createCompany, getCompanies, } from "../controllers/companyControllers.js";
import { validateCreatingCompany } from "../middlewares/validateCreatingCompany.js";
const companyRouter = Router();
companyRouter.post("/", upload.single("file"), validateCreatingCompany, createCompany);
companyRouter.get("/", getCompanies);
export { companyRouter };
//# sourceMappingURL=companyRouter.js.map