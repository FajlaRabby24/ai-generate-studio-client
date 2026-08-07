"use server";

import { httpClient } from "@/lib/httpClient";
import { generalService } from "@/services/general.service";
import { IImageToVideoResponse } from "@/types/imageToVideo.types";
import { catchAsync } from "@/utils/catchAsync";

export const imageToVideoService = async (formData: FormData) =>
  catchAsync(async () => {
    const authHeaders = await generalService.getHeaders();
    const res = await httpClient.post<IImageToVideoResponse>(
      "/image-to-video",
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
