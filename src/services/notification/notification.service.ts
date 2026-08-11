"use server";

import { httpClient } from "@/lib/httpClient";
import {
  IMarkAllNotificationsAsRead,
  IMarkNotificationAsRead,
  INotification,
} from "@/types/notification.types";
import { catchAsync } from "@/utils/catchAsync";
import { generalService } from "../general.service";

// 1. Get user notifications
export const getMyNotificationsService = async (all?: boolean) =>
  catchAsync(async () => {
    const options = await generalService.getHeaders();
    const url = all ? "/notification?all=true" : "/notification";
    const res = await httpClient.get<INotification[]>(url, options);
    return res;
  });

// 2. Mark specific notification as read
export const markNotificationAsReadService = async (notificationId: string) =>
  catchAsync(async () => {
    if (!notificationId) {
      return { success: false, message: "Notification ID is required" };
    }
    const options = await generalService.getHeaders();
    const res = await httpClient.patch<IMarkNotificationAsRead>(
      `/notification/${notificationId}/read`,
      {},
      options,
    );
    return res;
  });

// 3. Mark all notifications as read
export const markAllNotificationsAsReadService = async () =>
  catchAsync(async () => {
    const options = await generalService.getHeaders();
    const res = await httpClient.patch<IMarkAllNotificationsAsRead>(
      "/notification/read-all",
      {},
      options,
    );
    return res;
  });
