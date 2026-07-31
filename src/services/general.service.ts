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
    return { success: false, message: "Unauthorized" };
  }
  return {
    headers: {
      Cookie: `accessToken=${accessToken}; ${betterAuthSessionCookieName}=${sessionToken}`,
    },
  };
};

export const generalService = {
  validateRequest,
  getHeaders,
};
