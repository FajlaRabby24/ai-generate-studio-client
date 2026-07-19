"use client";

import { Menu, Moon, Sparkles, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

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

  // Avoid hydration mismatch by rendering theme toggle only on the client
  useEffect(() => {
    setMounted(true);
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
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
