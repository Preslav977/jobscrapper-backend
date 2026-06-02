import { NextFunction, Request, Response } from "express";
import { supabaseImageUpload } from "../../helpers/supabaseImageUpload/supabaseImageUpload.js";

export const validateImageUpload = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.file) return next();

  const publicUrl = await supabaseImageUpload(req.file);

  if (!publicUrl) {
    return res.status(400).json([
      {
        type: "field",
        value: req.file.originalname,
        message: "Failed to upload profile picture.",
        path: "profilePicture",
        location: "body",
      },
    ]);
  }

  req.body.profilePictureUrl = publicUrl;
  next();
};
