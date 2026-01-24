import type { Request, Response } from "express";
import { JWTBearerTokenInterface } from "../../interfaces/JWTBearerTokenInterface/JWTBearerTokenInterface.js";
declare function signUpUser(req: Request, res: Response): Promise<void>;
declare function userLogin(req: Request, res: Response): Promise<void>;
declare function userGetDetails(req: Request & JWTBearerTokenInterface, res: Response): Promise<void>;
export { signUpUser, userGetDetails, userLogin };
//# sourceMappingURL=userController.d.ts.map