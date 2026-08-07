import { GenerationType } from "@/config/constant";
import { z } from "zod";

const testTextToSpeechSchema = z.object({
  prompt: z.string({
    error: "Prompt is required",
  }),
  voiceId: z.string({
    error: "Voice option is required",
  }),
  type: z.nativeEnum(GenerationType, {
    message: "Invalid generation type",
  }),
});

const getVoicesSchema = z.object({
  lang: z.string({
    error: "Language is required",
  }),
  gender: z.string({
    error: "Gender is required",
  }),
});

export const TextToSpeechValidation = {
  getVoicesSchema,
  testTextToSpeechSchema,
};
