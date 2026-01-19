import { Router } from "express";
import { upload } from "../helpers/multerConfiguration.js";
import { createCompany, getCompanies, getCompanyByName, updateCompany, } from "../controllers/companyControllers.js";
import { validateCreatingCompany } from "../middlewares/validateCreatingCompany.js";
const companyRouter = Router();
companyRouter.post("/", upload.single("file"), validateCreatingCompany, createCompany);
companyRouter.get("/", getCompanies);
companyRouter.get("/:name", getCompanyByName);
companyRouter.put("/:id", upload.single("file"), updateCompany);
export { companyRouter };
//# sourceMappingURL=companyRouter.js.map