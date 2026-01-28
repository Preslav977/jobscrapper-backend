import "dotenv/config";
import type { NextFunction, Response } from "express";
import type { BearerTokenInterface } from "../../interfaces/BearerTokenInterface/BearerTokenInterface.js";
declare function verifyBearerToken(req: BearerTokenInterface, res: Response, next: NextFunction): void;
export { verifyBearerToken };
//# sourceMappingURL=verifyBearerToken.d.ts.map