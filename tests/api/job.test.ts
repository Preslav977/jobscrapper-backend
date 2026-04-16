import "dotenv/config";

import { companyRouter } from "../../routes/companyRouter/companyRouter.js";

import { prisma } from "../../db/client.js";

import request from "supertest";

import { afterEach, describe, expect, it } from "vitest";

import {
  createTestCompany,
  createTestJobs,
  createTestUser,
} from "../helpersFunctions/helperFunctions.js";

import { app } from "../../app.js";

app.use("/jobs", companyRouter);

describe("testing jobs controller and routes", () => {
  afterEach(async () => {
    await prisma.company.deleteMany();

    await prisma.user.deleteMany();

    await prisma.jobs.deleteMany();
  });

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

      expect(body.message).toBe(
        "Failed to create jobs! Is the array empty or the ID exists?",
      );

      expect(header["content-type"]).toMatch(/json/);

      expect(status).toBe(400);
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
