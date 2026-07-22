import { GenerationType } from "@/config/constant";
import { z } from "zod";

const chatValidationSchema = z.object({
  message: z
    .string({
      error: "Message is required and must be a string",
    })
    .min(1, "Message cannot be empty"),
  chatHistory: z
    .array(z.any(), {
      error: "chatHistory must be an array of chat messages",
    })
    .optional(),
  type: z.nativeEnum(GenerationType, {
    error: "Invalid generation type",
  }),
});

export const AiChatBotValidation = {
  chatValidationSchema,
};
