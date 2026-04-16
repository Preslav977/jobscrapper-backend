import "dotenv/config";

import { companyRouter } from "../../routes/companyRouter/companyRouter.js";

import { prisma } from "../../db/client.js";

import request from "supertest";

import { afterEach, describe, expect, it } from "vitest";

import {
  createTestCompany,
  createTestInstructions,
  createTestUser,
} from "../helpersFunctions/helperFunctions.js";

import { app } from "../../app.js";

app.use("/instructions", companyRouter);

describe("testing instructions controller and routes", () => {
  afterEach(async () => {
    await prisma.user.deleteMany();

    await prisma.company.deleteMany();

    await prisma.instructions.deleteMany();
  });

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

    it("user shouldn't able to create instructions with using empty array", async () => {
      const testUser = await createTestUser();

      const company = await createTestCompany();

      const { body, header, status } = await request(app)
        .post(`/companies/${company.id}/instructions`)
        .set("Authorization", `Bearer ${testUser.token}`)
        .send([]);

      expect(body.message).toBe(
        "Failed to create instructions! Is the array empty or the ID exists?",
      );

      expect(header["content-type"]).toMatch(/json/);

      expect(status).toBe(400);
    });
  });

  describe("[GET], /companies/instructions", () => {
    it("user should able to see defined instructions for company", async () => {
      const testInstructions = await createTestInstructions();

      const { body, header, status } = await request(app)
        .get(`/companies/${testInstructions.companyId}/instructions`)
        .set("Authorization", `Bearer ${testInstructions.token}`)
        .send([]);

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

      expect(body[0]).toHaveProperty("company");

      expect(header["content-type"]).toMatch(/json/);

      expect(status).toBe(200);
    });

    it("user shouldn't able to see not defined instructions for company", async () => {
      const testUser = await createTestUser();

      const { body, header, status } = await request(app)
        .get(`/companies/1/instructions`)
        .set("Authorization", `Bearer ${testUser.token}`);

      expect(body.message).toBe(
        "No instructions has been found for the company!",
      );

      expect(header["content-type"]).toMatch(/json/);

      expect(status).toBe(200);
    });
  });

  describe("[PUT], /companies/instructions", () => {
    it("user should able to update instructions for company", async () => {
      const testInstructions = await createTestInstructions();

      const { body, header, status } = await request(app)
        .put(
          `/companies/${testInstructions.companyId}/instructions/${testInstructions.instructionsID}`,
        )
        .set("Authorization", `Bearer ${testInstructions.token}`)
        .send([
          {
            title: { selector: "h1", extractType: "text" },
            location: { attr: "data-location", extractType: "attribute" },
            container: {
              selector: '[data-company="A1"]',
              extractType: "text",
            },
            anchorHref: { attr: "href", extractType: "attribute" },
            datePosted: { selector: "", extractType: "" },
            description: {
              selector: "main",
              extractType: "text",
            },
            remoteOrHybrid: {
              selector: "span",
              extractType: "text",
            },
          },
        ]);

      expect(body).toHaveProperty("id");

      expect(body.extractionInstructions).toHaveProperty("title");

      expect(body.extractionInstructions).toHaveProperty("location");

      expect(body.extractionInstructions).toHaveProperty("container");

      expect(body.extractionInstructions).toHaveProperty("anchorHref");

      expect(body.extractionInstructions).toHaveProperty("datePosted");

      expect(body.extractionInstructions).toHaveProperty("description");

      expect(body.extractionInstructions).toHaveProperty("remoteOrHybrid");

      expect(body).toHaveProperty("companyID");

      expect(header["content-type"]).toMatch(/json/);

      expect(status).toBe(200);
    });
  });

  describe("[DELETE], /companies/instructions", () => {
    it("user should able to delete instructions for company", async () => {
      const testInstructions = await createTestInstructions();

      const { body, header, status } = await request(app)
        .delete(
          `/companies/${testInstructions.companyId}/instructions/${testInstructions.instructionsID}`,
        )
        .set("Authorization", `Bearer ${testInstructions.token}`);

      expect(body.message).toBe(body.message);

      expect(header["content-type"]).toMatch(/json/);

      expect(status).toBe(200);
    });
  });
});
