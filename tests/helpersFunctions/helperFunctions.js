import request from "supertest";
import { prisma } from "../../db/client.js";
import { app } from "../../app.js";
async function createTestUser() {
    const user = await prisma.user.create({
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
async function createTestInstructions() {
    const testUser = await createTestUser();
    const company = await createTestCompany();
    const { body } = await request(app)
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
    return {
        companyId: company.id,
        token: testUser.token,
        instructions: body,
        instructionsID: body[0].id,
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
        companyID: company.id,
        token: testUser.token,
        steps: body,
        stepsID: body[0].id,
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
export { createTestCompany, createTestInstructions, createTestJobs, createTestSteps, createTestUser, };
//# sourceMappingURL=helperFunctions.js.map