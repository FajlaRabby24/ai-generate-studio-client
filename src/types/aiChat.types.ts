import { AiChatBotValidation } from "@/zod-schema/dashboard/ai-chatbot/zod";
import z from "zod";

export type IAiChatBotPayload = z.infer<
  typeof AiChatBotValidation.streamChatValidationSchema
>;

export interface IAiChatTitleResponse {
  id: string;
  title: string | null;
  createdAt: Date;
  updatedAt: Date;
}
[];

export interface IGetConversationChatsById {
  id: string;
  title: string | null;
  chatHistory: any[];
  createdAt: Date;
  updatedAt: Date;
}
