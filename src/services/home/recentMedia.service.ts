import { httpClient } from "@/lib/httpClient";
import { catchAsync } from "@/utils/catchAsync";

export const recentMediaService = async () =>
  catchAsync(async () => {
    const response = await httpClient.get("/history/recent-media");
    return response;
  });
