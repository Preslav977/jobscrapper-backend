import { prisma } from "../../db/client.js";

import type { Request, Response } from "express";

import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import type { UserInterface } from "../../interfaces/UserInterface/UserInterface.js";

import type { BearerTokenInterface } from "../../interfaces/BearerTokenInterface/BearerTokenInterface.js";

async function signUpUser(req: Request, res: Response) {
  const { email, password, confirmPassword }: UserInterface = req.body;

  const errors = validationResult(req);

  bcrypt.hash(password, 10, async (error, hashedPassword) => {
    if (error) {
      console.error("Failed to hash the password", error);

      throw error;
    }

    if (!errors.isEmpty()) {
      res.status(400).send(errors.array());
    } else {
      const signUpUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword as string,
          confirmPassword: hashedPassword as string,
        },
      });

      res.json(signUpUser);
    }
  });
}

async function userLogin(req: Request, res: Response) {
  const { id } = req.user as UserInterface;

  console.log(id);

  console.log(typeof id);

  jwt.sign(
    { id },
    process.env.SECRET as string,
    { expiresIn: "15m" },
    (err, token) => {
      res.json({ token });
    },
  );
}

async function userGetDetails(req: BearerTokenInterface, res: Response) {
  const { id } = req.params ? req.params : (req.user as UserInterface);

  console.log(id);

  console.log(req.authData!);
}

export { signUpUser, userGetDetails, userLogin };
