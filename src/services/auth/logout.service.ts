"use server";

import { httpClient } from "@/lib/httpClient";
import { generalService } from "@/services/general.service";
import { betterAuthSessionCookieName } from "@/utils/authUtils";
import { catchAsync } from "@/utils/catchAsync";
import { deleteCookie } from "@/utils/cookieUtils";

// Clear session cookies and invalidate token session in the backend database
export const logoutService = async () =>
  catchAsync(async () => {
    // 1. Try requesting backend session invalidation if user has active tokens
    const options = await generalService.getHeaders();
    const res = await httpClient.post("/auth/logout", {}, options);
    if (!res.success) {
      return {
        success: false,
        message: "Failed to logout",
      };
    }

    // 2. Erase authorization cookies
    await deleteCookie("accessToken");
    await deleteCookie("refreshToken");
    await deleteCookie(betterAuthSessionCookieName);

    return {
      success: true,
      message: "Logged out successfully",
    };
  });
