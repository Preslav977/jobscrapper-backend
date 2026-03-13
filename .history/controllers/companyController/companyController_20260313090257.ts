import { prisma } from "../../db/client.js";

import type { Request, Response } from "express";

import { validationResult } from "express-validator";

import type { CompanyInterface } from "../../interfaces/CompanyInterface/CompanyInterface.js";

import { supabaseImageUpload } from "../../helpers/supabaseImageUpload/supabaseImageUpload.js";

async function createCompany(req: Request, res: Response) {
  const { name, URL }: CompanyInterface = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).send(errors.array());
  } else {
    if (req.file) {
      const logo = await supabaseImageUpload(req.file);

      const createCompany = await prisma.company.create({
        data: {
          name,
          logo,
          URL,
          browserNavigation: null,
        },
      });

      res.json(createCompany);
    } else {
      const createCompany = await prisma.company.create({
        data: {
          name,
          URL,
          browserNavigation: null,
        },
      });

      res.json(createCompany);
    }
  }
}

async function getCompanies(req: Request, res: Response) {
  const companiesGet = await prisma.company.findMany({
    include: {
      jobs: true,
      instructions: true,
      steps: true,
    },
  });

  if (companiesGet.length === 0) {
    res.json({ message: "No companies has been found!" });
  } else {
    res.json(companiesGet);
  }
}

async function getCompanyByName(req: Request, res: Response) {
  const { name }: CompanyInterface = req.body;

  const trimCompanyNameSpace = name.trim();

  const companyGetByName = await prisma.company.findFirst({
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

  if (companyGetByName === null) {
    res.json({ message: "No company with this name has been found!" });
  } else {
    res.json(companyGetByName);
  }
}

async function updateCompany(req: Request, res: Response) {
  const { id } = req.params;

  const { name, URL }: CompanyInterface = req.body;

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
  } else {
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
  deleteCompany,
  getCompanies,
  getCompanyByName,
  updateCompany,
};
