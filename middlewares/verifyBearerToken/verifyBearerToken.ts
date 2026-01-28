import jwt from "jsonwebtoken";
import "../../types/expressAugmentation.js";

import "dotenv/config";

import type { NextFunction, Request, Response } from "express";

import process from "process";
import type { UserInterface } from "../../interfaces/UserInterface/UserInterface.js";

function verifyBearerToken(req: Request, res: Response, next: NextFunction) {
  const bearerHeader = req.headers.authorization!;

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");

    const bearerToken = bearer[1]!;

    req.token = bearerToken;

    jwt.verify(req.token, process.env.SECRET as string, (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.authData = authData! as UserInterface;

        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
}

export { verifyBearerToken };
