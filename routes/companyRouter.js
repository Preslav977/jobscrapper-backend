import { Router } from "express";
import { upload } from "../helpers/multerConfiguration";
import { createCompany } from "../controllers/companyControllers";
const companyRouter = Router();
companyRouter.post("/companies", upload.single("file"), createCompany);
export { companyRouter };
//# sourceMappingURL=companyRouter.js.map