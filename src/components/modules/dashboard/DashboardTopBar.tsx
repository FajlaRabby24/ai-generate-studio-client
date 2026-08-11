"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Bell,
  Check,
  CheckCheck,
  CreditCard,
  Inbox,
  LogOut,
  Menu,
  Search,
  Sparkles,
  User,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import Sidebar from "@/components/modules/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLogout } from "@/hooks/useLogout";
import {
  getMyNotificationsService,
  markAllNotificationsAsReadService,
  markNotificationAsReadService,
} from "@/services/notification/notification.service";
import { getCookie } from "@/utils/cookieUtils";
import { jwtUtils } from "@/utils/jwtUtils";

export default function DashboardTopBar() {
  const handleLogout = useLogout();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [decodedUser, setDecodedUser] = useState<any>(null);

  // 1. Fetch unread count for badge
  const { data: unreadRes, refetch: refetchUnread } = useQuery({
    queryKey: ["unreadCount"],
    queryFn: () => getMyNotificationsService(),
    refetchInterval: 15000,
  });
  const unreadCount = unreadRes?.data?.length || 0;

  // 2. Fetch notifications for dropdown
  const { data: notifRes, refetch: refetchNotifs } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getMyNotificationsService(),
    enabled: false, // only fetched manually when opened
  });
  const notifications = notifRes?.data || [];

  const handleMarkAsRead = async (id: string) => {
    await markNotificationAsReadService(id);
    refetchUnread();
    refetchNotifs();
  };

  const handleMarkAllAsRead = async () => {
    await markAllNotificationsAsReadService();
    refetchUnread();
    refetchNotifs();
  };

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getCookie("accessToken");
      if (token) {
        const decoded = jwtUtils.decodedToken(token);
        if (decoded) {
          setDecodedUser(decoded);
        }
      }
    };
    fetchToken();
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border/30 bg-background/80 backdrop-blur-md px-4 md:px-6">
      {/* Left: Mobile Toggle & Mobile Logo */}
      <div className="flex items-center gap-3 md:hidden">
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl size-9 cursor-pointer hover:bg-muted"
                aria-label="Open Menu"
              />
            }
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[80%] max-w-[280px] p-0 border-r border-border/30 bg-background"
          >
            <Sidebar onCloseMobileMenu={() => setIsMobileOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Mobile Brand Link */}
        <Link href="/" className="flex items-center gap-1.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 shadow-md">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-sm text-foreground">
            AI Generate Studio
          </span>
        </Link>
      </div>

      {/* Center/Left (Desktop): Search Bar */}
      <div className="hidden md:flex flex-grow max-w-xs mr-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tools, history..."
            className="pl-9 h-9 rounded-xl border-border/40 bg-muted/20 focus-visible:border-violet-500/70"
          />
        </div>
      </div>

      {/* Right: Actions & Profile Dropdown */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Mobile Search Button (Placeholder for responsive design) */}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-xl size-9 cursor-pointer hover:bg-muted/80 md:hidden"
        >
          <Search className="h-4 w-4" />
        </Button>

        {/* Notifications Icon Button */}
        <DropdownMenu
          onOpenChange={(open) => {
            if (open) {
              refetchNotifs();
            }
          }}
        >
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl size-9 cursor-pointer hover:bg-muted/80 relative"
                aria-label="Notifications"
              />
            }
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 flex items-center justify-center text-[9px] font-black text-white bg-destructive rounded-full animate-pulse px-0.5">
                {unreadCount}
              </span>
            )}
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-80 mt-1 rounded-xl p-1.5 border border-border/40 bg-popover shadow-lg"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-2 pb-1 border-b border-border/20">
              <span className="text-xs font-bold text-foreground">
                All Notifications
              </span>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="text-[10px] font-bold text-violet-500 hover:text-violet-600 flex items-center gap-1 cursor-pointer bg-transparent border-0"
                >
                  <CheckCheck className="w-3.5 h-3.5" /> Mark all read
                </button>
              )}
            </div>

            {/* List */}
            <div className="max-h-64 overflow-y-auto py-1 divide-y divide-border/20">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-neutral-400 gap-1.5">
                  <Inbox className="w-6 h-6 stroke-[1.5]" />
                  <span className="text-[11px]">No new notifications</span>
                </div>
              ) : (
                notifications.map((notif: any) => (
                  <div
                    key={notif.id}
                    className={`p-2.5 hover:bg-muted/40 transition-colors duration-150 flex flex-col gap-1 text-left relative ${
                      !notif.isRead
                        ? "bg-violet-500/5 dark:bg-violet-400/5 border-l-2 border-violet-500"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-foreground truncate">
                        {notif.title}
                      </span>
                      {!notif.isRead && (
                        <button
                          onClick={() => handleMarkAsRead(notif.id)}
                          className="p-1 rounded-sm text-neutral-400 hover:text-violet-500 hover:bg-violet-500/10 cursor-pointer bg-transparent border-0"
                          title="Mark as read"
                        >
                          <Check className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                    <p className="text-[10px] text-muted-foreground leading-normal">
                      {notif.message}
                    </p>
                    <span className="text-[9px] text-neutral-400 self-end mt-0.5">
                      {new Date(notif.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Footer toggle button */}
            <DropdownMenuSeparator className="my-1" />
            <button className="w-full text-center py-2 text-[10px] font-bold text-violet-500 hover:text-violet-600 transition cursor-pointer bg-transparent border-0">
              <Link href="/dashboard/notification">See all notifications</Link>
            </button>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                className="rounded-full size-9 p-0 cursor-pointer overflow-hidden border border-border/40 bg-gradient-to-br from-violet-600 to-indigo-600 text-white font-semibold text-sm flex items-center justify-center shadow-inner active:scale-95 transition-all"
                aria-label="User profile menu"
              />
            }
          >
            {decodedUser?.name
              ? decodedUser.name.substring(0, 1).toUpperCase()
              : "U"}
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 mt-1 rounded-xl p-1.5 border border-border/40 bg-popover shadow-lg"
          >
            {/* User Profile Info Summary */}
            <div className="flex flex-col space-y-1.5 p-2.5">
              <p className="text-sm font-semibold text-foreground leading-none">
                {decodedUser?.name || "Demo User"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {decodedUser?.email || "demo@studio.com"}
              </p>
              {decodedUser?.role && (
                <div className="mt-1 inline-flex w-fit items-center rounded-full bg-violet-500/10 px-2.5 py-0.5 text-[10px] font-medium text-violet-500 dark:bg-violet-400/10 dark:text-violet-400">
                  {decodedUser.role}
                </div>
              )}
            </div>

            <DropdownMenuSeparator className="my-1.5" />

            {/* Quick Actions Links */}
            <Link href="/dashboard/profile" className="w-full">
              <DropdownMenuItem className="rounded-lg cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile Settings</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/dashboard/billing" className="w-full">
              <DropdownMenuItem className="rounded-lg cursor-pointer">
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
              </DropdownMenuItem>
            </Link>

            <DropdownMenuSeparator className="my-1.5" />

            {/* Sign Out Trigger */}
            <DropdownMenuItem
              variant="destructive"
              className="rounded-lg cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
