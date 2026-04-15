import "dotenv/config";

import { prisma } from "../../db/client.js";

import { userRouter } from "../../routes/userRouter/userRouter.js";

import request from "supertest";

// import jwt from 'jsonwebtoken'

import { beforeEach, describe, expect, it } from "vitest";

import { app } from "../../app.js";

app.use("/", userRouter);

describe("testing user controller and routes", () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

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

  describe("[GET], /users/:id", () => {
    it("user should able to see his details", async () => {
      const testUser = await createTestUser();

      const { body, header, status } = await request(app)
        .get(`/users/${testUser.id}`)
        .set("Authorization", testUser.token);

      const findUpdateUser = await prisma.user.findFirst({
        where: {
          id: body.id,
        },
      });

      expect(findUpdateUser).toBeDefined();

      expect(header["content-type"]).toMatch(/json/);

      expect(status).toBe(200);

      expect(body.email).not.toBe("");

      expect(body.password).not.toBe("");

      expect(body.confirmPassword).not.toBe("");

      expect(body.password).toEqual(body.confirmPassword);
    });

    it("user shouldn't able to see his details if doesn't exists", async () => {
      const testUser = await createTestUser();

      const { body, header, status } = await request(app)
        .get("/users/1")
        .set("Authorization", testUser.token);

      expect(body.message).toBe("User with that ID couldn't be found!");

      expect(header["content-type"]).toMatch(/json/);

      expect(status).toBe(200);
    });
  });

  describe("[PUT], /users/:id", () => {
    it("user should update his details without uploading an profile picture", async () => {
      const testUser = await createTestUser();

      const { body, header, status } = await request(app)
        .put(`/users/${testUser.id}`)
        .set("Authorization", `Bearer ${testUser.token}`)
        .send({
          firstName: "test",
          lastName: "user",
          location: "home",
          email: "test123@abv.bg",
          phoneNumber: 1234567890,
          linkedInURL: "LinkedIn",
          githubURL: "GitHub",
          portfolioURL: "Portfolio",
        });

      const findUpdateUser = await prisma.user.findFirst({
        where: {
          id: body.id,
        },
      });

      expect(findUpdateUser).toBeDefined();

      expect(header["content-type"]).toMatch(/json/);

      expect(status).toBe(200);

      expect(findUpdateUser?.firstName).toBe("test");

      expect(findUpdateUser?.lastName).toBe("user");

      expect(findUpdateUser?.location).toBe("home");

      expect(findUpdateUser?.email).toBe("test123@abv.bg");

      expect(findUpdateUser?.phoneNumber).toBe(1234567890);

      expect(findUpdateUser?.linkedInURL).toBe("LinkedIn");

      expect(findUpdateUser?.githubURL).toBe("GitHub");

      expect(findUpdateUser?.portfolioURL).toBe("Portfolio");

      expect(findUpdateUser?.profilePicture).toBe("");
    });

    it("user should able to upload a profile picture", async () => {
      const testUser = await createTestUser();

      const { body, header, status } = await request(app)
        .put(`/users/${testUser.id}`)
        .set("Authorization", `Bearer ${testUser.token}`)
        .set("Content-Type", "multipart/form-data")
        .attach("file", "public/img.jpeg");

      const findUpdateUser = await prisma.user.findFirst({
        where: {
          id: body.id,
        },
      });

      expect(findUpdateUser).toBeDefined();

      expect(header["content-type"]).toMatch(/json/);

      expect(status).toBe(200);

      expect(findUpdateUser?.profilePicture).not.toBe("");
    });
  });
});
