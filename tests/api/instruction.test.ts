import "dotenv/config";

import { companyRouter } from "../../routes/companyRouter/companyRouter.js";

import { prisma } from "../../db/client.js";

import request from "supertest";

import { afterEach, describe, expect, it } from "vitest";

import { app } from "../../app.js";

app.use("/instructions", companyRouter);

describe("testing instructions controller and routes", () => {
  afterEach(async () => {
    await prisma.user.deleteMany();

    await prisma.company.deleteMany();

    await prisma.instructions.deleteMany();
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

  describe("[POST], /company/instructions", () => {
    it("user should able to create instructions for company", async () => {
      const testUser = await createTestUser();

      const company = await createTestCompany();

      const { body, header, status } = await request(app)
        .post(`/companies/${company.id}/instructions`)
        .set("Authorization", `Bearer ${testUser.token}`)
        .send([
          {
            extractionInstructions: {
              title: { selector: "h3", extractType: "text" },
              location: { attr: "data-location", extractType: "attribute" },
              container: {
                selector: '[data-company="A1 Bulgaria"]',
                extractType: "text",
              },
              anchorHref: { attr: "href", extractType: "attribute" },
              datePosted: { selector: "", extractType: "" },
              description: {
                selector: "main > div > div:has(p)",
                extractType: "text",
              },
              remoteOrHybrid: {
                selector: "span:nth-child(3)",
                extractType: "text",
              },
            },
          },
        ]);

      expect(body).toBeInstanceOf(Array);

      expect(body[0]).toHaveProperty("extractionInstructions");

      expect(body[0]).toHaveProperty("id");

      expect(body[0].extractionInstructions).toHaveProperty("title");

      expect(body[0].extractionInstructions).toHaveProperty("location");

      expect(body[0].extractionInstructions).toHaveProperty("container");

      expect(body[0].extractionInstructions).toHaveProperty("anchorHref");

      expect(body[0].extractionInstructions).toHaveProperty("datePosted");

      expect(body[0].extractionInstructions).toHaveProperty("description");

      expect(body[0].extractionInstructions).toHaveProperty("remoteOrHybrid");

      expect(body[0]).toHaveProperty("companyID");

      expect(header["content-type"]).toMatch(/json/);

      expect(status).toBe(200);
    });
  });
});
