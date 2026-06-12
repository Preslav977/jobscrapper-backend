import { Router } from "express";
import { upload } from "../../helpers/multerConfiguration/multerConfiguration.js";
import { createCompanyWithRelations, deleteCompany, getCompanies, getCompanyById, updateCompanyWithRelations, } from "../../controllers/companyController/companyController.js";
import { createJobs, deleteJob, getJobDetails, getJobs, updateJob, } from "../../controllers/jobsControllers/jobsControllers.js";
import { validateCreatingCompany } from "../../middlewares/validateCreatingCompany/validateCreatingCompany.js";
import { validateImageUpload } from "../../middlewares/validateUploadingImage/validateUploadingImage.js";
const companyRouter = Router();
///CRUD company routes
companyRouter.post("/relations", upload.single("file"), validateCreatingCompany, validateImageUpload, createCompanyWithRelations);
companyRouter.get("/:id", getCompanyById);
companyRouter.get("/", getCompanies);
companyRouter.put("/:id/relations/:companyID", upload.single("file"), validateImageUpload, updateCompanyWithRelations);
companyRouter.delete("/:id", deleteCompany);
///CRUD jobs routes
companyRouter.post("/:id/jobs", createJobs);
companyRouter.get("/get/jobs{/search}", getJobs);
companyRouter.get("/jobs/:id", getJobDetails);
companyRouter.put("/:companyID/jobs/:id", updateJob);
companyRouter.delete("/:companyID/jobs/:id", deleteJob);
export { companyRouter };
//# sourceMappingURL=companyRouter.js.map