import { Router } from "express";
import { upload } from "../helpers/multerConfiguration.js";
import { createCompany } from "../controllers/companyControllers.js";
import { validateCreatingCompany } from "../middlewares/validateCreatingCompany.js";
const companyRouter = Router();
companyRouter.post("/", upload.single("file"), validateCreatingCompany, createCompany);
export { companyRouter };
//# sourceMappingURL=companyRouter.js.map