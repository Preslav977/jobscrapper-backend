import { Router } from "express";

import { upload } from "../../helpers/multerConfiguration/multerConfiguration.js";

import {
  userGetDetails,
  userUpdateDetails,
} from "../../controllers/userController/userController.js";

const userRouter = Router();

userRouter.get("{/:id}", userGetDetails);

userRouter.put("/:id", upload.single("file"), userUpdateDetails);

export { userRouter };
