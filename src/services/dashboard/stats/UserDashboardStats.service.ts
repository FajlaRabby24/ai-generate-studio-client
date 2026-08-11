"use server";

import { httpClient } from "@/lib/httpClient";
import { getTokens } from "@/services/auth/getMe.service";
import { generalService } from "@/services/general.service";
import { IUserDashboardStatsResponse } from "@/types/dashboard.types";
import { betterAuthSessionCookieName } from "@/utils/authUtils";
import { catchAsync } from "@/utils/catchAsync";

export const getDashboardStatsService = async () =>
  catchAsync(async () => {
    const headers = await generalService.getHeaders();
    const res = await httpClient.get<IUserDashboardStatsResponse>(
      "/dashboard/stats",
      headers,
    );
    return res;
  });

  