"use server";

import { httpClient } from "@/lib/httpClient";
import { generalService } from "@/services/general.service";
import { IBackgroundRemoveResponse, IGetRecentImageToVideoResponse } from "@/types/backgroundRemove.types";
import { catchAsync } from "@/utils/catchAsync";

export const bgRemoverService = async (formData: FormData) =>
  catchAsync(async () => {
    const authHeaders = await generalService.getHeaders();
    const res = await httpClient.post<IBackgroundRemoveResponse>(
      "/background-remove",
      formData,
      {
        headers: {
          ...authHeaders.headers,
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return res;
  });

export const getRecentGenerationService = async () => {
  const authHeaders = await generalService.getHeaders();
  const res = await httpClient.get<IGetRecentImageToVideoResponse[]>(
    "/background-remove/recent",
    authHeaders,
  );

  return res;
};
