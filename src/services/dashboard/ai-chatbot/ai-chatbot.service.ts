"use server";

import { httpClient } from "@/lib/httpClient";
import { getTokens } from "@/services/auth/getMe.service";
import { IAIChatBotResponse } from "@/types/dashboard.types";
import { betterAuthSessionCookieName } from "@/utils/authUtils";
import { catchAsync } from "@/utils/catchAsync";
import { AiChatBotValidation } from "@/zod-schema/dashboard/ai-chatbot/zod";
import z from "zod";

export type IAiChatBotPayload = z.infer<
  typeof AiChatBotValidation.chatValidationSchema
>;

export const aiChatBotService = async (payload: IAiChatBotPayload) =>
  catchAsync(async () => {
    // Client-side Zod validation before requesting server
    const validationResult =
      AiChatBotValidation.chatValidationSchema.safeParse(payload);
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

    const res = await httpClient.post<IAIChatBotResponse>(
      "/ai-chat-bot",
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
        message: res?.message || "Failed to generate chat response",
      };
    }

    return res;
  });
