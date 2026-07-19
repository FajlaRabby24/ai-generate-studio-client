"use client";

import {
  CreditCard,
  Film,
  History,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  Mic,
  Sparkles,
  User,
  Video,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Sidebar Links Configuration with "/dashboard" paths
const sidebarLinks = [
  {
    category: "General",
    items: [{ href: "/dashboard", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    category: "AI Generators",
    items: [
      {
        href: "/dashboard/text-to-image",
        label: "Text to Image",
        icon: ImageIcon,
      },
      { href: "/dashboard/text-to-video", label: "Text to Video", icon: Video },
      {
        href: "/dashboard/image-to-video",
        label: "Image to Video",
        icon: Film,
      },
      {
        href: "/dashboard/image-to-image",
        label: "Image to Image",
        icon: Sparkles,
      },
      { href: "/dashboard/text-to-speech", label: "Text to Speech", icon: Mic },
    ],
  },
  {
    category: "Account",
    items: [
      { href: "/dashboard/history", label: "History", icon: History },
      { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
      { href: "/dashboard/profile", label: "Profile", icon: User },
    ],
  },
];

interface SidebarProps {
  onCloseMobileMenu?: () => void;
}

export default function Sidebar({ onCloseMobileMenu }: SidebarProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch for theme toggle
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col h-full bg-card/65 backdrop-blur-md">
      {/* Brand Header */}
      <div className="flex h-16 items-center px-6 border-b border-border/40 gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 shadow-md">
          <Sparkles className="h-4.5 w-4.5 text-white" />
        </div>
        <span className="font-bold text-base bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
          AI Generate Studio
        </span>
      </div>

      {/* Nav Items List */}
      <nav className="flex-1 space-y-6 px-4 py-6 overflow-y-auto">
        {sidebarLinks.map((section) => (
          <div key={section.category} className="space-y-1.5">
            <span className="px-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              {section.category}
            </span>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onCloseMobileMenu}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl transition-all",
                      isActive
                        ? "bg-muted text-primary font-semibold shadow-xs"
                        : "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4",
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-foreground",
                      )}
                    />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom Footer Info */}
      <div className="p-4 border-t border-border/40 space-y-4">
        {/* User Card */}
        <div className="flex items-center gap-3 px-2 py-1.5">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm">
            U
          </div>
          <div className="flex-grow min-w-0">
            <p className="text-xs font-semibold text-foreground truncate">
              Demo User
            </p>
            <p className="text-[10px] text-muted-foreground truncate">
              demo@studio.com
            </p>
          </div>
        </div>

        {/* Action Row */}
        <div className="flex items-center justify-between gap-2 px-1">
          {/* Theme Toggle */}
          {mounted ? (
            <AnimatedThemeToggler
              theme={theme as "light" | "dark"}
              onThemeChange={(newTheme) => setTheme(newTheme)}
              variant="circle"
              className="rounded-xl size-8 cursor-pointer flex items-center justify-center hover:bg-muted/60 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:text-amber-500 [&_svg]:dark:text-violet-500"
            />
          ) : (
            <div className="h-8 w-8 rounded-xl bg-muted/40 animate-pulse" />
          )}

          {/* Logout button */}
          <Button
            variant="ghost"
            size="sm"
            className="rounded-xl h-8 px-3 font-medium text-xs text-destructive hover:bg-destructive/10"
            onClick={() => console.log("Logout clicked")}
          >
            <LogOut className="h-3.5 w-3.5 mr-1" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
