import { Router } from "express";
import { signUpUser } from "../../controllers/userController/userController.js";
import { validateUserSignUp } from "../../middlewares/validateUserSignUp/validateUserSignUp.js";
const userRouter = Router();
userRouter.post("/", validateUserSignUp, signUpUser);
export { userRouter };
//# sourceMappingURL=userRouter.js.map