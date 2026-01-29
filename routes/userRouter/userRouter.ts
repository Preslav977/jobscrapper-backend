import { Router } from "express";

import {
  userGetDetails,
  userUpdateDetails,
} from "../../controllers/userController/userController.js";

const userRouter = Router();

userRouter.get("{/:id}", userGetDetails);

userRouter.put("/:id", userUpdateDetails);

export { userRouter };
