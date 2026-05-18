import "dotenv/config";

import express from "express";

import path from "node:path";

import { companyRouter } from "./routes/companyRouter/companyRouter.js";

import { userRouter } from "./routes/userRouter/userRouter.js";

import { authRouter } from "./routes/authRouter/authRouter.js";

import type { NextFunction, Request, Response } from "express";

import type { UserIDInterface } from "./interfaces/UserInterface/UserInterface.js";

import session from "express-session";

import { PrismaSessionStore } from "@quixo3/prisma-session-store";

import passport from "passport";

import LocalStrategy from "passport-local";

import bcrypt from "bcryptjs";

import { prisma } from "./db/client.js";

import cors from "cors";

import { conditionalRouteMiddleware } from "./middlewares/conditionalRouteMiddleware/conditionalRouteMiddleware.js";

const app = express();

const assetsPath = path.join(__dirname, "/public");

app.use(express.static(assetsPath));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    secret: process.env.sessionSecret as string,
    resave: false,
    saveUninitialized: false,

    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined!,
    }),
  }),
);

app.use(passport.session());

passport.use(
  new LocalStrategy.Strategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await prisma.user.findFirst({
          where: {
            email,
          },
        });

        if (!user) {
          return done(null, false, {
            message: "Incorrect email, check if is correctly typed!",
          });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
          return done(null, false, {
            message: "Incorrect password, check if is correctly typed!",
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.serializeUser((user: UserIDInterface, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    done(null, user);
  } catch (error) {
    done(error);
  }
});

app.post(
  "users/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
);

app.get("users/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    res.redirect("/login");
  });
});

app.use(authRouter);

// app.use(verifyBearerToken);

app.use(conditionalRouteMiddleware);

app.use("/users", userRouter);

app.use("/companies", companyRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  res.status(500).send(err.stack);
});

process.on("warning", (e) => {
  console.warn(e.stack);
});

export { app };
