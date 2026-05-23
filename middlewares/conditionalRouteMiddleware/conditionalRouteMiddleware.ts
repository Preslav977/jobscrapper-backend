import type { NextFunction, Request, Response } from "express";
import { verifyBearerToken } from "../verifyBearerToken/verifyBearerToken.js";

export function conditionalRouteMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.path === "/users" || req.path === `/users/${req.params}`) {
    verifyBearerToken(req, res, next);
  } else if (req.method !== "GET") {
    verifyBearerToken(req, res, next);
  } else {
    next();
  }
}
