"use server";

import { httpClient } from "@/lib/httpClient";
import { generalService } from "@/services/general.service";
import { IHistoryDelete } from "@/types/history.types";
import { catchAsync } from "@/utils/catchAsync";

import { parseSearchParams } from "@/utils/queryString";

// 1. Get user generation history with query parameters (search, filter, pagination)
export const getMyHistoryService = async (query?: Record<string, any>) =>
  catchAsync(async () => {
    const options = await generalService.getHeaders();
    const { queryString } = await parseSearchParams(query || {});
    const url = queryString ? `/history?${queryString}` : "/history";

    const res = await httpClient.get<any>(url, options);
    return res;
  });

// 2. Soft delete a generation history item
export const deleteHistoryItemService = async (id: string) =>
  catchAsync(async () => {
    const options = await generalService.getHeaders();
    const res = await httpClient.delete<IHistoryDelete>(
      `/history/${id}`,
      options,
    );
    return res;
  });
