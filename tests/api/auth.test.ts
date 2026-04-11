import "dotenv/config";

import { prisma } from "../../db/client.js";

import { authRouter } from "../../routes/authRouter/authRouter.js";

import request from "supertest";

// import jwt from 'jsonwebtoken'

import { beforeEach, describe, expect, it } from "vitest";

import { app } from "../../app.js";

app.use("/", authRouter);

describe("testing auth controller and routes", () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  describe("[POST] /signup", () => {
    it("use should able to signup", async () => {
      const { body, header, status } = await request(app).post("/signup").send({
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
      console.log(body);
      const findTheSignedUpUser = await prisma.user.findFirst();
      console.log(findTheSignedUpUser);
      expect(status).toBe(200);
      expect(header["content-type"]).toMatch(/json/);
    });
  });
});
