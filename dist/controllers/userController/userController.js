import { prisma } from "../../db/client.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import { supabaseImageUpload } from "../../helpers/supabaseImageUpload/supabaseImageUpload.js";
async function signUpUser(req, res) {
    const { email, password } = req.body;
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
async function userUpdateDetails(req, res) {
    const { id } = req.params;
    const { firstName, lastName, location, email, phoneNumber, linkedInURL, githubURL, portfolioURL, } = req.body;
    if (req.file) {
        const logo = await supabaseImageUpload(req.file);
        const updateUserDetails = await prisma.user.update({
            where: {
                id: Number(id),
            },
            data: {
                firstName,
                lastName,
                location,
                email,
                phoneNumber,
                linkedInURL,
                githubURL,
                portfolioURL,
                profilePicture: logo,
            },
        });
        res.json(updateUserDetails);
    }
    else {
        const updateUserDetails = await prisma.user.update({
            where: {
                id: Number(id),
            },
            data: {
                firstName,
                lastName,
                location,
                email,
                phoneNumber,
                linkedInURL,
                githubURL,
                portfolioURL,
            },
        });
        res.json(updateUserDetails);
    }
}
export { signUpUser, userGetDetails, userLogin, userUpdateDetails };
//# sourceMappingURL=userController.js.map