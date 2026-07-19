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
  Settings,
  MessageSquare,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserRole } from "@/utils/authUtils";
import { jwtUtils } from "@/utils/jwtUtils";
import { getCommonNavItems, userNavItems } from "@/utils/sidebarNavitems";
import { getCookie } from "@/utils/cookieUtils";

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "LayoutDashboard":
      return LayoutDashboard;
    case "User":
      return User;
    case "History":
      return History;
    case "CreditCard":
      return CreditCard;
    case "Settings":
      return Settings;
    case "MdOutlineDraw":
      return ImageIcon;
    case "MdOutlineVideoLibrary":
      return Video;
    case "MdOutlineSurfing":
      return Mic;
    case "MdOutlineDeleteOutline":
      return Film;
    case "MdOutlineChat":
      return MessageSquare;
    default:
      return Sparkles;
  }
};

interface SidebarProps {
  onCloseMobileMenu?: () => void;
}

export default function Sidebar({ onCloseMobileMenu }: SidebarProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [role, setRole] = useState<UserRole>(UserRole.USER);
  const [decodedUser, setDecodedUser] = useState<any>(null);

  // Avoid hydration mismatch for theme toggle
  useEffect(() => {
    setMounted(true);

    const fetchToken = async () => {
      const token = await getCookie("accessToken");
      if (token) {
        const decoded = jwtUtils.decodedToken(token);
        if (decoded) {
          setDecodedUser(decoded);
          if (decoded.role) {
            setRole(decoded.role as UserRole);
          }
        }
      }
    };

    fetchToken();
  }, []);

  const commonLinks = getCommonNavItems(role);
  const generatorLinks = role === UserRole.USER ? userNavItems : [];
  const sidebarLinks = [...commonLinks, ...generatorLinks];

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
        {sidebarLinks.map((section, idx) => (
          <div key={idx} className="space-y-1.5">
            {section.title && (
              <span className="px-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                {section.title}
              </span>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = getIcon(item.icon);
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
                    {item.title}
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
            {decodedUser?.name ? decodedUser.name.substring(0, 1).toUpperCase() : "U"}
          </div>
          <div className="flex-grow min-w-0">
            <p className="text-xs font-semibold text-foreground truncate">
              {decodedUser?.name || "Demo User"}
            </p>
            <p className="text-[10px] text-muted-foreground truncate">
              {decodedUser?.email || "demo@studio.com"}
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
