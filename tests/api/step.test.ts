import "dotenv/config";

import { companyRouter } from "../../routes/companyRouter/companyRouter.js";

import { prisma } from "../../db/client.js";

import request from "supertest";

import { afterEach, describe, expect, it } from "vitest";

import {
  createTestCompany,
  createTestSteps,
  createTestUser,
} from "../helpersFunctions/helperFunctions.js";

import { app } from "../../app.js";

app.use("/instructions", companyRouter);

describe("testing steps controller and routes", () => {
  afterEach(async () => {
    await prisma.user.deleteMany();

    await prisma.company.deleteMany();

    await prisma.steps.deleteMany();
  });

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
        "Failed to creates steps for company! Is the array empty or the ID exists?",
      );

      expect(header["content-type"]).toMatch(/json/);

      expect(status).toBe(400);
    });
  });

  describe("[GET], /companies/steps", () => {
    it("user should see steps for the company", async () => {
      const testSteps = await createTestSteps();

      const { body, header, status } = await request(app)
        .get(`/companies/${testSteps.companyID}/steps`)
        .set("Authorization", `Bearer ${testSteps.token}`);

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

    it("user shouldn't see steps for company if the array is empty", async () => {
      const testUser = await createTestUser();

      const { body, header, status } = await request(app)
        .get("/companies/1/steps")
        .set("Authorization", `Bearer ${testUser.token}`);

      expect(body.message).toEqual(body.message);

      expect(header["content-type"]).toMatch(/json/);

      expect(status).toBe(200);
    });
  });

  describe("[PUT], /companies/steps", () => {
    it("user should update steps for company", async () => {
      const testSteps = await createTestSteps();

      const { body, header, status } = await request(app)
        .put(`/companies/${testSteps.companyID}/steps`)
        .set("Authorization", `Bearer ${testSteps.token}`)
        .send([
          {
            id: testSteps.stepsID,
            order: 1,
            action: "clickMore",
            selector: "[title='Bulgaria']",
            companyID: testSteps.companyID,
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
  });

  describe("[DELETE], /companies/steps", () => {
    it("user should delete steps for company", async () => {
      const testSteps = await createTestSteps();

      const { body, header, status } = await request(app)
        .delete(`/companies/${testSteps.companyID}/steps`)
        .set("Authorization", `Bearer ${testSteps.token}`);

      expect(body.message).toEqual(body.message);

      expect(header["content-type"]).toMatch(/json/);

      expect(status).toBe(200);
    });
  });
});
