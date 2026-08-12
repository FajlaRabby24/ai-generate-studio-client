"use client";

import { MagicCard } from "@/components/ui/magic-card";
import { getMyProfileService } from "@/services/dashboard/myProfile/myProfile.service";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CreditCard,
  KeyRound,
  Laptop,
  Lock,
  Mail,
  Shield,
  Smartphone,
  User,
  Users,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

const MyProfileComponent = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  const { isLoading, data: adminProfile } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => getMyProfileService(),
  });

  const profile = adminProfile?.data;

  // Loading skeleton screen
  if (isLoading || !mounted || !profile) {
    return (
      <div className="space-y-8 text-neutral-900 dark:text-white transition-colors duration-300 animate-pulse">
        {/* Profile Card Header Skeleton */}
        <div className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900/50 p-8 h-40" />

        {/* Main Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="p-8 bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl h-80" />
            <div className="p-8 bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl h-80" />
          </div>
          <div className="p-6 bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl h-[500px]" />
        </div>
      </div>
    );
  }

  // Container stagger variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  } as any;

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.4 } },
  } as any;

  const parseUserAgent = (ua: string) => {
    if (ua.includes("Windows")) return { device: "Windows PC", icon: Laptop };
    if (ua.includes("iPhone") || ua.includes("Android"))
      return { device: "Mobile Phone", icon: Smartphone };
    return { device: "Unknown Device", icon: Laptop };
  };

  return (
    <motion.div
      className="space-y-8 text-neutral-900 dark:text-white transition-colors duration-300"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* 1. Profile Hero Section */}
      <motion.div variants={itemVariants}>
        <div className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-r from-neutral-50 via-white to-neutral-50 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900 p-8 shadow-sm dark:shadow-2xl transition-colors duration-300">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-violet-500/10 dark:bg-violet-600/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-64 w-64 rounded-full bg-pink-500/10 dark:bg-pink-600/10 blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="relative group">
              <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-violet-600 to-pink-600 p-1 shadow-lg">
                <div className="h-full w-full rounded-full bg-white dark:bg-neutral-950 flex items-center justify-center">
                  <User className="h-12 w-12 text-neutral-600 dark:text-neutral-300" />
                </div>
              </div>
            </div>

            <div className="text-center md:text-left space-y-2 flex-grow">
              <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-neutral-950 via-neutral-700 to-neutral-500 dark:from-white dark:via-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent">
                {profile.name}
              </h1>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm md:text-base flex items-center justify-center md:justify-start gap-2">
                <Mail className="h-4 w-4 text-violet-500" /> {profile.email}
              </p>
              <div className="flex items-center justify-center md:justify-start gap-3 mt-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-500/20 flex items-center gap-1">
                  <Shield className="h-3.5 w-3.5" />
                  {profile.role}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {profile.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 2. Personal Information & Settings Panel */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
          {/* Admin Access Panel */}
          <MagicCard
            className="p-8 bg-white dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm dark:shadow-none transition-colors duration-300"
            gradientColor={
              isDark ? "rgba(139, 92, 246, 0.05)" : "rgba(124, 58, 237, 0.03)"
            }
          >
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-neutral-800 dark:text-white">
              <KeyRound className="h-5 w-5 text-violet-500" />
              Administrative Privileges
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-neutral-100 dark:border-neutral-850 bg-neutral-50/50 dark:bg-neutral-950/20 flex items-start gap-3">
                <span className="p-2 rounded-lg bg-violet-500/10 text-violet-500">
                  <Users className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                    User Accounts Manager
                  </h4>
                  <p className="text-[10px] text-neutral-450 mt-1">
                    Permission to search, inspect status, block profiles, or
                    manually upgrade subscription plans.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-neutral-100 dark:border-neutral-850 bg-neutral-50/50 dark:bg-neutral-950/20 flex items-start gap-3">
                <span className="p-2 rounded-lg bg-violet-500/10 text-violet-500">
                  <CreditCard className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                    Stripe Financial Ledger
                  </h4>
                  <p className="text-[10px] text-neutral-450 mt-1">
                    Platform transaction logging view to trace incoming invoice
                    references and payments.
                  </p>
                </div>
              </div>
            </div>
          </MagicCard>

          {/* 3. Session Management */}
          <MagicCard
            className="p-8 bg-white dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm dark:shadow-none transition-colors duration-300"
            gradientColor={
              isDark ? "rgba(139, 92, 246, 0.05)" : "rgba(124, 58, 237, 0.03)"
            }
          >
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-neutral-800 dark:text-white">
              <Shield className="h-5 w-5 text-violet-500" />
              Active Sessions
            </h2>

            <div className="space-y-4">
              {profile.sessions?.map((sess: any) => {
                const device = parseUserAgent(sess.userAgent || "");
                const DeviceIcon = device.icon;

                return (
                  <div
                    key={sess.id}
                    className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-950/40 border border-neutral-200 dark:border-neutral-850 rounded-xl transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-neutral-100 dark:bg-neutral-900 rounded-lg text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800">
                        <DeviceIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-neutral-800 dark:text-white">
                            {device.device}
                          </span>
                        </div>
                        <p className="text-neutral-400 dark:text-neutral-500 text-xs mt-1 max-w-[280px] md:max-w-md truncate">
                          {sess.userAgent || "Unknown Device User Agent"}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </MagicCard>
        </motion.div>

        {/* 4. Right Side Panel */}
        <motion.div variants={itemVariants} className="space-y-6">
          <MagicCard
            className="p-6 bg-white dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm dark:shadow-none transition-colors duration-300"
            gradientColor={
              isDark ? "rgba(139, 92, 246, 0.05)" : "rgba(124, 58, 237, 0.03)"
            }
          >
            <h2 className="text-lg font-bold flex items-center gap-2 text-neutral-800 dark:text-white">
              <Lock className="h-5 w-5 text-violet-500" />
              Security Clearance
            </h2>
            <p className="mb-5 mt-0.5 text-neutral-500 dark:text-neutral-400 text-sm">
              Platform administration controls
            </p>

            <div className="space-y-4">
              <Link
                href="/admin/dashboard/users"
                className="flex items-center justify-between p-3.5 rounded-xl border border-neutral-150 dark:border-neutral-850 hover:bg-neutral-50 dark:hover:bg-neutral-950/45 transition-all text-xs font-semibold text-neutral-700 dark:text-neutral-350"
              >
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-violet-500" />
                  Manage User Accounts
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
              </Link>

              <Link
                href="/admin/dashboard/payments"
                className="flex items-center justify-between p-3.5 rounded-xl border border-neutral-150 dark:border-neutral-850 hover:bg-neutral-50 dark:hover:bg-neutral-950/45 transition-all text-xs font-semibold text-neutral-700 dark:text-neutral-350"
              >
                <span className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-violet-500" />
                  Review Payment Logs
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
              </Link>
            </div>
          </MagicCard>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MyProfileComponent;
