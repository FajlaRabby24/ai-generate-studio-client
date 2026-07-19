"use server";

import { httpClient } from "@/lib/httpClient";
import { ILoginPayload, ILoginResponse } from "@/types/auth.types";
import { catchAsync } from "@/utils/catchAsync";
import { AuthValidation } from "@/zod-schema/auth/auth.schema";

export const loginService = async (payload: ILoginPayload) =>
  catchAsync(async () => {
    const parsedPayload =
      AuthValidation.loginValidationSchema.safeParse(payload);

    if (!parsedPayload.success) {
      return {
        success: false,
        message: "Invalid input",
      };
    }

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

    return res;
  });
