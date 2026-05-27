import { prisma } from "../../db/client.js";
import { validationResult } from "express-validator";
import { supabaseImageUpload } from "../../helpers/supabaseImageUpload/supabaseImageUpload.js";
async function createCompany(req, res) {
    const { name, URL, scrapMode } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).send(errors.array());
    }
    else {
        const logo = req.file ? await supabaseImageUpload(req.file) : null;
        const createCompany = await prisma.company.create({
            data: {
                name,
                logo,
                URL,
                scrapMode,
            },
        });
        res.json(createCompany);
    }
}
async function createCompanyWithRelations(req, res) {
    const { name, URL, scrapMode, instructions, steps, } = req.body.companyDetails;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).send(errors.array());
    }
    else {
        const logo = req.file ? await supabaseImageUpload(req.file) : null;
        const createCompany = await prisma.company.create({
            include: {
                instructions: true,
                steps: true,
            },
            data: {
                name,
                logo,
                URL,
                scrapMode,
                instructions: {
                    create: instructions,
                },
                steps: {
                    create: steps,
                },
            },
        });
        res.send(createCompany);
    }
}
async function getCompanies(req, res) {
    const companies = await prisma.company.findMany({
        include: {
            jobs: true,
            instructions: true,
            steps: true,
        },
    });
    if (companies.length === 0) {
        res.json({ message: "No companies has been found!" });
    }
    else {
        res.json(companies);
    }
}
async function getCompanyByName(req, res) {
    const { name } = req.body;
    const trimCompanyNameSpace = name.trim();
    const companyName = await prisma.company.findFirst({
        where: {
            name: {
                mode: "insensitive",
                equals: trimCompanyNameSpace,
            },
        },
        include: {
            jobs: true,
            instructions: true,
        },
    });
    if (companyName === null) {
        res.json({ message: `No company with this name: ${name} has been found!` });
    }
    else {
        res.json(companyName);
    }
}
async function updateCompany(req, res) {
    const { id } = req.params;
    const { name, URL, scrapMode } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).send(errors.array());
    }
    else {
        const logo = req.file ? await supabaseImageUpload(req.file) : null;
        const companyUpdateInformation = await prisma.company.update({
            where: {
                id: Number(id),
            },
            data: {
                name,
                URL,
                logo,
                scrapMode,
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
export { createCompany, createCompanyWithRelations, deleteCompany, getCompanies, getCompanyByName, updateCompany, };
//# sourceMappingURL=companyController.js.map