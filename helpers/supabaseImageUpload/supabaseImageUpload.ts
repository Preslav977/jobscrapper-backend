import { createClient } from "@supabase/supabase-js";
import type { MulterFileInterface } from "../../interfaces/MulterFileInterface/MulterFileInterface.js";

const supabase = createClient(
  `${process.env.SUPABASEURL}`,
  `${process.env.SUPABASEAPI}`,
);

async function supabaseImageUpload(file: MulterFileInterface) {
  const { error } = await supabase.storage
    .from("jobscrapper-images")
    .upload(`public/${file.originalname}`, file.buffer, {
      cacheControl: "3600",
      upsert: true,
      contentType: file.mimetype,
    });

  if (error) {
    throw error;
  }

  const { data } = await supabase.storage
    .from("jobscrapper-images")
    .getPublicUrl(`public/${file.originalname}`);

  return data.publicUrl;
}

export { supabaseImageUpload };
