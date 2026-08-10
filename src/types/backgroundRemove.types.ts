import { GenerationStatus, GenerationType } from "@/config/constant";
import { BackgroundRemoverValidation } from "@/zod-schema/dashboard/bg-remove/bgRemover.zod";
import { z } from "zod";

export type IBackgroundRemovePayload = z.infer<
  typeof BackgroundRemoverValidation.backgroundRemover
>;

export interface IBackgroundRemoveResponse {
  secureUrl: string;
}

export interface IGetRecentImageToVideoResponse {
  type: GenerationType.IMAGE_BACKGROUND_REMOVER;
  id: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  backgroundRemoves: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    status: GenerationStatus;
    imageUrl: string;
    isPublic: boolean;
    isFeatured: boolean;
    generatedId: string;
    outputUrls: string;
  }[];
}
