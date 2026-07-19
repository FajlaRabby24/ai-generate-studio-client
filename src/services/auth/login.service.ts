"use server";

import { httpClient } from "@/lib/httpClient";
import { ILoginPayload, ILoginResponse } from "@/types/auth.types";
import { AuthValidation } from "@/zod-schema/auth/auth.schema";

export const loginService = async (payload: ILoginPayload) => {
  const parsedPayload = AuthValidation.loginValidationSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return {
      success: false,
      message: "Invalid input",
    };
  }

  try {
    const res = await httpClient.post<ILoginResponse>(
      "/auth/login",
      parsedPayload.data,
    );

    if (!res.success) {
      return {
        success: false,
        message: res.message || "Login failed. Please try again.",
      };
    }

    return {
      success: true,
      data: res.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Login failed. Please try again.",
    };
  }
};
