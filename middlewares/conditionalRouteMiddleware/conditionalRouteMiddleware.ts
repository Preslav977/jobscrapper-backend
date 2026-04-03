import type { NextFunction, Request, Response } from "express";
import { verifyBearerToken } from "../verifyBearerToken/verifyBearerToken.js";

export function conditionalRouteMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.method === "GET") {
    next();
  } else {
    verifyBearerToken(req, res, next);
  }
}
