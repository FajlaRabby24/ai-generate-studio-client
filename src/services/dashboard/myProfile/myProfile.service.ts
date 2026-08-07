"use server";

import { httpClient } from "@/lib/httpClient";
import { generalService } from "@/services/general.service";
import { IMyProfileResponse } from "@/types/myProfile.types";
import { catchAsync } from "@/utils/catchAsync";

export const getMyProfileService = async () =>
  catchAsync(async () => {
    const headers = await generalService.getHeaders();
    const res = await httpClient.get<IMyProfileResponse>("/auth/me", headers);

    return res;
  });
