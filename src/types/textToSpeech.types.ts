import { TextToSpeechValidation } from "@/zod-schema/dashboard/text-to-speech/zod";
import { z } from "zod";

export type ITextToSpeechPayload = z.infer<
  typeof TextToSpeechValidation.testTextToSpeechSchema
>;

export type IGetVoicesPayload = z.infer<
  typeof TextToSpeechValidation.getVoicesSchema
>;

export interface ITextToSpeechResponse {
  audioUrl: string;
}

export interface IVoiceItem {
  id: string;
  name: string;
  gender: string;
  language: string;
}

export type IGetVoicesResponse = IVoiceItem[];
