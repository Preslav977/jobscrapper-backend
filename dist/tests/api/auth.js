import "dotenv/config";
import request from "supertest";
import { prisma } from "../../db/client.js";
import { authRouter } from "../../routes/authRouter/authRouter.js";
// import jwt from 'jsonwebtoken'
import { describe, expect, it } from "@jest/globals";
import { app } from "../../app.js";
app.use("/", authRouter);
describe("testing auth controller and routes", () => {
    describe("[POST] /signup", () => {
        it("use should able to signup", async () => {
            const { body, header, status } = await request(app).post("/signup").send({
                firstName: "",
                lastName: "",
                password: "12345678BG",
                confirmPassword: "12345678BG",
                location: "",
                email: "",
                phoneNumber: "",
                linkedInURL: "",
                githubURL: "",
                portfolioURL: "",
            });
            const findTheSignedUpUser = await prisma.user.findFirst();
            console.log(findTheSignedUpUser);
            expect(status).toBe(200);
            expect(header["content-type"]).toMatch(/json/);
        });
    });
});
//# sourceMappingURL=auth.js.map