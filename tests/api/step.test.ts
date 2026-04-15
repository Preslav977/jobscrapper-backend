import "dotenv/config";

import { companyRouter } from "../../routes/companyRouter/companyRouter.js";

import { prisma } from "../../db/client.js";

import request from "supertest";

import { afterEach, describe, expect, it } from "vitest";

import { app } from "../../app.js";

app.use("/instructions", companyRouter);

describe("testing steps controller and routes", () => {
  afterEach(async () => {
    await prisma.user.deleteMany();

    await prisma.company.deleteMany();

    await prisma.steps.deleteMany();
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

  async function createTestCompany() {
    const company = await prisma.company.create({
      data: {
        name: "Test123",
        logo: null,
        URL: "example.com",
        scrapMode: "NAVIGATION",
      },
    });

    return {
      id: company.id,
      name: company.name,
      logo: company.logo,
      URL: company.URL,
      scrapMode: company.scrapMode,
    };
  }

  async function createTestSteps() {
    const testUser = await createTestUser();

    const company = await createTestCompany();

    const { body } = await request(app)
      .post(`/companies/${company.id}/steps`)
      .set("Authorization", `Bearer ${testUser.token}`)
      .send([
        {
          order: 1,
          action: "click",
          selector: "[title='Bulgaria']",
        },
      ]);

    return {
      companyId: company.id,
      token: testUser.token,
      steps: body,
      stepsID: body[0].id,
    };
  }

  describe("[POST], /companies/steps", () => {
    it("user should create steps for company", async () => {
      const testUser = await createTestUser();

      const company = await createTestCompany();

      const { body, header, status } = await request(app)
        .post(`/companies/${company.id}/steps`)
        .set("Authorization", `Bearer ${testUser.token}`)
        .send([
          {
            order: 1,
            action: "click",
            selector: "[title='Bulgaria']",
          },
        ]);

      expect(body).toBeInstanceOf(Array);

      expect(body[0]).toHaveProperty("order");

      expect(body[0]).toHaveProperty("action");

      expect(body[0]).toHaveProperty("selector");

      expect(body[0]).toHaveProperty("selectOption");

      expect(body[0]).toHaveProperty("url");

      expect(body[0]).toHaveProperty("companyID");

      expect(header["content-type"]).toMatch(/json/);

      expect(status).toBe(200);
    });

    it("user shouldn't create steps for company if the array is empty", async () => {
      const testUser = await createTestUser();

      const company = await createTestCompany();

      const { body, header, status } = await request(app)
        .post(`/companies/${company.id}/steps`)
        .set("Authorization", `Bearer ${testUser.token}`)
        .send([]);

      expect(body.message).toEqual(
        "Failed to creates steps for company! The array is empty!",
      );

      expect(header["content-type"]).toMatch(/json/);

      expect(status).toBe(200);
    });
  });
});
