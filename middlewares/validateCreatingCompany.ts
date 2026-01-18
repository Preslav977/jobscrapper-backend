import { body } from "express-validator";
import { prisma } from "../db/client.js";

const companyLengthError = "name must be at least 1 character!";

const companyExistsError = "name already exists!";

const validateCreatingCompany = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage(`Company ${companyLengthError}`),

  body("name").custom(async (value: string) => {
    const doesCompanyNameExists = await prisma.company.findUnique({
      where: {
        name: value,
      },
    });

    if (doesCompanyNameExists) {
      throw new Error(`Company ${companyExistsError}`);
    }
  }),
];

export { validateCreatingCompany };
