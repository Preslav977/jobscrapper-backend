import { Router } from "express";

import { upload } from "../../helpers/multerConfiguration/multerConfiguration.js";

import {
  userGetDetails,
  userUpdateDetails,
} from "../../controllers/userController/userController.js";
import { validateImageUpload } from "../../middlewares/validateUploadingImage/validateUploadingImage.js";

const userRouter = Router();

userRouter.get("{/:id}", userGetDetails);

userRouter.put(
  "/:id",
  upload.single("file"),
  validateImageUpload,
  userUpdateDetails,
);

export { userRouter };
