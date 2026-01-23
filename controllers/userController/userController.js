import { prisma } from "../../db/client.js";
import { validationResult } from "express-validator";
async function signUpUser(req, res) {
    const { email, password, confirmPassword } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).send(errors.array());
    }
    else {
        const signUpUser = await prisma.user.create({
            data: {
                email,
                password,
                confirmPassword,
            },
        });
        res.json(signUpUser);
    }
}
export { signUpUser };
//# sourceMappingURL=userController.js.map