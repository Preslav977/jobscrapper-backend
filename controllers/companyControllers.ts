import { prisma } from "../db/client";

import type { Request, Response } from "express";

import type { CompanyInterface } from "../interfaces/CompanyInterface";

async function createCompany(req: Request, res: Response) {
  const { name, URL }: CompanyInterface = req.body;

  const createCompany = await prisma.company.create({
    data: {
      name,
      URL,
    },
  });

  res.json(createCompany);
}

export { createCompany };
