import { prisma } from "../db/client.js";
import { validationResult } from "express-validator";
import { supabaseImageUpload } from "../helpers/supabaseImageUpload.js";
async function createCompany(req, res) {
    const { name, URL } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).send(errors.array());
    }
    else {
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
//# sourceMappingURL=companyControllers.js.map