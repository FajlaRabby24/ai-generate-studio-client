"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Check,
  CheckCheck,
  Clock,
  Info,
  Inbox,
  AlertTriangle,
  CreditCard,
  Settings,
} from "lucide-react";
import {
  getMyNotificationsService,
  markNotificationAsReadService,
  markAllNotificationsAsReadService,
} from "@/services/notification/notification.service";
import { Button } from "@/components/ui/button";

export default function NotificationComponent() {
  const queryClient = useQueryClient();

  // Fetch all notifications (both read and unread)
  const { data: notifRes, isLoading } = useQuery({
    queryKey: ["notifications", "all"],
    queryFn: () => getMyNotificationsService(true), // pass true to fetch all
  });
  const notifications = notifRes?.data || [];

  // Mutation to mark individual as read
  const markAsReadMutation = useMutation({
    mutationFn: (id: string) => markNotificationAsReadService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["unreadCount"] });
    },
  });

  // Mutation to mark all as read
  const markAllAsReadMutation = useMutation({
    mutationFn: () => markAllNotificationsAsReadService(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["unreadCount"] });
    },
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "BILLING":
        return <CreditCard className="w-4 h-4 text-emerald-500" />;
      case "SYSTEM":
        return <Settings className="w-4 h-4 text-violet-500" />;
      case "ALERT":
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      default:
        return <Info className="w-4 h-4 text-sky-500" />;
    }
  };

  const hasUnread = notifications.some((n: any) => !n.isRead);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-5 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <Bell className="w-6 h-6 text-violet-600 dark:text-violet-400" /> Notifications
          </h1>
          <p className="text-xs text-neutral-500 mt-1.5">
            Manage your account notifications, platform announcements, and billing updates.
          </p>
        </div>
        {hasUnread && (
          <Button
            onClick={() => markAllAsReadMutation.mutate()}
            disabled={markAllAsReadMutation.isPending}
            variant="outline"
            className="rounded-xl border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 font-semibold text-xs py-2 h-9 px-4 cursor-pointer transition-all duration-200 text-violet-600 hover:text-violet-750 flex items-center gap-1.5"
          >
            <CheckCheck className="w-4 h-4" /> Mark all as read
          </Button>
        )}
      </div>

      {/* Notifications list */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-20 bg-neutral-100 dark:bg-neutral-900 animate-pulse rounded-2xl"
            />
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-neutral-400 gap-3 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-3xl bg-neutral-50/30 dark:bg-neutral-900/10">
          <div className="w-14 h-14 bg-neutral-100 dark:bg-neutral-900/50 rounded-full flex items-center justify-center border border-neutral-200 dark:border-neutral-800">
            <Inbox className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div className="text-center">
            <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
              Your Inbox is Empty
            </h3>
            <p className="text-xs text-neutral-500 mt-1 max-w-xs">
              We'll notify you when subscription updates or system news are dispatched.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {notifications.map((notif: any) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`p-4 bg-white dark:bg-neutral-900/30 border rounded-2xl flex gap-4 transition-shadow relative hover:shadow-xs ${
                  !notif.isRead
                    ? "border-violet-500/35 bg-violet-500/[0.01] dark:bg-violet-400/[0.01]"
                    : "border-neutral-200 dark:border-neutral-800"
                }`}
              >
                {/* Unread indicator dot */}
                {!notif.isRead && (
                  <span className="absolute top-4 left-4 w-2.5 h-2.5 bg-violet-600 dark:bg-violet-500 rounded-full animate-pulse" />
                )}

                {/* Left: Icon container */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    !notif.isRead ? "pl-2" : ""
                  } ${
                    notif.type === "BILLING"
                      ? "bg-emerald-500/10"
                      : notif.type === "SYSTEM"
                        ? "bg-violet-500/10"
                        : notif.type === "ALERT"
                          ? "bg-amber-500/10"
                          : "bg-sky-500/10"
                  }`}
                >
                  {getIcon(notif.type)}
                </div>

                {/* Right: Contents */}
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-4">
                    <h3
                      className={`text-sm leading-tight text-neutral-850 dark:text-neutral-100 ${
                        !notif.isRead ? "font-bold" : "font-medium"
                      }`}
                    >
                      {notif.title}
                    </h3>
                    {!notif.isRead && (
                      <button
                        onClick={() => markAsReadMutation.mutate(notif.id)}
                        disabled={markAsReadMutation.isPending}
                        className="p-1 rounded-lg text-neutral-400 hover:text-violet-600 hover:bg-violet-500/10 transition cursor-pointer bg-transparent border-0 shrink-0"
                        title="Mark as read"
                      >
                        <Check className="w-4 h-4 stroke-[2.5]" />
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-2xl">
                    {notif.message}
                  </p>
                  <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 pt-1">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(notif.createdAt).toLocaleDateString(undefined, {
                      dateStyle: "medium",
                    })}{" "}
                    at{" "}
                    {new Date(notif.createdAt).toLocaleTimeString(undefined, {
                      timeStyle: "short",
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
