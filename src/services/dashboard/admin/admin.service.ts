"use server";

import { Plan } from "@/config/constant";
import { httpClient } from "@/lib/httpClient";
import {
  IAdminDashboardStats,
  IAdminPaymentsResult,
  IAdminUsersResult,
  IUsers,
} from "@/types/admin.types";
import { UserStatus } from "@/utils/authUtils";
import { catchAsync } from "@/utils/catchAsync";
import { generalService } from "../../general.service";

// 1. Get Admin Dashboard Stats
export const getAdminStatsService = async () =>
  catchAsync(async () => {
    const options = await generalService.getHeaders();
    const res = await httpClient.get<IAdminDashboardStats>(
      "/admin/dashboard-stats",
      options,
    );
    return res;
  });

// 2. Get All Users (Paginated & Filtered)
export const getAdminUsersService = async (params: {
  search?: string;
  page?: number;
  limit?: number;
  plan?: Plan;
  status?: UserStatus;
}) =>
  catchAsync(async () => {
    const options = await generalService.getHeaders();
    const query = new URLSearchParams();
    if (params.search) query.append("search", params.search);
    if (params.page) query.append("page", String(params.page));
    if (params.limit) query.append("limit", String(params.limit));
    if (params.plan) query.append("plan", params.plan);
    if (params.status) query.append("status", params.status);

    const res = await httpClient.get<IAdminUsersResult[]>(
      `/admin/users?${query.toString()}`,
      options,
    );
    return res;
  });

// 3. Update User Status (Ban / Unban)
export const updateUserStatusService = async (
  userId: string,
  status: UserStatus,
) =>
  catchAsync(async () => {
    const options = await generalService.getHeaders();
    const res = await httpClient.patch<IUsers>(
      `/admin/users/${userId}/status`,
      { status },
      options,
    );
    return res;
  });

// 4. Update User Subscription Plan Manually
export const updateUserPlanService = async (userId: string, plan: Plan) =>
  catchAsync(async () => {
    const options = await generalService.getHeaders();
    const res = await httpClient.patch<IUsers>(
      `/admin/users/${userId}/plan`,
      { plan },
      options,
    );
    return res;
  });

// 5. Get All Payment Transactions (Paginated)
export const getAdminPaymentsService = async (params: {
  page?: number;
  limit?: number;
}) =>
  catchAsync(async () => {
    const options = await generalService.getHeaders();
    const query = new URLSearchParams();
    if (params.page) query.append("page", String(params.page));
    if (params.limit) query.append("limit", String(params.limit));

    const res = await httpClient.get<IAdminPaymentsResult>(
      `/admin/payments?${query.toString()}`,
      options,
    );
    return res;
  });
