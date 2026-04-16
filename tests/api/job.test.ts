import "dotenv/config";

import { companyRouter } from "../../routes/companyRouter/companyRouter.js";

import { prisma } from "../../db/client.js";

import request from "supertest";

import { afterEach, describe, expect, it } from "vitest";

import { app } from "../../app.js";

app.use("/jobs", companyRouter);

describe("testing jobs controller and routes", () => {
  afterEach(async () => {
    await prisma.company.deleteMany();

    await prisma.user.deleteMany();

    await prisma.jobs.deleteMany();
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
        name: "TestCompany1",
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

  async function createTestJobs() {
    const testUser = await createTestUser();

    const testCompany = await createTestCompany();

    const { body } = await request(app)
      .post(`/companies/${testCompany.id}/jobs`)
      .set("Authorization", `Bearer ${testUser.token}`)
      .send([
        {
          title: "JavaScript Developer",
          location: "Sofia",
          remoteOrHybrid: "remote",
          datePosted: "Posted before 10 days",
          description: "",
          anchorHref: "developer/1",
          companyID: testCompany.id,
        },

        {
          title: "React Developer",
          location: "Plovdiv",
          remoteOrHybrid: "remote",
          datePosted: "Posted before 1 day",
          description: "",
          anchorHref: "developer/2",
          companyID: testCompany.id,
        },
      ]);

    return {
      jobs: body,
      companyID: testCompany.id,
      token: testUser.token,
      jobID: body[0].id,
    };
  }

  describe("[POST], /companies/jobs", () => {
    it("user should create jobs for the company", async () => {
      const testUser = await createTestUser();

      const testCompany = await createTestCompany();

      const { body, header, status } = await request(app)
        .post(`/companies/${testCompany.id}/jobs`)
        .set("Authorization", `Bearer ${testUser.token}`)
        .send([
          {
            title: "JavaScript Developer",
            location: "Sofia",
            remoteOrHybrid: "remote",
            datePosted: "Posted before 10 days",
            description: "",
            anchorHref: "developer/1",
            companyID: testCompany.id,
          },

          {
            title: "React Developer",
            location: "Plovdiv",
            remoteOrHybrid: "remote",
            datePosted: "Posted before 1 day",
            description: "",
            anchorHref: "developer/2",
            companyID: testCompany.id,
          },
        ]);

      expect(body).toBeInstanceOf(Array);

      expect(body[0]).toHaveProperty("id");

      expect(body[0]).toHaveProperty("title");

      expect(body[0]).toHaveProperty("location");

      expect(body[0]).toHaveProperty("remoteOrHybrid");

      expect(body[0]).toHaveProperty("datePosted");

      expect(body[0]).toHaveProperty("description");

      expect(body[0]).toHaveProperty("anchorHref");

      expect(body[0]).toHaveProperty("companyID");

      expect(header["content-type"]).toMatch(/json/);

      expect(status).toBe(200);
    });

    it("user shouldn't create jobs if the array is empty", async () => {
      const testUser = await createTestUser();

      const testCompany = await createTestCompany();

      const { body, header, status } = await request(app)
        .post(`/companies/${testCompany.id}/jobs`)
        .set("Authorization", `Bearer ${testUser.token}`)
        .send([]);

      expect(body.message).toBe("No jobs has been created. Scrapping failed!");

      expect(header["content-type"]).toMatch(/json/);

      expect(status).toBe(200);
    });
  });

  describe("[GET], /companies/jobs", () => {
    it("user should see all jobs related to the company", async () => {
      const testJobs = await createTestJobs();

      const { body, header, status } = await request(app).get(
        `/companies/${testJobs.companyID}/jobs`,
      );

      expect(body).toBeInstanceOf(Array);

      expect(body[0]).toHaveProperty("id");

      expect(body[0]).toHaveProperty("title");

      expect(body[0]).toHaveProperty("location");

      expect(body[0]).toHaveProperty("remoteOrHybrid");

      expect(body[0]).toHaveProperty("datePosted");

      expect(body[0]).toHaveProperty("description");

      expect(body[0]).toHaveProperty("anchorHref");

      expect(body[0]).toHaveProperty("companyID");

      expect(body[0]).toHaveProperty("company");

      expect(header["content-type"]).toMatch(/json/);

      expect(status).toBe(200);
    });

    it("user shouldn't see jobs that doesn't exists", async () => {
      const { body, header, status } =
        await request(app).get("/companies/1/jobs");

      expect(body.message).toBe(body.message);

      expect(header["content-type"]).toMatch(/json/);

      expect(status).toBe(200);
    });
  });

  describe("[PUT], /companies/jobs", () => {
    it("user should able to update job for the company", async () => {
      const testJobs = await createTestJobs();

      const { body, header, status } = await request(app)
        .put(`/companies/${testJobs.companyID}/jobs/${testJobs.jobID}`)
        .set("Authorization", `Bearer ${testJobs.token}`)
        .send({
          title: "React Developer",
          location: "Pleven",
          remoteOrHybrid: "Hybrid",
          datePosted: "Posted today",
          description: "",
          anchorHref: "react_developer/1",
          companyID: testJobs.companyID,
        });

      expect(body.title).toBe("React Developer");

      expect(body.location).toBe("Pleven");

      expect(body.remoteOrHybrid).toBe("Hybrid");

      expect(body.datePosted).toBe("Posted today");

      expect(body.description).toBe("");

      expect(body.anchorHref).toBe("react_developer/1");

      expect(body.companyID).toBe(body.companyID);

      expect(header["content-type"]).toMatch(/json/);

      expect(status).toBe(200);
    });
  });

  describe("[DELETE], /companies/jobs", () => {
    it("user should able to delete job inside company", async () => {
      const testJobs = await createTestJobs();

      const { body, header, status } = await request(app)
        .delete(`/companies/${testJobs.companyID}/jobs/${testJobs.jobID}`)
        .set("Authorization", `Bearer ${testJobs.token}`);

      expect(body.message).toBe(body.message);

      expect(header["content-type"]).toMatch(/json/);

      expect(status).toBe(200);
    });
  });
});
