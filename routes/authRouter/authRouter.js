import { Router } from "express";
import passport from "passport";
import { validateUserSignUp } from "../../middlewares/validateUserSignUp/validateUserSignUp.js";
const authRouter = Router();
import { signUpUser, userLogin, } from "../../controllers/userController/userController.js";
authRouter.post("/signup", validateUserSignUp, signUpUser);
authRouter.post("/login", passport.authenticate("local", { session: false }), userLogin);
export { authRouter };
//# sourceMappingURL=authRouter.js.map