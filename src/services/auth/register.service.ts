"use server";

import { httpClient } from "@/lib/httpClient";
import { IRegisterPayload, IRegisterResponse } from "@/types/auth.types";
import { AuthValidation } from "@/zod-schema/auth/auth.schema";

export const registerService = async (payload: IRegisterPayload) => {
  const parsedPayload =
    AuthValidation.registerValidationSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return {
      success: false,
      message: "Invalid input",
    };
  }

  try {
    const res = await httpClient.post<IRegisterResponse>(
      "/auth/register",
      parsedPayload.data,
    );

    if (!res.success) {
      return {
        success: false,
        message: res.message || "Registration failed. Please try again.",
      };
    }

    return {
      success: true,
      data: res.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Registration failed. Please try again.",
    };
  }
};
