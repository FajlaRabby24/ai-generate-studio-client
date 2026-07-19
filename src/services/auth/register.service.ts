"use server";

import { httpClient } from "@/lib/httpClient";
import { IRegisterPayload, IRegisterResponse } from "@/types/auth.types";
import { catchAsync } from "@/utils/catchAsync";
import { AuthValidation } from "@/zod-schema/auth/auth.schema";

export const registerService = async (payload: IRegisterPayload) =>
  catchAsync(async () => {
    const parsedPayload =
      AuthValidation.registerValidationSchema.safeParse(payload);

    if (!parsedPayload.success) {
      return {
        success: false,
        message: "Invalid input",
      };
    }

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

    return res;
  });
