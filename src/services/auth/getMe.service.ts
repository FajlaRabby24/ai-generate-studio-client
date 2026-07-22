"use server";

import { httpClient } from "@/lib/httpClient";
import { IGetMeResponse } from "@/types/auth.types";
import { betterAuthSessionCookieName } from "@/utils/authUtils";
import { catchAsync } from "@/utils/catchAsync";
import { cookies } from "next/headers";

export const getMeService = async () =>
  catchAsync(async () => {
    const res = await httpClient.get<IGetMeResponse>("/auth/me");
    return res;
  });

export const getTokens = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const sessionToken = cookieStore.get(betterAuthSessionCookieName)?.value;

  return {
    accessToken,
    sessionToken,
  };
};
