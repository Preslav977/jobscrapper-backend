import "dotenv/config";

import { companyRouter } from "../../routes/companyRouter/companyRouter.js";

import { prisma } from "../../db/client.js";

import request from "supertest";

import { afterEach, describe, expect, it } from "vitest";

import { app } from "../../app.js";

app.use("/", companyRouter);

describe("testing company controller and routes", () => {
  afterEach(async () => {
    await prisma.company.deleteMany();

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
      name: company.name,
      logo: company.logo,
      URL: company.URL,
      scrapMode: company.scrapMode,
    };
  }

  describe("[POST], /companies", () => {
    it("user should able to create company", async () => {
      const testUser = await createTestUser();

      const { body, header, status } = await request(app)
        .post("/companies")
        .set("Authorization", `Bearer ${testUser.token}`)
        .send({
          name: "Test",
          logo: null,
          URL: "example.com",
          scrapMode: "NAVIGATION",
        });

      const findDefinedCompany = await prisma.company.findFirst({
        where: {
          id: body.id,
        },
      });

      expect(findDefinedCompany).toBeDefined();

      expect(header["content-type"]).toMatch(/json/);

      expect(status).toBe(200);

      expect(findDefinedCompany?.name).toBe("Test");

      expect(findDefinedCompany?.logo).toBe(null);

      expect(findDefinedCompany?.URL).toBe("example.com");

      expect(findDefinedCompany?.scrapMode).toBe("NAVIGATION");
    });

    it("user should create company with uploaded image", async () => {
      const testUser = await createTestUser();

      const { body, header, status } = await request(app)
        .post("/companies")
        .set("Authorization", `Bearer ${testUser.token}`)
        .attach("file", "public/img.jpeg")
        .field({
          name: "Test1",
        })
        .field({ URL: "example.com" })
        .field({ scrapMode: "NAVIGATION" });

      const findDefinedCompany = await prisma.company.findFirst({
        where: {
          id: body.id,
        },
      });

      expect(findDefinedCompany).toBeDefined();

      expect(findDefinedCompany?.name).toBe("Test1");

      expect(findDefinedCompany?.logo).not.toBe(null);

      expect(findDefinedCompany?.URL).toBe("example.com");

      expect(findDefinedCompany?.scrapMode).toBe("NAVIGATION");

      expect(header["content-type"]).toMatch(/json/);

      expect(status).toBe(200);
    });

    it("user shouldn't able to create company without meeting name requirements", async () => {
      const testUser = await createTestUser();

      const { body, header, status } = await request(app)
        .post("/companies")
        .set("Authorization", `Bearer ${testUser.token}`)
        .send({
          name: "",
          logo: null,
          URL: "example.com",
          scrapMode: "NAVIGATION",
        });

      const findDefinedCompany = await prisma.company.findFirst({
        where: {
          id: body.id,
        },
      });

      expect(body[1].msg).toBe("Company name must be at least 1 character!");

      expect(header["content-type"]).toMatch(/json/);

      expect(status).toBe(400);

      expect(findDefinedCompany).toBeNull();
    });

    it("user shouldn't able to create company if the name is taken", async () => {
      const testUser = await createTestUser();

      const testCompany = await createTestCompany();

      const { body, header, status } = await request(app)
        .post("/companies")
        .set("Authorization", `Bearer ${testUser.token}`)
        .send({
          name: "Test123",
          logo: null,
          URL: "example.com",
          scrapMode: "NAVIGATION",
        });

      const findDefinedCompany = await prisma.company.findFirst({
        where: {
          id: body.id,
        },
      });

      expect(body[0].msg).toBe("Company name already exists!");

      expect(header["content-type"]).toMatch(/json/);

      expect(status).toBe(400);

      expect(findDefinedCompany).toBeDefined();
    });
  });
});
