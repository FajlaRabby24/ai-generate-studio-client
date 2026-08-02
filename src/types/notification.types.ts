import { NotificationType } from "@/config/constant";

export interface INotification {
  type: NotificationType;
  message: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  title: string;
  isRead: boolean;
}

export interface IMarkNotificationAsRead {
  id: string;
}

export interface IMarkAllNotificationsAsRead {
  count: number;
}
