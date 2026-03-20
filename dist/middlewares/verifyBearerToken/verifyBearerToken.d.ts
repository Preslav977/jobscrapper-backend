import "../../types/expressAugmentation.js";
import "dotenv/config";
import type { NextFunction, Request, Response } from "express";
declare function verifyBearerToken(req: Request, res: Response, next: NextFunction): void;
export { verifyBearerToken };
//# sourceMappingURL=verifyBearerToken.d.ts.map