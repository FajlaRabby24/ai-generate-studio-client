"use server";

import { GenerationType } from "@/config/constant";
import { httpClient } from "@/lib/httpClient";
import { getTokens } from "@/services/auth/getMe.service";
import {
  IGetGenerationLeftCountResponse,
  TextToImageResponse,
} from "@/types/dashboard.types";
import { betterAuthSessionCookieName } from "@/utils/authUtils";
import { catchAsync } from "@/utils/catchAsync";
import { TextToImageValidation } from "@/zod-schema/dashboard/text-to-image/zod";
import z from "zod";

export type IGenerateTextToImagePayload = z.infer<
  typeof TextToImageValidation.generateTextToImageSchema
>;

export const generateTextToImageService = async (
  payload: IGenerateTextToImagePayload,
) =>
  catchAsync(async () => {
    // Client-side Zod validation before requesting server
    const validationResult =
      TextToImageValidation.generateTextToImageSchema.safeParse(payload);
    if (!validationResult.success) {
      const firstErrorMessage =
        validationResult.error.issues[0]?.message || "Invalid input payload";
      return {
        success: false,
        message: firstErrorMessage,
      };
    }

    const { accessToken, sessionToken } = await getTokens();

    if (!accessToken) {
      return { success: false, message: "Unauthorized" };
    }

    const res = await httpClient.post<TextToImageResponse>(
      "/text-to-image",
      payload,
      {
        headers: {
          Cookie: `accessToken=${accessToken}; ${betterAuthSessionCookieName}=${sessionToken}`,
        },
      },
    );
    if (!res.success) {
      return {
        success: false,
        message: res?.message || "Failed to generate image",
      };
    }

    return res;
  });

export const getGenerationLeftCountService = async (
  generationType: GenerationType,
) =>
  catchAsync(async () => {
    const { accessToken, sessionToken } = await getTokens();

    if (!accessToken) {
      return { success: false, message: "Unauthorized" };
    }

    const res = await httpClient.get<IGetGenerationLeftCountResponse>(
      `/auth/generation-left?type=${generationType}`,
      {
        headers: {
          Cookie: `accessToken=${accessToken}; ${betterAuthSessionCookieName}=${sessionToken}`,
        },
      },
    );
    if (!res.success) {
      return {
        success: false,
        message: res?.message || "Failed to get generation left count",
      };
    }

    return res;
  });
