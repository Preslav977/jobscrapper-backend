import "dotenv/config";
import { prisma } from "../../db/client.js";
import { authRouter } from "../../routes/authRouter/authRouter.js";
import request from "supertest";
import jwt from "jsonwebtoken";
import { beforeEach, describe, expect, it } from "vitest";
import { app } from "../../app.js";
app.use("/", authRouter);
describe("testing auth controller and routes", () => {
    beforeEach(async () => {
        await prisma.user.deleteMany();
    });
    describe("[POST] /signup", () => {
        it("user should able to signup", async () => {
            const { body, header, status } = await request(app)
                .post("/signup")
                .send({
                firstName: "",
                lastName: "",
                password: "12345678BG",
                confirmPassword: "12345678BG",
                location: "",
                email: "test@abv.bg",
                phoneNumber: "",
                linkedInURL: "",
                githubURL: "",
                portfolioURL: "",
            });
            const findTheSignedUpUser = await prisma.user.findFirst();
            expect(findTheSignedUpUser).toBeDefined();
            expect(status).toBe(200);
            expect(header["content-type"]).toMatch(/json/);
            expect(body.email).toMatch("test@abv.bg");
            expect(body.password).toMatch(body.confirmPassword);
        });
        it("user shouldn't able to signup if email is taken", async () => {
            await prisma.user.create({
                data: {
                    firstName: "",
                    lastName: "",
                    password: "12345678BG",
                    confirmPassword: "12345678BG",
                    location: "",
                    email: "test@abv.bg",
                    phoneNumber: 12345678,
                    linkedInURL: "",
                    githubURL: "",
                    portfolioURL: "",
                },
            });
            const { body, header, status } = await request(app).post("/signup").send({
                firstName: "",
                lastName: "",
                password: "12345678BG",
                confirmPassword: "12345678BG",
                location: "",
                email: "test@abv.bg",
                phoneNumber: "",
                linkedInURL: "",
                githubURL: "",
                portfolioURL: "",
            });
            const findTheSignedUpUser = await prisma.user.findFirst();
            expect(findTheSignedUpUser).toBeDefined();
            expect(header["content-type"]).toMatch(/json/);
            expect(status).toBe(400);
            expect(body[0].msg).toEqual("Email is already taken!");
        });
        it("user shouldn't able to signup if email not 6 characters", async () => {
            const { body, header, status } = await request(app).post("/signup").send({
                firstName: "",
                lastName: "",
                password: "12345678BG",
                confirmPassword: "12345678BG",
                location: "",
                email: "e@t.c",
                phoneNumber: "",
                linkedInURL: "",
                githubURL: "",
                portfolioURL: "",
            });
            const findTheSignedUpUser = await prisma.user.findFirst();
            expect(findTheSignedUpUser).toBeNull();
            expect(header["content-type"]).toMatch(/json/);
            expect(status).toBe(400);
            expect(body[0].msg).toEqual("Email must be at least 6 characters!");
        });
        it("user shouldn't able to signup if email is not valid", async () => {
            const { body, header, status } = await request(app).post("/signup").send({
                firstName: "",
                lastName: "",
                password: "12345678BG",
                confirmPassword: "12345678BG",
                location: "",
                email: "email@t",
                phoneNumber: "",
                linkedInURL: "",
                githubURL: "",
                portfolioURL: "",
            });
            const findTheSignedUpUser = await prisma.user.findFirst();
            expect(findTheSignedUpUser).toBeNull();
            expect(header["content-type"]).toMatch(/json/);
            expect(status).toBe(400);
            expect(body[0].msg).toEqual("Must be valid email!");
        });
        it("user shouldn't able to signup if password is not 8 characters", async () => {
            const { body, header, status } = await request(app).post("/signup").send({
                firstName: "",
                lastName: "",
                password: "12345678",
                confirmPassword: "12345678",
                location: "",
                email: "email@test.com",
                phoneNumber: "",
                linkedInURL: "",
                githubURL: "",
                portfolioURL: "",
            });
            const findTheSignedUpUser = await prisma.user.findFirst();
            expect(findTheSignedUpUser).toBeNull();
            expect(header["content-type"]).toMatch(/json/);
            expect(status).toBe(400);
            expect(body[0].msg).toEqual("Password must be minimum 8 characters, and contain at least one letter, and one number");
        });
        it("user shouldn't able to signup if passwords don't match", async () => {
            const { body, header, status } = await request(app).post("/signup").send({
                firstName: "",
                lastName: "",
                password: "12345678BGG",
                confirmPassword: "12345678BG",
                location: "",
                email: "email@test.com",
                phoneNumber: "",
                linkedInURL: "",
                githubURL: "",
                portfolioURL: "",
            });
            const findTheSignedUpUser = await prisma.user.findFirst();
            expect(findTheSignedUpUser).toBeNull();
            expect(header["content-type"]).toMatch(/json/);
            expect(status).toBe(400);
            expect(body[0].msg).toEqual("Passwords must match!");
        });
    });
    describe("[POST] /login", () => {
        it("signup user should able to login and get token", async () => {
            const signupUser = await prisma.user.create({
                data: {
                    firstName: "",
                    lastName: "",
                    password: "$2b$10$AYGKaAHGZIN73a9eyNp5fuvsdze7No6X/D/6P1zjX51mmrA7gI/ju",
                    confirmPassword: "$2b$10$AYGKaAHGZIN73a9eyNp5fuvsdze7No6X/D/6P1zjX51mmrA7gI/ju",
                    location: "",
                    email: "test1@abv.bg",
                    phoneNumber: 12345678,
                    linkedInURL: "",
                    githubURL: "",
                    portfolioURL: "",
                },
            });
            const { body, header, status } = await request(app).post("/login").send({
                id: signupUser.id,
                email: "test1@abv.bg",
                password: "12345678BG",
            });
            const findTheSignedUpUser = await prisma.user.findFirst();
            expect(findTheSignedUpUser).toBeDefined();
            expect(header["content-type"]).toMatch(/json/);
            expect(status).toBe(200);
            expect(body).toHaveProperty("token");
            expect(jwt.verify(body.token, process.env.SECRET) === String);
        });
    });
});
//# sourceMappingURL=auth.test.js.map