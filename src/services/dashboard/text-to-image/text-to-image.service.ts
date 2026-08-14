"use server";

import { httpClient } from "@/lib/httpClient";
import { generalService } from "@/services/general.service";
import {
  IGetRecentTextToImageResponse,
  TextToImageResponse,
} from "@/types/dashboard.types";
import { catchAsync } from "@/utils/catchAsync";
import { TextToImageValidation } from "@/zod-schema/dashboard/text-to-image/zod";
import z from "zod";

export type IGenerateTextToImagePayload = z.infer<
  typeof TextToImageValidation.generateTextToImageSchema
>;

export const generateTextToImageService = async (
  payload: IGenerateTextToImagePayload,
) =>
  catchAsync(async () => {
    // Client-side Zod validation before requesting server
    const validatedPayload =
      generalService.validateRequest<IGenerateTextToImagePayload>(
        payload,
        TextToImageValidation.generateTextToImageSchema,
      );
    const options = await generalService.getHeaders();

    const res = await httpClient.post<TextToImageResponse>(
      "/text-to-image",
      validatedPayload,
      options,
    );

    return res;
  });

// export const getGenerationLeftCountService = async (
//   generationType: GenerationType,
// ) =>
//   catchAsync(async () => {
//     const options = await generalService.getHeaders();

//     const res = await httpClient.get<IGetGenerationLeftCountResponse>(
//       `/auth/generation-left?type=${generationType}`,
//       options,
//     );

//     return res;
//   });

export const getRecentGenerationServiceTextToImage = async () => {
  const authHeaders = await generalService.getHeaders();
  const res = await httpClient.get<IGetRecentTextToImageResponse[]>(
    "/text-to-image/recent",
    authHeaders,
  );
  return res;
};
