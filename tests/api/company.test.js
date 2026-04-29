import "dotenv/config";
import { companyRouter } from "../../routes/companyRouter/companyRouter.js";
import { prisma } from "../../db/client.js";
import request from "supertest";
import { afterEach, describe, expect, it } from "vitest";
import { createTestCompany, createTestUser, } from "../helpersFunctions/helperFunctions.js";
import { app } from "../../app.js";
app.use("/", companyRouter);
describe("testing company controller and routes", () => {
    afterEach(async () => {
        await prisma.company.deleteMany();
        await prisma.user.deleteMany();
    });
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
    describe("[GET], /companies", () => {
        it("user should able to see all defined companies", async () => {
            const testCompany = await createTestCompany();
            const { body, header, status } = await request(app).get("/companies");
            expect(body).toBeInstanceOf(Array);
            expect(body[0]).toHaveProperty("jobs");
            expect(body[0]).toHaveProperty("instructions");
            expect(body[0]).toHaveProperty("steps");
            expect(header["content-type"]).toMatch(/json/);
            expect(status).toBe(200);
        });
        it("user should see no companies if they are not created", async () => {
            const { body, header, status } = await request(app).get("/companies");
            expect(body.message).toBe("No companies has been found!");
            expect(body).not.toBeInstanceOf(Array);
            expect(header["content-type"]).toMatch(/json/);
            expect(status).toBe(200);
        });
        it("user should see defined company by name", async () => {
            const testCompany = await createTestCompany();
            const { body, header, status } = await request(app)
                .get(`/companies/${testCompany.name}`)
                .send({
                name: testCompany.name,
            });
            const findDefinedCompany = await prisma.company.findFirst({
                where: {
                    id: body.id,
                },
            });
            expect(findDefinedCompany).toBeDefined();
            expect(findDefinedCompany?.name).toBe("Test123");
            expect(findDefinedCompany?.logo).toBe(null);
            expect(findDefinedCompany?.URL).toBe("example.com");
            expect(findDefinedCompany?.scrapMode).toBe("NAVIGATION");
            expect(header["content-type"]).toMatch(/json/);
            expect(status).toBe(200);
        });
        it("user shouldn't see a company with name that doesn't exist", async () => {
            const { body, header, status } = await request(app)
                .get("/companies/test")
                .send({
                name: "test",
            });
            expect(body.message).toBe(body.message);
            expect(header["content-type"]).toMatch(/json/);
            expect(status).toBe(200);
        });
    });
    describe("[PUT], /companies", async () => {
        it("user should update company", async () => {
            const testUser = await createTestUser();
            const testCompany = await createTestCompany();
            const { body, header, status } = await request(app)
                .put(`/companies/${testCompany.id}`)
                .set("Authorization", `Bearer ${testUser.token}`)
                .send({
                name: "TestCompany",
                logo: null,
                URL: "example.com/123",
                scrapMode: "NAVIGATION",
            });
            const findDefinedCompany = await prisma.company.findFirst({
                where: {
                    id: body.id,
                },
            });
            expect(findDefinedCompany).toBeDefined();
            expect(findDefinedCompany?.name).toBe("TestCompany");
            expect(findDefinedCompany?.logo).toBe(null);
            expect(findDefinedCompany?.URL).toBe("example.com/123");
            expect(findDefinedCompany?.scrapMode).toBe("NAVIGATION");
            expect(header["content-type"]).toMatch(/json/);
            expect(status).toBe(200);
        });
        it("user should update company with uploading image", async () => {
            const testUser = await createTestUser();
            const testCompany = await createTestCompany();
            const { body, header, status } = await request(app)
                .put(`/companies/${testCompany.id}`)
                .set("Authorization", `Bearer ${testUser.token}`)
                .attach("file", "public/img.jpeg")
                .field({
                name: "TestCompany",
            })
                .field({ URL: "example.com" })
                .field({ scrapMode: "NAVIGATION" });
            const findDefinedCompany = await prisma.company.findFirst({
                where: {
                    id: body.id,
                },
            });
            expect(findDefinedCompany).toBeDefined();
            expect(findDefinedCompany?.name).toBe("TestCompany");
            expect(findDefinedCompany?.logo).not.toBe(null);
            expect(findDefinedCompany?.URL).toBe("example.com");
            expect(findDefinedCompany?.scrapMode).toBe("NAVIGATION");
            expect(header["content-type"]).toMatch(/json/);
            expect(status).toBe(200);
        });
        it("user shouldn't update company if the name doesn't meet the requirements", async () => {
            const testUser = await createTestUser();
            const testCompany = await createTestCompany();
            const { body, header, status } = await request(app)
                .put(`/companies/${testCompany.id}`)
                .set("Authorization", `Bearer ${testUser.token}`)
                .send({
                name: "",
                logo: null,
                URL: "example.com/123",
                scrapMode: "NAVIGATION",
            });
            expect(body[1].msg).toBe("Company name must be at least 1 character!");
            expect(header["content-type"]).toMatch(/json/);
            expect(status).toBe(400);
        });
        it("user shouldn't update company if the name is already taken", async () => {
            const testUser = await createTestUser();
            const testCompany = await createTestCompany();
            const { body, header, status } = await request(app)
                .put(`/companies/${testCompany.id}`)
                .set("Authorization", `Bearer ${testUser.token}`)
                .send({
                name: "Test123",
                logo: null,
                URL: "example.com/",
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
    describe("[DELETE], /companies", () => {
        it("user should delete company", async () => {
            const testUser = await createTestUser();
            const testCompany = await createTestCompany();
            const { body, header, status } = await request(app)
                .delete(`/companies/${testCompany.id}`)
                .set("Authorization", `Bearer ${testUser.token}`);
            expect(body.message).toEqual(body.message);
            expect(header["content-type"]).toMatch(/json/);
            expect(status).toBe(200);
        });
    });
});
//# sourceMappingURL=company.test.js.map