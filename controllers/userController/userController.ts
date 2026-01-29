import { prisma } from "../../db/client.js";

import type { Request, Response } from "express";

import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import { supabaseImageUpload } from "../../helpers/supabaseImageUpload/supabaseImageUpload.js";
import type { UserInterface } from "../../interfaces/UserInterface/UserInterface.js";

// import type { BearerTokenInterface } from "../../interfaces/BearerTokenInterface/BearerTokenInterface.js";

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

  jwt.sign(
    { id },
    process.env.SECRET as string,
    { expiresIn: "15m" },
    (err, token) => {
      if (err) {
        res.json({ message: "Failed to retrieve Bearer Token: ", err });
      } else {
        res.json({ token });
      }
    },
  );
}

async function userGetDetails(req: Request, res: Response) {
  if (req.params.id) {
    const userDetails = await prisma.user.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json(userDetails);
  } else {
    const userDetails = await prisma.user.findFirst({
      where: {
        id: Number(req.authData!.id),
      },
    });
    res.json(userDetails);
  }
}

async function userUpdateDetails(req: Request, res: Response) {
  const { id } = req.params;

  const {
    firstName,
    lastName,
    location,
    email,
    phoneNumber,
    linkedInURL,
    githubURL,
    portfolioURL,
  }: UserInterface = req.body;

  if (req.file) {
    const logo = await supabaseImageUpload(req.file);

    const updateUserDetails = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        firstName,
        lastName,
        location,
        email,
        phoneNumber,
        linkedInURL,
        githubURL,
        portfolioURL,
        profilePicture: logo,
      },
    });

    res.json(updateUserDetails);
  } else {
    const updateUserDetails = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        firstName,
        lastName,
        location,
        email,
        phoneNumber,
        linkedInURL,
        githubURL,
        portfolioURL,
      },
    });

    res.json(updateUserDetails);
  }
}

export { signUpUser, userGetDetails, userLogin, userUpdateDetails };
