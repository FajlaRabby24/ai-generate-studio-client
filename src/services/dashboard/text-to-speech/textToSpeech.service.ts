"use server";

import { httpClient } from "@/lib/httpClient";
import { generalService } from "@/services/general.service";
import { IGetRecentTextToSpeechResponse } from "@/types/dashboard.types";
import {
  IGetVoicesPayload,
  IGetVoicesResponse,
  ITextToSpeechPayload,
  ITextToSpeechResponse,
} from "@/types/textToSpeech.types";
import { catchAsync } from "@/utils/catchAsync";
import { TextToSpeechValidation } from "@/zod-schema/dashboard/text-to-speech/zod";

export const textToSpeechService = async (payload: ITextToSpeechPayload) =>
  catchAsync(async () => {
    const validatedPayload =
      generalService.validateRequest<ITextToSpeechPayload>(
        payload,
        TextToSpeechValidation.testTextToSpeechSchema,
      );

    const authHeaders = await generalService.getHeaders();
    const res = await httpClient.post<ITextToSpeechResponse>(
      "/text-to-speech",
      validatedPayload,
      authHeaders,
    );

    return res;
  });

export const getVoicesService = async (payload: IGetVoicesPayload) =>
  catchAsync(async () => {
    const validatedPayload = generalService.validateRequest<IGetVoicesPayload>(
      payload,
      TextToSpeechValidation.getVoicesSchema,
    );

    const options = await generalService.getHeaders();

    const res = await httpClient.post<IGetVoicesResponse>(
      `/text-to-speech/voices`,
      validatedPayload,
      options,
    );

    return res;
  });

export const getRecentGenerationServiceTextToSpeech = async () => {
  const authHeaders = await generalService.getHeaders();
  const res = await httpClient.get<IGetRecentTextToSpeechResponse[]>(
    "/text-to-speech/recent",
    authHeaders,
  );
  return res;
};
