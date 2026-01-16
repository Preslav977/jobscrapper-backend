import { createClient } from "@supabase/supabase-js";

import type { Multer } from "multer";

const supabase = createClient(
  `${process.env.supabaseURL}`,
  `${process.env.supabaseAPI}`,
);

async function supabaseImageUpload(file: Multer) {
  const { data, error } = await supabase.storage.from("");

  if (error) {
    //
  } else {
    //
  }
}
