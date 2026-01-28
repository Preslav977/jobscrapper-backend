import { prisma } from "../../db/client.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
// import type { BearerTokenInterface } from "../../interfaces/BearerTokenInterface/BearerTokenInterface.js";
async function signUpUser(req, res) {
    const { email, password, confirmPassword } = req.body;
    const errors = validationResult(req);
    bcrypt.hash(password, 10, async (error, hashedPassword) => {
        if (error) {
            console.error("Failed to hash the password", error);
            throw error;
        }
        if (!errors.isEmpty()) {
            res.status(400).send(errors.array());
        }
        else {
            const signUpUser = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    confirmPassword: hashedPassword,
                },
            });
            res.json(signUpUser);
        }
    });
}
async function userLogin(req, res) {
    const { id } = req.user;
    jwt.sign({ id }, process.env.SECRET, { expiresIn: "15m" }, (err, token) => {
        if (err) {
            res.json({ message: "Failed to retrieve Bearer Token: ", err });
        }
        else {
            res.json({ token });
        }
    });
}
async function userGetDetails(req, res) {
    if (req.params.id) {
        const userDetails = await prisma.user.findFirst({
            where: {
                id: Number(req.params.id),
            },
        });
        res.json(userDetails);
    }
    else {
        const userDetails = await prisma.user.findFirst({
            where: {
                id: Number(req.authData.id),
            },
        });
        res.json(userDetails);
    }
}
export { signUpUser, userGetDetails, userLogin };
//# sourceMappingURL=userController.js.map