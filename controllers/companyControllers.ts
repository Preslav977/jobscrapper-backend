import { prisma } from "../db/client.js";

import type { Request, Response } from "express";

import { validationResult } from "express-validator";

import type { CompanyInterface } from "../interfaces/CompanyInterface.js";

import { supabaseImageUpload } from "../helpers/supabaseImageUpload.js";

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
          URL,
          logo,
        },
      });

      res.json(createCompany);
    }
  }
}

export { createCompany };
