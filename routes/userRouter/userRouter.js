import { Router } from "express";
import { userGetDetails } from "../../controllers/userController/userController.js";
const userRouter = Router();
userRouter.get("{/:id}", userGetDetails);
export { userRouter };
//# sourceMappingURL=userRouter.js.map