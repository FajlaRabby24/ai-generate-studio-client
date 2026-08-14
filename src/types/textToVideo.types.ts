import { GenerationStatus, GenerationType } from "@/config/constant";
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

export interface ITextToVideoRecord {
  id: string;
  generatedId: string;
  status: GenerationStatus;
  prompt: string;
  requestId: string;
  outputUrl: string;
  isPublic: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IGetRecentTextToVideoResponse {
  id: string;
  userId: string;
  type: GenerationType.TEXT_TO_VIDEO;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  textToVideos: ITextToVideoRecord[];
}
