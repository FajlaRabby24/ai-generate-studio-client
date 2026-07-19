"use client";

import { Menu, Moon, Sparkles, Sun, User, CreditCard, LogOut, LayoutDashboard } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { getCookie } from "@/utils/cookieUtils";
import { jwtUtils } from "@/utils/jwtUtils";

// Navigation link structure
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [decodedUser, setDecodedUser] = useState<any>(null);

  // Avoid hydration mismatch by rendering theme toggle only on the client
  useEffect(() => {
    setMounted(true);

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
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Side: Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 shadow-md shadow-violet-500/20 group-hover:scale-105 transition-all duration-300">
            <Sparkles className="h-5 w-5 text-white animate-pulse" />
          </div>
          <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/75 bg-clip-text text-xl font-bold tracking-tight text-transparent">
            AI Generate Studio
          </span>
        </Link>

        {/* Center: Desktop Navigation Buttons */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                  isActive
                    ? "text-primary bg-muted/50"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/30",
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Side: Desktop Actions & Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle Button */}
          {mounted ? (
            <AnimatedThemeToggler
              theme={theme as "light" | "dark"}
              onThemeChange={(newTheme) => setTheme(newTheme)}
              variant="circle"
              className="rounded-xl hover:bg-muted/80 size-9 flex items-center justify-center transition-all [&_svg]:h-[1.2rem] [&_svg]:w-[1.2rem] [&_svg]:text-amber-500 [&_svg]:dark:text-violet-500 cursor-pointer"
            />
          ) : (
            <div className="h-9 w-9 rounded-xl bg-muted/40 animate-pulse" />
          )}

          {decodedUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    className="rounded-full size-9 p-0 cursor-pointer overflow-hidden border border-border/40 bg-gradient-to-br from-violet-600 to-indigo-600 text-white font-semibold text-sm flex items-center justify-center shadow-inner active:scale-95 transition-all animate-in fade-in zoom-in duration-200"
                    aria-label="User profile menu"
                  />
                }
              >
                {decodedUser.name ? decodedUser.name.substring(0, 1).toUpperCase() : "U"}
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 mt-1 rounded-xl p-1.5 border border-border/40 bg-popover shadow-lg"
              >
                <div className="flex flex-col space-y-1.5 p-2.5">
                  <p className="text-sm font-semibold text-foreground leading-none">
                    {decodedUser.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {decodedUser.email}
                  </p>
                  {decodedUser.role && (
                    <div className="mt-1.5 inline-flex w-fit items-center rounded-full bg-violet-500/10 px-2.5 py-0.5 text-[10px] font-medium text-violet-500 dark:bg-violet-400/10 dark:text-violet-400">
                      {decodedUser.role}
                    </div>
                  )}
                </div>

                <DropdownMenuSeparator className="my-1.5" />

                <Link href="/dashboard" className="w-full">
                  <DropdownMenuItem className="rounded-lg cursor-pointer">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                </Link>
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

                <DropdownMenuItem
                  variant="destructive"
                  className="rounded-lg cursor-pointer"
                  onClick={() => {
                    // Refresh token cookie cleanup is handled by redirect / server, or direct console logs
                    console.log("Logged out from Navbar");
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/auth/login">
                <ShimmerButton
                  shimmerColor="rgba(139, 92, 246, 0.3)"
                  background="transparent"
                  borderRadius="12px"
                  className="h-9 px-4 py-0 text-sm font-medium text-foreground hover:bg-muted/30 border border-border/50 transition-all"
                >
                  Login
                </ShimmerButton>
              </Link>

              <Link href="/auth/register">
                <ShimmerButton
                  shimmerColor="#ffffff"
                  background="linear-gradient(to right, #7c3aed, #4f46e5)"
                  borderRadius="12px"
                  className="h-9 px-5 py-0 text-sm font-semibold text-white shadow-md shadow-violet-500/10 hover:shadow-violet-500/20 active:scale-[0.98] transition-all"
                >
                  Register
                </ShimmerButton>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Responsive Header Actions */}
        <div className="flex md:hidden items-center gap-2">
          {/* Theme Toggle for Mobile (outside drawer for easy access) */}
          {mounted ? (
            <AnimatedThemeToggler
              theme={theme as "light" | "dark"}
              onThemeChange={(newTheme) => setTheme(newTheme)}
              variant="circle"
              className="rounded-xl cursor-pointer size-9 flex items-center justify-center hover:bg-muted/80 transition-all [&_svg]:h-[1.1rem] [&_svg]:w-[1.1rem] [&_svg]:text-amber-500 [&_svg]:dark:text-violet-500"
            />
          ) : (
            <div className="h-9 w-9 rounded-xl bg-muted/40 animate-pulse" />
          )}

          {/* Sheet Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-xl size-9 cursor-pointer hover:bg-muted/80 transition-all"
                  aria-label="Open Menu"
                />
              }
            >
              <Menu className="h-5 w-5 text-foreground" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[85%] sm:max-w-[360px] p-6 flex flex-col justify-between border-l border-border/30 bg-background/95 backdrop-blur-md"
            >
              <div className="flex flex-col gap-6">
                <SheetHeader className="p-0 text-left">
                  <SheetTitle className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 shadow-md">
                      <Sparkles className="h-4.5 w-4.5 text-white" />
                    </div>
                    <span className="font-bold text-lg bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                      AI Generate Studio
                    </span>
                  </SheetTitle>
                </SheetHeader>

                {/* Mobile Navigation Links */}
                <nav className="flex flex-col gap-2 mt-4">
                  {navLinks.map((link) => {
                    const isActive =
                      pathname === link.href ||
                      (link.href !== "/" && pathname.startsWith(link.href));
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex w-full items-center px-4 py-3 text-base font-medium rounded-xl transition-all",
                          isActive
                            ? "bg-muted/70 text-primary font-semibold"
                            : "text-muted-foreground hover:bg-muted/30 hover:text-foreground",
                        )}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Mobile Auth Actions at Bottom */}
              {decodedUser ? (
                <div className="flex flex-col gap-3 mt-auto p-2 border-t border-border/40 pt-4">
                  <div className="flex items-center gap-3 px-1">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-semibold text-base shadow-inner">
                      {decodedUser.name ? decodedUser.name.substring(0, 1).toUpperCase() : "U"}
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {decodedUser.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {decodedUser.email}
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full mt-2"
                  >
                    <Button className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/95 transition-all cursor-pointer">
                      Go to Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full h-11 rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20 font-medium transition-all cursor-pointer"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      console.log("Logged out from Mobile Navbar");
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-3 mt-auto">
                  <Link
                    href="/auth/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full"
                  >
                    <ShimmerButton
                      shimmerColor="rgba(139, 92, 246, 0.3)"
                      background="transparent"
                      borderRadius="12px"
                      className="w-full h-11 py-0 font-medium text-foreground border border-border/60 hover:bg-muted/30 transition-all"
                    >
                      Login
                    </ShimmerButton>
                  </Link>

                  <Link
                    href="/auth/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full"
                  >
                    <ShimmerButton
                      shimmerColor="#ffffff"
                      background="linear-gradient(to right, #7c3aed, #4f46e5)"
                      borderRadius="12px"
                      className="w-full h-11 py-0 font-semibold text-white shadow-md shadow-violet-500/10 active:scale-[0.98] transition-all"
                    >
                      Register
                    </ShimmerButton>
                  </Link>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
