import { prisma } from "../../db/client.js";

import type { Request, Response } from "express";

import { validationResult } from "express-validator";

import type { Company, Steps } from "../../generated/prisma/client.js";

import { supabaseImageUpload } from "../../helpers/supabaseImageUpload/supabaseImageUpload.js";
import { CompanyWithRelationsType } from "../../interfaces/CompanyInterface/CompanyInterface.js";

async function createCompany(req: Request, res: Response) {
  const { name, URL, scrapMode }: Company = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).send(errors.array());
  } else {
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

async function createCompanyWithRelations(req: Request, res: Response) {
  const {
    name,
    URL,
    scrapMode,
    instructions,
    steps,
  }: CompanyWithRelationsType = req.body.companyDetails;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).send(errors.array());
  } else {
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

async function getCompanies(req: Request, res: Response) {
  const companies = await prisma.company.findMany({
    include: {
      jobs: true,
      instructions: true,
      steps: true,
    },
  });

  if (companies.length === 0) {
    res.json({ message: "No companies has been found!" });
  } else {
    res.json(companies);
  }
}

async function getCompanyById(req: Request, res: Response) {
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

  if (id === null) {
    res.json({ message: `No company with this name: ${id} has been found!` });
  } else {
    res.json(companyId);
  }
}

async function updateCompany(req: Request, res: Response) {
  const { id } = req.params;

  const { name, URL, scrapMode }: Company = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).send(errors.array());
  } else {
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

async function updateCompanyWithRelations(req: Request, res: Response) {
  const { id, companyID } = req.params;

  try {
    const {
      name,
      URL,
      scrapMode,
      instructions,
      steps,
    }: CompanyWithRelationsType = JSON.parse(req.body.companyDetails);

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

      // for (const instruction of instructions) {
      //   await tx.instructions.upsert({
      //     where: {
      //       id: Number(instruction.id) || -1,
      //       companyID: Number(instruction.companyID) || -1,
      //     },
      //     update: {
      //       extractionInstructions: instruction.extractionInstructions!,
      //     },
      //     create: {
      //       // companyID: Number(companyID),
      //       extractionInstructions: instruction.extractionInstructions!,
      //     },
      //   });
      // }

      const deletedStepIds = steps
        .map((step: Steps) => step.id)
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
  } catch (error) {
    console.log(error);
  }
}

async function deleteCompany(req: Request, res: Response) {
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

export {
  createCompany,
  createCompanyWithRelations,
  deleteCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  updateCompanyWithRelations,
};
