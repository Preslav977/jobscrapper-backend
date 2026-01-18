import { prisma } from "../db/client.js";
async function createCompany(req, res) {
    const { name, URL } = req.body;
    const createCompany = await prisma.company.create({
        data: {
            name,
            URL,
        },
    });
    res.json(createCompany);
}
export { createCompany };
