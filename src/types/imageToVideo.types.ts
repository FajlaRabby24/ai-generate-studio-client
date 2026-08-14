import { GenerationStatus, GenerationType } from "@/config/constant";
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

export interface IImageToVideoRecord {
  id: string;
  generatedId: string;
  status: GenerationStatus;
  prompt: string;
  imageUrl: string;
  requestId: string;
  outputUrl: string;
  isPublic: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IGetRecentImageToVideoResponse {
  type: GenerationType.IMAGE_TO_VIDEO;
  id: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  imageToVideos: IImageToVideoRecord[];
}
