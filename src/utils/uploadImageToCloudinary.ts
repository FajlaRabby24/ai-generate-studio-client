import { envVars } from "@/config/env";
import axios from "axios";

export const uploadToCloudinary = async (
  file: File,
  fileType: string = "image",
  folder: string = "AI Generate Studio",
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", envVars.CLOUDINARY_UPLOAD_PRESET!);
  formData.append("folder", folder);
  const url = `https://api.cloudinary.com/v1_1/${envVars.PUBLIC_CLOUDINARY_CLOUD_NAME}/${fileType}/upload`;
  const res = await axios.post(url, formData);

  const data = res.data;

  if (res.status !== 200 || !data.secure_url) {
    return {
      success: false,
      message: "Image upload failed",
      data: null,
    };
  }

  return {
    success: true,
    data: {
      url: data.secure_url,
    },
    message: "Image uploaded successfully",
  };
};
