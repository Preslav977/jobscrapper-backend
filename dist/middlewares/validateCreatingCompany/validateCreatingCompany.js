import { body } from "express-validator";
import { prisma } from "../../db/client.js";
const companyLengthError = "name must be at least 1 character!";
const companyExistsError = "name already exists!";
const validateCreatingCompany = [
    body("companyDetails")
        .isString()
        .customSanitizer((value) => {
        try {
            return JSON.parse(value);
        }
        catch {
            return null;
        }
    }),
    body("companyDetails.name")
        .trim()
        .notEmpty()
        .isLength({ min: 1 })
        .escape()
        .withMessage(`Company ${companyLengthError}`),
    body("companyDetails.name").custom(async (value) => {
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
//# sourceMappingURL=validateCreatingCompany.js.map