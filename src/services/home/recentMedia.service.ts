import { GenerationType } from "@/config/constant";
import { httpClient } from "@/lib/httpClient";
import { catchAsync } from "@/utils/catchAsync";

export interface MediaItem {
  id: string;
  outputUrl: string;
  type: GenerationType
}

export const recentMediaService = async () =>
  catchAsync(async () => {
    const response = await httpClient.get<MediaItem[]>("/history/recent-media");
    return response;
  });
