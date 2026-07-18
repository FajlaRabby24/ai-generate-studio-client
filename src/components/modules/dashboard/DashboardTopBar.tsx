"use client";

import {
  Bell,
  CreditCard,
  LogOut,
  Menu,
  Search,
  Sparkles,
  User,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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

export default function DashboardTopBar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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
        <Button
          variant="ghost"
          size="icon"
          className="rounded-xl size-9 cursor-pointer hover:bg-muted/80 relative"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive animate-pulse" />
        </Button>

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
            U
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 mt-1 rounded-xl p-1.5 border border-border/40 bg-popover shadow-lg"
          >
            {/* User Profile Info Summary */}
            <div className="flex flex-col space-y-1.5 p-2.5">
              <p className="text-sm font-semibold text-foreground leading-none">
                Demo User
              </p>
              <p className="text-xs text-muted-foreground truncate">
                demo@studio.com
              </p>
              <div className="mt-1 inline-flex w-fit items-center rounded-full bg-violet-500/10 px-2.5 py-0.5 text-[10px] font-medium text-violet-500 dark:bg-violet-400/10 dark:text-violet-400">
                Administrator
              </div>
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
              onClick={() => console.log("Logout clicked from TopBar")}
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
