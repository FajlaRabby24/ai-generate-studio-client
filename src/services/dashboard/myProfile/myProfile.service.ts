"use server";

import { httpClient } from "@/lib/httpClient";
import { getTokens } from "@/services/auth/getMe.service";
import { IMyProfileResponse } from "@/types/myProfile.types";
import { betterAuthSessionCookieName } from "@/utils/authUtils";
import { catchAsync } from "@/utils/catchAsync";

export const getMyProfileService = async () =>
  catchAsync(async () => {
    const { accessToken, sessionToken } = await getTokens();

    if (!accessToken && !sessionToken) {
      return { success: false, message: "Unauthorized" };
    }

    const res = await httpClient.get<IMyProfileResponse>("/auth/me", {
      headers: {
        Cookie: `accessToken=${accessToken}; ${betterAuthSessionCookieName}=${sessionToken}`,
      },
    });

    if (!res.success) {
      return {
        success: false,
        message: res?.message || "Failed to get user profile details",
      };
    }
    return res;
  });
