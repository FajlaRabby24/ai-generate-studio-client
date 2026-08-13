import { envVars } from "@/config/env";
import { betterAuthSessionCookieName } from "@/utils/authUtils";
import { ZodType } from "zod";
import { getTokens } from "./auth/getMe.service";

const validateRequest = <T>(payload: T, schema: ZodType<T>) => {
  const validateRequest = schema.safeParse(payload);
  if (!validateRequest.success) {
    const firstErrorMessage =
      validateRequest.error.issues[0]?.message || "Invalid input payload";
    throw new Error(firstErrorMessage);
  }

  return validateRequest.data;
};

// Helper to construct headers with auth cookies for admin actions
const getHeaders = async () => {
  const { accessToken, sessionToken } = await getTokens();
  if (!accessToken || !sessionToken) {
    throw new Error("Unauthorized");
  }
  return {
    headers: {
      Cookie: `accessToken=${accessToken}; ${betterAuthSessionCookieName}=${sessionToken}`,
    },
  };
};

const homePageCall = async () => {
  try {
    const res = await fetch(`${envVars.API_BASE_URL_FOR_HOME}`).then((r) =>
      r.text(),
    );
    return res;
  } catch (error) {
    console.error("Failed to fetch homePageCall:", error);
    return null;
  }
};

export const generalService = {
  validateRequest,
  getHeaders,
  homePageCall,
};
