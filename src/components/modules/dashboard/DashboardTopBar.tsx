"use client";

import { useQuery } from "@tanstack/react-query";
import { Bell, Check, CheckCheck, Inbox, Menu, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import Sidebar from "@/components/modules/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  getMyNotificationsService,
  markAllNotificationsAsReadService,
  markNotificationAsReadService,
} from "@/services/notification/notification.service";
import { UserRole } from "@/utils/authUtils";
import { getCookie } from "@/utils/cookieUtils";
import { jwtUtils } from "@/utils/jwtUtils";
import ProfileDropdown from "./my-profile/ProfileDropdown";

const SEARCH_ITEMS = [
  {
    title: "Text to Image",
    href: "/dashboard/text-to-image",
    description: "Generate beautiful images from prompts",
    roles: [UserRole.USER],
  },
  {
    title: "AI Chatbot",
    href: "/dashboard/ai-chatbot",
    description: "Chat with state-of-the-art AI model",
    roles: [UserRole.USER],
  },
  {
    title: "Text to Video",
    href: "/dashboard/text-to-video",
    description: "Create cinematic videos from description",
    roles: [UserRole.USER],
  },
  {
    title: "Text to Speech",
    href: "/dashboard/text-to-speech",
    description: "Convert script or text to high-fidelity audio",
    roles: [UserRole.USER],
  },
  {
    title: "Resume Analyzer",
    href: "/dashboard/resume-analyzer",
    description: "Review and score resume files",
    roles: [UserRole.USER],
  },
  {
    title: "Image to Video",
    href: "/dashboard/image-to-video",
    description: "Turn static photos into dynamic videos",
    roles: [UserRole.USER],
  },
  {
    title: "Remove Background",
    href: "/dashboard/remove-background",
    description: "Instantly clean background from images",
    roles: [UserRole.USER],
  },
  {
    title: "History Logs",
    href: "/dashboard/history",
    description: "View your generation logs and assets history",
    roles: [UserRole.USER],
  },
  {
    title: "Billing Ledger",
    href: "/dashboard/billing",
    description: "Manage subscription plans and Stripe portal",
    roles: [UserRole.USER],
  },
  {
    title: "Profile Settings",
    href: "/dashboard/my-profile",
    description: "View account settings and security sessions",
    roles: [UserRole.USER],
  },
  // Admin items
  {
    title: "Admin Management",
    href: "/admin/dashboard",
    description: "Platform revenue analytics dashboard",
    roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
  },
  {
    title: "User Accounts",
    href: "/admin/dashboard/users",
    description: "Search users, ban accounts, override tiers",
    roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
  },
  {
    title: "Payments Log",
    href: "/admin/dashboard/payments",
    description: "Stripe payments and invoices ledger",
    roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
  },
  {
    title: "Profile Settings (Admin)",
    href: "/admin/dashboard/my-profile",
    description: "Admin settings and active sessions",
    roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
  },
];

export default function DashboardTopBar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [decodedUser, setDecodedUser] = useState<any>(null);
  const [role, setRole] = useState<UserRole>(UserRole.USER);
  const [globalSearch, setGlobalSearch] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const filteredSearchItems = SEARCH_ITEMS.filter((item) => {
    const hasRoleAccess = item.roles.includes(role);
    if (!hasRoleAccess) return false;

    if (!globalSearch.trim()) return false;
    const matchStr = globalSearch.toLowerCase();
    return (
      item.title.toLowerCase().includes(matchStr) ||
      item.description.toLowerCase().includes(matchStr)
    );
  });

  // 1. Fetch unread count for badge
  const { data: unreadRes, refetch: refetchUnread } = useQuery({
    queryKey: ["unreadCount"],
    queryFn: () => getMyNotificationsService(),
    refetchInterval: 30000,
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
          setRole(decoded.role);
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
          {/* <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 shadow-md">
            <Sparkles className="h-4 w-4 text-white" />
          </div> */}
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
            AI
          </div>
          <span className="font-bold text-sm text-foreground hidden sm:block">
            AI Generate Studio
          </span>
        </Link>
      </div>

      {/* Center/Left (Desktop): Search Bar */}
      <div className="hidden md:flex flex-grow max-w-xs mr-4 relative">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tools, settings..."
            value={globalSearch}
            onChange={(e) => {
              setGlobalSearch(e.target.value);
              setShowSearchDropdown(true);
            }}
            onFocus={() => setShowSearchDropdown(true)}
            onBlur={() => {
              setTimeout(() => setShowSearchDropdown(false), 200);
            }}
            className="pl-9 h-9 rounded-xl border-border/40 bg-muted/20 focus-visible:border-violet-500/70 text-xs"
          />
        </div>

        {showSearchDropdown && filteredSearchItems.length > 0 && (
          <div className="absolute top-11 left-0 right-0 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl z-[999] overflow-hidden max-h-[300px] overflow-y-auto">
            <div className="p-2 space-y-1">
              {filteredSearchItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    setGlobalSearch("");
                    setShowSearchDropdown(false);
                  }}
                  className="flex flex-col gap-0.5 p-2.5 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-850/50 transition-colors text-left"
                >
                  <span className="text-xs font-bold text-neutral-850 dark:text-neutral-200">
                    {item.title}
                  </span>
                  <span className="text-[10px] text-neutral-450 dark:text-neutral-500">
                    {item.description}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
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
        <ProfileDropdown decodedUser={decodedUser} />
      </div>
    </header>
  );
}
