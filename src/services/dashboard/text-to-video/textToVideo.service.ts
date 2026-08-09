"use server";

import { httpClient } from "@/lib/httpClient";
import { generalService } from "@/services/general.service";
import {
  IGetRecentTextToVideoResponse,
  ITextToVideoPayload,
  ITextToVideoResponse,
} from "@/types/textToVideo.types";
import { catchAsync } from "@/utils/catchAsync";
import { TextToVideoValidation } from "@/zod-schema/dashboard/text-to-video/zod";

export const textToVideoService = async (payload: ITextToVideoPayload) =>
  catchAsync(async () => {
    const validatedPayload =
      generalService.validateRequest<ITextToVideoPayload>(
        payload,
        TextToVideoValidation.generateVideoSchema,
      );

    const authHeaders = await generalService.getHeaders();
    const res = await httpClient.post<ITextToVideoResponse>(
      "/text-to-video",
      validatedPayload,
      authHeaders,
    );

    return res;
  });

export const getRecentGenerationService = async () => {
  const authHeaders = await generalService.getHeaders();
  const res = await httpClient.get<IGetRecentTextToVideoResponse[]>(
    "/text-to-video/recent",
    authHeaders,
  );
  return res;
};
