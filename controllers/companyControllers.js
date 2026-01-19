import { prisma } from "../db/client.js";
import { validationResult } from "express-validator";
import { supabaseImageUpload } from "../helpers/supabaseImageUpload.js";
async function createCompany(req, res) {
    const { name, URL } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).send(errors.array());
    }
    else {
        if (req.file) {
            const logo = await supabaseImageUpload(req.file);
            const createCompany = await prisma.company.create({
                data: {
                    name,
                    URL,
                    logo,
                },
            });
            res.json(createCompany);
        }
    }
}
async function getCompanies(req, res) {
    const companiesGet = await prisma.company.findMany({
        include: {
            jobs: true,
            instructions: true,
        },
    });
    if (companiesGet.length === 0) {
        res.json({ message: "No companies has been found!" });
    }
    else {
        res.json(companiesGet);
    }
}
async function getCompanyByName(req, res) {
    const { name } = req.body;
    const trimCompanyNameSpace = name.trim();
    const companyGetByName = await prisma.company.findFirst({
        where: {
            name: {
                mode: "insensitive",
                equals: trimCompanyNameSpace,
            },
        },
    });
    if (companyGetByName === null) {
        res.json({ message: "No company with this name has been found!" });
    }
    else {
        res.json(companyGetByName);
    }
}
export { createCompany, getCompanies, getCompanyByName };
//# sourceMappingURL=companyControllers.js.map