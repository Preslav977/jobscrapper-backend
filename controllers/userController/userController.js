import { prisma } from "../../db/client.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
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
    console.log(id);
    console.log(typeof id);
    jwt.sign({ id }, process.env.SECRET, { expiresIn: "15m" }, (err, token) => {
        res.json({ token });
    });
}
async function userGetDetails(req, res) {
    const { id } = req.params ? req.params : req.user;
    console.log(id);
    console.log(req.authData);
}
export { signUpUser, userGetDetails, userLogin };
//# sourceMappingURL=userController.js.map