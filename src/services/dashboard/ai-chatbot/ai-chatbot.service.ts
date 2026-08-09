"use server";

import { httpClient } from "@/lib/httpClient";
import { generalService } from "@/services/general.service";
import {
  IAiChatBotPayload,
  IAiChatTitleResponse,
  IGetConversationChatsById,
} from "@/types/aiChat.types";
import { IAIChatBotResponse } from "@/types/dashboard.types";
import { catchAsync } from "@/utils/catchAsync";
import { AiChatBotValidation } from "@/zod-schema/dashboard/ai-chatbot/zod";

export const aiChatBotService = async (payload: IAiChatBotPayload) =>
  catchAsync(async () => {
    const validatePayload = generalService.validateRequest<IAiChatBotPayload>(
      payload,
      AiChatBotValidation.streamChatValidationSchema,
    );

    const headers = await generalService.getHeaders();
    const res = await httpClient.post<IAIChatBotResponse>(
      "/ai-chat-bot/stream",
      validatePayload,
      headers,
    );

    return res;
  });

export const getPreviousConversation = async () =>
  catchAsync(async () => {
    const headers = await generalService.getHeaders();
    const res = await httpClient.get<IAiChatTitleResponse>(
      "/ai-chat-bot/conversations",
      headers,
    );

    return res;
  });

export const getConversationChatsById = async (conversationId: string) =>
  catchAsync(async () => {
    const headers = await generalService.getHeaders();
    const res = await httpClient.get<IGetConversationChatsById>(
      `/ai-chat-bot/conversations/${conversationId}`,
      headers,
    );
    return res;
  });
