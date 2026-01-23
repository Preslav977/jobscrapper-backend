import { prisma } from "../../db/client.js";

import type { Request, Response } from "express";

import type { UserInterface } from "../../interfaces/UserInterface/UserInterface.js";

async function signUpUser(req: Request, res: Response) {
  const { email, password, confirmPassword }: UserInterface = req.body;

  const signUpUser = await prisma.user.create({
    data: {
      email,
      password,
      confirmPassword,
    },
  });

  res.json(signUpUser);
}

export { signUpUser };
