import { body } from "express-validator";
import { prisma } from "../../db/client.js";

const emailLengthError = "must be at least 6 characters!";

const emailTakenError = "is already taken!";

const passwordLengthError =
  "must be minimum 8 characters, and contain at least one letter, and one number";

const passwordMatchError = "must match";

const validateUserSignUp = [
  body("email")
    .trim()
    .isLength({ min: 6, max: 30 })
    .escape()
    .withMessage(`Email ${emailLengthError}`),

  body("email").isEmail().withMessage("Must be valid email!"),

  body("email").custom(async (value: string) => {
    const isEmailTaken = await prisma.user.findFirst({
      where: {
        email: value,
      },
    });

    if (isEmailTaken) {
      throw new Error(`Email ${emailTakenError}`);
    }
  }),

  body("password")
    .trim()
    .isLength({ min: 8 })
    .escape()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .withMessage(`Password ${passwordLengthError}`),

  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage(`Password ${passwordMatchError}`),
];

export { validateUserSignUp };
