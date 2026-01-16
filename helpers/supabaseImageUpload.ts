import { createClient } from "@supabase/supabase-js";

import type { MulterFile } from "../interfaces/MulterFile";

const supabase = createClient(
  `${process.env.supabaseURL}`,
  `${process.env.supabaseAPI}`,
);

async function supabaseImageUpload(file: MulterFile) {
  const { data, error } = await supabase.storage
    .from("jobscrapper-images")
    .upload(`public/${file.originalname}`, file.buffer, {
      cacheControl: "3600",
      upsert: true,
      contentType: file.mimetype,
    });

  if (error) {
    //
  } else {
    //
  }
}

module.exports = supabaseImageUpload;
