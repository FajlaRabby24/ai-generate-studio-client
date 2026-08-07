import { TextToVideoValidation } from "@/zod-schema/dashboard/text-to-video/zod";
import { z } from "zod";

export type ITextToVideoPayload = z.infer<
  typeof TextToVideoValidation.generateVideoSchema
>;

export interface ITextToVideoResponse {
  request_id: string;
  status: string;
  polling_url: string;
}
