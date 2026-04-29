import type { Request, Response } from "express";
declare function signUpUser(req: Request, res: Response): Promise<void>;
declare function userLogin(req: Request, res: Response): Promise<void>;
declare function userGetDetails(req: Request, res: Response): Promise<void>;
declare function userUpdateDetails(req: Request, res: Response): Promise<void>;
export { signUpUser, userGetDetails, userLogin, userUpdateDetails };
//# sourceMappingURL=userController.d.ts.map