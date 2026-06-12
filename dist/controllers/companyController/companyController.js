import { prisma } from "../../db/client.js";
import { validationResult } from "express-validator";
import { Prisma, } from "../../generated/prisma/client.js";
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
        orderBy: {
            id: "asc",
        },
    });
    if (companies.length === 0) {
        res.json({ message: "No companies has been found!" });
    }
    else {
        res.json(companies);
    }
}
async function getCompanyById(req, res) {
    const { id } = req.params;
    const companyId = await prisma.company.findFirst({
        where: {
            id: Number(id),
        },
        include: {
            jobs: true,
            instructions: true,
            steps: true,
        },
    });
    if (companyId === null) {
        res.json({ message: `No company with this ID: ${id} has been found!` });
    }
    else {
        res.json(companyId);
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
async function updateCompanyWithRelations(req, res) {
    const { id, companyID } = req.params;
    try {
        const { name, URL, scrapMode, instructions, steps, } = JSON.parse(req.body.companyDetails);
        const logo = req.file ? await supabaseImageUpload(req.file) : null;
        const result = await prisma.$transaction(async (tx) => {
            const updateCompany = await tx.company.update({
                where: {
                    id: Number(id),
                },
                include: {
                    jobs: true,
                    instructions: true,
                    steps: true,
                },
                data: { name, URL, logo, scrapMode },
            });
            for (const instruction of instructions) {
                await tx.instructions.upsert({
                    where: {
                        id: Number(instruction.id) || -1,
                        companyID: Number(companyID) || -1,
                    },
                    update: {
                        companyID: Number(companyID),
                        extractionInstructions: instruction.extractionInstructions,
                    },
                    create: {
                        companyID: Number(companyID),
                        extractionInstructions: instruction.extractionInstructions,
                    },
                });
            }
            const deletedStepIds = steps
                .map((step) => step.id)
                .filter(Boolean);
            await tx.steps.deleteMany({
                where: {
                    companyID: Number(companyID),
                    id: {
                        notIn: deletedStepIds,
                    },
                },
            });
            for (const step of steps) {
                await tx.steps.upsert({
                    where: {
                        id: Number(step.id) || -1,
                        companyID: Number(companyID) || -1,
                    },
                    update: {
                        order: step.order,
                        action: step.action,
                        selector: step.selector,
                        selectOption: step.selectOption,
                        url: step.url,
                        companyID: Number(companyID),
                    },
                    create: {
                        order: step.order,
                        action: step.action,
                        selector: step.selector,
                        selectOption: step.selectOption,
                        url: step.url,
                        companyID: Number(companyID),
                    },
                });
            }
            return updateCompany;
        });
        res.json(result);
    }
    catch (error) {
        console.error(`Failed to update company: ${id} and ${companyID}, check you passed the correct IDs`, error);
    }
}
async function deleteCompany(req, res) {
    const { id } = req.params;
    try {
        const companyDelete = await prisma.company.delete({
            where: {
                id: Number(id),
            },
        });
        res.json({
            message: `Company with ID: ${companyDelete.id} has been deleted!`,
        });
    }
    catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2025") {
            res.json({
                message: `Failed to delete company: ${id}, check if ID is not null`,
            });
        }
    }
}
export { createCompany, createCompanyWithRelations, deleteCompany, getCompanies, getCompanyById, updateCompany, updateCompanyWithRelations, };
//# sourceMappingURL=companyController.js.map