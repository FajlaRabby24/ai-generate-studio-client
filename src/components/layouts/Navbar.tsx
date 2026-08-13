"use client";

import { CreditCard, LayoutDashboard, LogOut, Menu, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [decodedUser, setDecodedUser] = useState<any>(null);

  // Avoid hydration mismatch by rendering theme toggle only on the client
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
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Side: Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          {/* <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white relative shrink-0 group-hover:scale-105 transition-all duration-300">
            <div className="h-2.5 w-2.5 rounded-full bg-white" />
          </div> */}
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
                AI
              </div>
          <span className="text-xl font-bold tracking-tight text-white">
            AI Generate Studio
          </span>
        </Link>

        {/* Center: Desktop Navigation Buttons */}
        <nav className="hidden md:flex items-center gap-1 border border-gray-700/60 rounded-full px-2 py-1 bg-black/40 backdrop-blur-md shadow-lg shadow-black/30">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3.5 py-1 text-sm font-medium transition-all duration-200 rounded-full",
                  isActive
                    ? "text-white bg-white/10"
                    : "text-white/80 hover:text-white hover:bg-white/5",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Side: Desktop Actions & Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
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
                {decodedUser.name
                  ? decodedUser.name.substring(0, 1).toUpperCase()
                  : "U"}
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
              <Link
                href="/auth/login"
                className="rounded-full px-4 h-9 flex items-center justify-center text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                Login
              </Link>

              <Link
                href="/auth/register"
                className="rounded-full px-5 h-9 flex items-center justify-center text-sm font-semibold text-black bg-white hover:bg-white/90 active:scale-[0.97] transition-all shadow-md duration-200"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Responsive Header Actions */}
        <div className="flex md:hidden items-center gap-2">
          {/* Sheet Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-xl size-9 cursor-pointer hover:bg-white/5 transition-all"
                  aria-label="Open Menu"
                />
              }
            >
              <Menu className="h-5 w-5 text-white" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[85%] sm:max-w-[360px] p-6 flex flex-col justify-between border-l border-white/10 bg-[#0c0c0c]/95 backdrop-blur-md text-white"
            >
              <div className="flex flex-col gap-6">
                <SheetHeader className="p-0 text-left">
                  <SheetTitle className="flex items-center gap-2">
                    {/* <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white relative shrink-0">
                      <div className="h-2.5 w-2.5 rounded-full bg-white" />
                    </div> */}
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
                AI
              </div>
                    <span className="font-bold text-lg text-white">
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
                            ? "bg-white/10 text-white font-semibold"
                            : "text-white/60 hover:bg-white/5 hover:text-white",
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
                      {decodedUser.name
                        ? decodedUser.name.substring(0, 1).toUpperCase()
                        : "U"}
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
                    className="w-full h-11 flex items-center justify-center rounded-xl text-sm font-medium text-white/80 hover:text-white border border-white/10 hover:bg-white/5 transition-all duration-200"
                  >
                    Login
                  </Link>

                  <Link
                    href="/auth/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full h-11 flex items-center justify-center rounded-xl text-sm font-semibold text-black bg-white hover:bg-white/90 active:scale-[0.97] transition-all shadow-md duration-200"
                  >
                    Register
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
