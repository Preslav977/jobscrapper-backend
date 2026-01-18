import { createClient } from "@supabase/supabase-js";
import "dotenv/config";
const supabase = createClient(`${process.env.supabaseURL}`, `${process.env.supabaseAPI}`);
console.log(process.env.supabaseURL, process.env.supabaseAPI);
async function supabaseImageUpload(file) {
    const { error } = await supabase.storage
        .from("jobscrapper-images")
        .upload(`public/${file.originalname}`, file.buffer, {
        cacheControl: "3600",
        upsert: true,
        contentType: file.mimetype,
    });
    if (error) {
        return `Failed  to upload the image: ${error.message}`;
    }
    const { data } = await supabase.storage
        .from("jobscrapper-images")
        .getPublicUrl(`public/${file.originalname}`);
    console.log("Uploaded image Supabase", data);
    return data.publicUrl;
}
export { supabaseImageUpload };
//# sourceMappingURL=supabaseImageUpload.js.map