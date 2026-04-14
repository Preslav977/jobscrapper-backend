import "dotenv/config";

import { prisma } from "../../db/client.js";

import { userRouter } from "../../routes/userRouter/userRouter.js";

import request from "supertest";

// import jwt from 'jsonwebtoken'

import { beforeEach, describe, expect, it } from "vitest";

import { app } from "../../app.js";

app.use("/", userRouter);

describe("testing user controller and routes", () => {
  async function createTestUser() {
    const user = await prisma.user.create({
      data: {
        firstName: "",
        lastName: "",
        password:
          "$2b$10$AYGKaAHGZIN73a9eyNp5fuvsdze7No6X/D/6P1zjX51mmrA7gI/ju",
        confirmPassword:
          "$2b$10$AYGKaAHGZIN73a9eyNp5fuvsdze7No6X/D/6P1zjX51mmrA7gI/ju",
        location: "",
        email: "test1@abv.bg",
        phoneNumber: 12345678,
        linkedInURL: "",
        githubURL: "",
        portfolioURL: "",
      },
    });

    const loginUser = await request(app).post("/login").send({
      id: user.id,
      email: user.email,
      password: "12345678BG",
    });

    const { token } = loginUser.body;

    return {
      id: user.id,
      token,
    };
  }

  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  describe("[GET], /users:/id", () => {
    it("user should able to see his details", async () => {
      const testUser = await createTestUser();

      const { body, header, status } = await request(app)
        .get(`/users/${testUser.id}`)
        .set("Authorization", testUser.token);

      const findUserDetails = await prisma.user.findFirst({
        where: {
          id: body.id,
        },
      });

      expect(findUserDetails).toBeDefined();

      expect(header["content-type"]).toMatch(/json/);

      expect(status).toBe(200);

      expect(body.email).not.toBe("");

      expect(body.password).not.toBe("");

      expect(body.confirmPassword).not.toBe("");

      expect(body.password).toEqual(body.confirmPassword);
    });
  });
});
