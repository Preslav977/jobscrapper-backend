import type { Request, Response } from "express";
declare function signUpUser(req: Request, res: Response): Promise<void>;
declare function userLogin(req: Request, res: Response): Promise<void>;
declare function userGetDetails(req: Request, res: Response): Promise<void>;
export { signUpUser, userGetDetails, userLogin };
//# sourceMappingURL=userController.d.ts.map