import { prisma } from "../../db/client.js";
import { validationResult } from "express-validator";
import { supabaseImageUpload } from "../../helpers/supabaseImageUpload/supabaseImageUpload.js";
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
async function updateCompany(req, res) {
    const { id } = req.params;
    const { name, URL } = req.body;
    if (req.file) {
        const logo = await supabaseImageUpload(req.file);
        const companyUpdateInformation = await prisma.company.update({
            where: {
                id: Number(id),
            },
            data: {
                name,
                logo,
                URL,
            },
        });
        res.json(companyUpdateInformation);
    }
    else {
        const companyUpdateInformation = await prisma.company.update({
            where: {
                id: Number(id),
            },
            data: {
                name,
                URL,
            },
        });
        res.json(companyUpdateInformation);
    }
}
async function deleteCompany(req, res) {
    const { id } = req.params;
    const companyDelete = await prisma.company.delete({
        where: {
            id: Number(id),
        },
    });
    res.json({
        message: `Company with ID: ${companyDelete.id} has been deleted!`,
    });
}
export { createCompany, deleteCompany, getCompanies, getCompanyByName, updateCompany, };
//# sourceMappingURL=companyController.js.map