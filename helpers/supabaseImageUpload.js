import { createClient } from "@supabase/supabase-js";
const supabase = createClient(`${process.env.supabaseURL}`, `${process.env.supabaseAPI}`);
async function supabaseImageUpload(file) {
    const { data, error } = await supabase.storage
        .from("jobscrapper-images")
        .upload(`public/${file.originalname}`, file.buffer, {
        cacheControl: "3600",
        upsert: true,
        contentType: file.mimetype,
    });
    if (error) {
        //
    }
    else {
        //
    }
}
export { supabaseImageUpload };
//# sourceMappingURL=supabaseImageUpload.js.map