import jwt from "jsonwebtoken";

import type { NextFunction, Request, Response } from "express";

import type { JWTBearerTokenInterface } from "../../interfaces/JWTBearerTokenInterface/JWTBearerTokenInterface.js";

function verifyBearerToken(
  req: Request & JWTBearerTokenInterface,
  res: Response,
  next: NextFunction,
) {
  const bearerHeader = req.headers.authorization!;

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");

    const bearerToken = bearer[1]!;

    req.token = bearerToken;

    jwt.verify(
      req.token,
      process.env.SECRET,
      (err: JWTBearerTokenInterface, authData: JWTBearerTokenInterface) => {
        if (err) {
          res.sendStatus(403);
        } else {
          req.authData = authData;

          next();
        }
      },
    );
  } else {
    res.sendStatus(403);
  }
}

export { verifyBearerToken };
