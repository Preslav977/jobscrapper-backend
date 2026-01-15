import { prisma } from "../db/client";

import type { Request, Response } from "express";

import type { companyInterface } from "../interfaces/companyInterface";

exports.createCompany = [
  async (req: Request, res: Response) => {
    const { name, URL }: companyInterface = req.body;

    const createCompany = await prisma.company.create({
      data: {
        name,
        URL,
      },
    });

    res.json(createCompany);
  },
];
