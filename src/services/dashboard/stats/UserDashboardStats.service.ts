"use server";

import { httpClient } from "@/lib/httpClient";
import { getTokens } from "@/services/auth/getMe.service";
import { IUserDashboardStatsResponse } from "@/types/dashboard.types";
import { betterAuthSessionCookieName } from "@/utils/authUtils";
import { catchAsync } from "@/utils/catchAsync";

export const getDashboardStatsService = async () =>
  catchAsync(async () => {
    const { accessToken, sessionToken } = await getTokens();

    if (!accessToken) {
      return { success: false, message: "Unauthorized" };
    }

    const res = await httpClient.get<IUserDashboardStatsResponse>(
      "/dashboard/stats",
      {
        headers: {
          Cookie: `accessToken=${accessToken}; ${betterAuthSessionCookieName}=${sessionToken}`,
        },
      },
    );

    if (!res.success) {
      return {
        success: false,
        message: res?.message || "Failed to get user dashboard stats",
      };
    }
    return res;
  });
