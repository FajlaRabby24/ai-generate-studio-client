"use server";

import { httpClient } from "@/lib/httpClient";
import { IGetMeResponse } from "@/types/auth.types";
import { catchAsync } from "@/utils/catchAsync";

export const getMeService = async () =>
  catchAsync(async () => {
    const res = await httpClient.get<IGetMeResponse>("/auth/me");
    return res;
  });
