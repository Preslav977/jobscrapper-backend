import "dotenv/config";

import { prisma } from "../../db/client.js";

import { authRouter } from "../../routes/authRouter/authRouter.js";

import request from "supertest";

import type { Response } from "supertest";

// import jwt from 'jsonwebtoken'

import { beforeEach, describe, expect, it } from "vitest";

import { app } from "../../app.js";

app.use("/", authRouter);

describe("testing auth controller and routes", () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  describe("[POST] /signup", () => {
    it("user should able to signup", async () => {
      const { body, header, status }: Response = await request(app)
        .post("/signup")
        .send({
          firstName: "",
          lastName: "",
          password: "12345678BG",
          confirmPassword: "12345678BG",
          location: "",
          email: "test@abv.bg",
          phoneNumber: "",
          linkedInURL: "",
          githubURL: "",
          portfolioURL: "",
        });

      const findTheSignedUpUser = await prisma.user.findFirst();

      expect(findTheSignedUpUser).toBeDefined();

      expect(status).toBe(200);

      expect(header["content-type"]).toMatch(/json/);

      expect(body.email).toMatch("test@abv.bg");

      expect(body.password).toMatch(body.confirmPassword);
    });

    it("user shouldn't able to signup if email not 6 characters", async () => {
      const { body, header, status } = await request(app).post("/signup").send({
        firstName: "",
        lastName: "",
        password: "12345678BG",
        confirmPassword: "12345678BG",
        location: "",
        email: "e@t.c",
        phoneNumber: "",
        linkedInURL: "",
        githubURL: "",
        portfolioURL: "",
      });

      const findTheSignedUpUser = await prisma.user.findFirst();

      expect(findTheSignedUpUser).toBeNull();

      expect(header["content-type"]).toMatch(/json/);

      expect(status).toBe(400);

      expect(body[0].msg).toEqual("Email must be at least 6 characters!");
    });
  });
});
