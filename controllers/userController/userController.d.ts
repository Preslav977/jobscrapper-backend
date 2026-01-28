import type { Request, Response } from "express";
import type { BearerTokenInterface } from "../../interfaces/BearerTokenInterface/BearerTokenInterface.js";
declare function signUpUser(req: Request, res: Response): Promise<void>;
declare function userLogin(req: Request, res: Response): Promise<void>;
declare function userGetDetails(req: BearerTokenInterface, res: Response): Promise<void>;
export { signUpUser, userGetDetails, userLogin };
//# sourceMappingURL=userController.d.ts.map