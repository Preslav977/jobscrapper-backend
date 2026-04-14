import { prisma } from "../../db/client.js";

import type { Request, Response } from "express";

import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import type { User } from "../../generated/prisma/client.js";
import { supabaseImageUpload } from "../../helpers/supabaseImageUpload/supabaseImageUpload.js";

async function signUpUser(req: Request, res: Response) {
  const { email, password }: User = req.body;

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
  const { id } = req.user as User;

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

    if (userDetails === null) {
      res.json({ message: "User with that ID couldn't be found!" });
    } else {
      res.json(userDetails);
    }
  } else {
    const userDetails = await prisma.user.findFirst({
      where: {
        id: Number(req.authData!.id),
      },
    });
    if (userDetails === null) {
      res.json({ message: "User with that ID couldn't be found!" });
    } else {
      res.json(userDetails);
    }
  }
}

async function userUpdateDetails(req: Request, res: Response) {
  const { id } = req.params;

  const errors = validationResult(req);

  const {
    firstName,
    lastName,
    location,
    email,
    phoneNumber,
    linkedInURL,
    githubURL,
    portfolioURL,
  }: User = req.body;

  if (!errors.isEmpty()) {
    res.status(400).send(errors.array());
  } else {
    const logo = req.file ? await supabaseImageUpload(req.file) : "";

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
  }
}

export { signUpUser, userGetDetails, userLogin, userUpdateDetails };
