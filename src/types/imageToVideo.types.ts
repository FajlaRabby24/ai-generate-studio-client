import { ImageToVideoValidation } from "@/zod-schema/dashboard/image-to-video/zod";
import z from "zod";

export type IImageToVideoPayload = z.infer<
  typeof ImageToVideoValidation.generateVideoSchema
>;

export interface IImageToVideoResponse {
  request_id?: string | undefined;
  status?: string | undefined;
  polling_url?: string | undefined;
}
