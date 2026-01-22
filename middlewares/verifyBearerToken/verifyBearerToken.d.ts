import type { NextFunction, Request, Response } from "express";
import type { JWTBearerTokenInterface } from "../../interfaces/JWTBearerTokenInterface/JWTBearerTokenInterface.js";
declare function verifyBearerToken(req: Request & JWTBearerTokenInterface, res: Response, next: NextFunction): void;
export { verifyBearerToken };
//# sourceMappingURL=verifyBearerToken.d.ts.map