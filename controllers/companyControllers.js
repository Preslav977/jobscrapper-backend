import { prisma } from "../db/client.js";
import { supabaseImageUpload } from "../helpers/supabaseImageUpload.js";
async function createCompany(req, res) {
    const { name, URL } = req.body;
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
export { createCompany };
//# sourceMappingURL=companyControllers.js.map