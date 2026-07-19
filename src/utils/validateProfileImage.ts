import { envVars } from "@/config/env";
import axios from "axios";

export const validateImage = async (file: File | null) => {
  try {
    const meta = {
      name: file?.name,
      size: file?.size,
      type: file?.type,
    };
    const { data } = await axios.post(
      `${envVars.API_BASE_URL}/validate-profile-image`,
      meta,
      {
        validateStatus: () => true,
      },
    );
    if (!data?.success) {
      return {
        success: data.success || false,
        message: data.message || "File is not valid",
      };
    }
    return {
      success: data?.success || true,
      message: data?.message || "File is valid",
    };
  } catch (error) {
    return {
      success: false,
      message: "File is not valid",
    };
  }
};
