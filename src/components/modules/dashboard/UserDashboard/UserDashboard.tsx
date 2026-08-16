"use client";

import { Button } from "@/components/ui/button";
import { MagicCard } from "@/components/ui/magic-card";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { GenerationType } from "@/config/constant";
import { getDashboardStatsService } from "@/services/dashboard/stats/UserDashboardStats.service";
import { handleDownload } from "@/utils/handleDownload";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  ChevronRight,
  CreditCard,
  Crown,
  Download,
  FileText,
  Film,
  Image as ImageIcon,
  MessageSquare,
  ScanFace,
  Share2,
  Sparkles,
  Volume2,
  Zap,
} from "lucide-react";
import Link from "next/link";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

const quickActions = [
  {
    title: "Text to Image",
    description: "Generate stunning art from descriptions",
    href: "/dashboard/text-to-image",
    icon: ImageIcon,
    color:
      "text-purple-500 dark:text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
  {
    title: "AI Chatbot",
    description: "Interactive conversation with AI models",
    href: "/dashboard/ai-chatbot",
    icon: MessageSquare,
    color:
      "text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    title: "Remove Background",
    description: "Extract clean subjects from images",
    href: "/dashboard/remove-background",
    icon: ScanFace,
    color: "text-sky-500 dark:text-sky-400 bg-sky-500/10 border-sky-500/20",
  },
  {
    title: "Resume Analyzer",
    description: "Optimize your resume for ATS tracking",
    href: "/dashboard/resume-analyzer",
    icon: FileText,
    color:
      "text-amber-500 dark:text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
  {
    title: "Text to Video",
    description: "Generate video from text",
    href: "/dashboard/text-to-video",
    icon: Film,
    color: "text-red-500 dark:text-red-400 bg-red-500/10 border-red-500/20",
  },
  {
    title: "Text to Speech",
    description: "Convert written script into human voice",
    href: "/dashboard/text-to-speech",
    icon: Volume2,
    color:
      "text-indigo-500 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  },
];

const UserDashboardPage = () => {
  const { data: userDashboardStats, isLoading } = useQuery({
    queryKey: ["userDashboardStats"],
    queryFn: () => getDashboardStatsService(),
    refetchOnWindowFocus: false,
  });

  const stats = userDashboardStats?.data;

  // Render Skeleton Loader while fetching backend data
  if (isLoading || !stats) {
    return (
      <div className="space-y-8 text-neutral-900 dark:text-white transition-colors duration-300 animate-pulse">
        {/* 1. Header Banner Skeleton */}
        <div className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900/50 p-8 h-40" />

        {/* 2. Quota Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="p-6 bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-xl h-36"
            />
          ))}
        </div>

        {/* 3. Graph & Activity Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-6 bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl h-80" />
          <div className="p-6 bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl h-80" />
        </div>
      </div>
    );
  }

  const displayUser = stats.user;
  const displayQuotas =
    stats.quotas?.map((q: any) => ({
      ...q,
      icon:
        q.name === GenerationType.TEXT_TO_IMAGE
          ? ImageIcon
          : q.name === GenerationType.TEXT_TO_VIDEO
            ? MessageSquare
            : q.name === GenerationType.IMAGE_BACKGROUND_REMOVER
              ? ScanFace
              : q.name === GenerationType.RESUME_ANALYZER
                ? FileText
                : ImageIcon,
    })) || [];
  const displayActivityData = stats.activityData || [];
  const displayGenerations =
    stats.recentGenerations?.map((gen: any) => ({
      id: gen.id,
      type:
        gen.type === GenerationType.TEXT_TO_IMAGE
          ? "Image"
          : gen.type === GenerationType.TEXT_TO_VIDEO
            ? "Text to Video"
            : gen.type === GenerationType.IMAGE_BACKGROUND_REMOVER
              ? "Background Removal"
              : gen.type.replace(/_/g, " "),
      rawType: gen.type,
      prompt: gen.prompt || "No prompt provided",
      status: gen.status,
      time: new Date(gen.createdAt).toLocaleDateString(),
      url: gen.outputUrl,
    })) || [];

  // Container stagger transition variants
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

  return (
    <motion.div
      className="space-y-8 text-neutral-900 dark:text-white transition-colors duration-300"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* 1. Header Banner */}
      <motion.div variants={itemVariants}>
        <div className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-r from-neutral-50 via-white to-neutral-50 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900 p-8 shadow-sm dark:shadow-2xl transition-colors duration-300">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-violet-500/10 dark:bg-violet-600/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-64 w-64 rounded-full bg-pink-500/10 dark:bg-pink-600/10 blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-neutral-950 via-neutral-700 to-neutral-500 dark:from-white dark:via-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent flex items-center gap-3">
                Welcome back, {displayUser.name}{" "}
                <span className="animate-pulse">👋</span>
              </h1>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm md:text-base">
                Your creative studio is fully powered up. Create images, check
                code, translate languages, and more.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm dark:shadow-none">
              <div className="h-10 w-10 rounded-lg bg-violet-500/10 flex items-center justify-center border border-violet-500/20">
                <Crown className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm tracking-wide text-neutral-800 dark:text-white">
                    {displayUser.plan} TIER
                  </span>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-500">
                  Renews on{" "}
                  {displayUser.subscription?.currentPeriodEnd
                    ? new Date(
                        displayUser.subscription.currentPeriodEnd,
                      ).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-neutral-400 dark:text-neutral-500 ml-2" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. Quota Usage Cards */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3"
      >
        {displayQuotas.map((quota: any, idx: number) => {
          const Icon = quota.icon;
          const percentage = quota.limit
            ? Math.round((quota.used / quota.limit) * 100)
            : 100;

          return (
            <MagicCard
              key={idx}
              className="flex flex-col justify-between p-6 bg-white dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors shadow-sm dark:shadow-none"
              gradientColor={"rgba(139, 92, 246, 0.05)"}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-neutral-500 dark:text-neutral-400 font-medium text-sm">
                  {quota.name}
                </span>
                <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-2 text-neutral-850 dark:text-white">
                  {quota.used}
                  <span className="text-neutral-450 dark:text-neutral-500 text-sm font-medium">
                    {quota.limit ? ` / ${quota.limit}` : " generations"}
                  </span>
                </h3>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${quota.color} transition-all duration-500`}
                    style={{ width: `${quota.limit ? percentage : 100}%` }}
                  />
                </div>

                <div className="flex justify-between items-center mt-2 text-xs text-neutral-500 dark:text-neutral-500">
                  <span>Usage Status</span>
                  <span>
                    {quota.limit ? `${percentage}% Used` : "Unlimited Plan"}
                  </span>
                </div>
              </div>
            </MagicCard>
          );
        })}
      </motion.div>

      {/* 3. Graph & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Area Chart */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 p-6 bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 rounded-2xl flex flex-col justify-between shadow-sm dark:shadow-none transition-colors duration-300"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="space-y-1">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Activity className="h-4 w-4 text-violet-500 dark:text-violet-400" />
                Generation Activity
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-500">
                Tracking your usage trends over the week
              </p>
            </div>
            <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/50 px-3 py-1.5 rounded-lg text-xs text-neutral-600 dark:text-neutral-300">
              <span className="h-2 w-2 rounded-full bg-violet-500" />
              <span>Total generations</span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={displayActivityData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="colorGenerations"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="day"
                  stroke={"#525252"}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke={"#525252"}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#171717",
                    borderColor: "#262626",
                    borderRadius: "8px",
                    color: "#ffffff",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="generations"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorGenerations)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Upgrade / Billing Panel */}
        <motion.div
          variants={itemVariants}
          className="p-6 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900/60 dark:to-neutral-950/80 border border-neutral-200 dark:border-neutral-800 rounded-2xl flex flex-col justify-between relative overflow-hidden shadow-sm dark:shadow-none transition-colors duration-300"
        >
          <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-purple-500/10 blur-2xl" />

          <div className="space-y-4 relative z-10">
            <div className="h-12 w-12 rounded-xl bg-violet-500/10 flex items-center justify-center border border-violet-500/20">
              <Zap className="h-6 w-6 text-violet-500 dark:text-violet-400" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-neutral-800 dark:text-white">
                Unleash Ultimate Power
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
                Unlock high-fidelity Text-to-Video, super-resolution
                Image-to-Video, and priority server queues.
              </p>
            </div>

            <ul className="space-y-2.5 text-sm text-neutral-600 dark:text-neutral-300">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                Unlimited High-Definition Video
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                Priority Server Rendering Speed
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                Advanced Custom Finetuned Models
              </li>
            </ul>
          </div>

          <div className="mt-8 space-y-3 relative z-10">
            <ShimmerButton
              shimmerColor={"#8b5cf6"}
              background={"linear-gradient(to right, #6d28d9, #7c3aed)"}
              className="w-full py-3 text-sm font-semibold rounded-xl text-center"
            >
              Upgrade Plan
            </ShimmerButton>
            <Button
              variant="ghost"
              className="w-full text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-xl"
            >
              <CreditCard className="h-4 w-4 mr-2" /> Billing Settings
            </Button>
          </div>
        </motion.div>
      </div>

      {/* 4. Quick Actions Hub */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-neutral-800 dark:text-white">
          Quick Actions Hub
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <Link href={action.href} key={idx}>
                <MagicCard
                  className="group relative flex items-center justify-between p-6 bg-white dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800/80 rounded-xl cursor-pointer hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 hover:-translate-y-0.5 shadow-sm dark:shadow-none"
                  gradientColor={"rgba(124, 58, 237, 0.05)"}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg border ${action.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-neutral-800 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                          {action.title}
                        </span>
                      </div>
                      <p className="text-neutral-500 dark:text-neutral-400 text-xs mt-1 leading-snug">
                        {action.description}
                      </p>
                    </div>
                    <ArrowRight
                      size={20}
                      className="text-neutral-400 dark:text-neutral-600 group-hover:text-neutral-900 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300"
                    />
                  </div>
                </MagicCard>
              </Link>
            );
          })}
        </div>
      </motion.div>

      {/* 5. Recent History */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold tracking-tight text-neutral-800 dark:text-white">
            Recent Generations
          </h2>
          <Link href="/dashboard/history">
            <Button
              variant="ghost"
              className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
            >
              View All History <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </Link>
        </div>

        {displayGenerations.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-neutral-900/35 border border-neutral-200 dark:border-neutral-800/80 rounded-xl text-center space-y-4 shadow-sm dark:shadow-none transition-colors duration-300">
            <div className="p-4 bg-violet-500/10 rounded-full text-violet-600 dark:text-violet-400">
              <Sparkles className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-lg text-neutral-800 dark:text-white">
                No creations yet
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-sm">
                Get started by creating your very first AI image, conversation,
                or text translation.
              </p>
            </div>
            <Button
              onClick={() =>
                (window.location.href = "/dashboard/text-to-image")
              }
              className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl px-6 py-2.5 text-sm font-semibold transition-all"
            >
              Start Creating
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayGenerations?.map((gen: any, idx: number) => (
              <div
                key={idx}
                className="flex flex-col justify-between overflow-hidden bg-white dark:bg-neutral-900/35 border border-neutral-200 dark:border-neutral-800/80 rounded-xl p-5 hover:border-neutral-300 dark:hover:border-neutral-700/80 transition-colors shadow-sm dark:shadow-none"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-violet-600 dark:text-violet-400 bg-violet-500/10 px-2 py-1 rounded">
                      {gen.type}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-550">
                      {gen.time}
                    </span>
                  </div>

                  <p className="text-sm text-neutral-700 dark:text-neutral-300 font-medium line-clamp-2 mb-4 italic">
                    "{gen.prompt}"
                  </p>

                  {gen.url && (
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-4 border border-neutral-200 dark:border-neutral-800 bg-neutral-950 flex items-center justify-center">
                      {gen.rawType === GenerationType.IMAGE_TO_VIDEO ||
                      gen.rawType === GenerationType.TEXT_TO_VIDEO ? (
                        <video
                          src={gen.url}
                          controls
                          className="object-cover h-full w-full"
                        />
                      ) : (
                        <img
                          src={gen.url}
                          alt={gen.prompt}
                          className="object-cover h-full w-full hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-neutral-200 dark:border-neutral-800/60 mt-auto">
                  <span className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {gen.status}
                  </span>

                  <div className="flex items-center gap-1">
                    {gen.url && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const ext =
                            gen.rawType === GenerationType.IMAGE_TO_VIDEO ||
                            gen.rawType === GenerationType.TEXT_TO_VIDEO
                              ? "mp4"
                              : "jpg";
                          handleDownload(gen.url, `creation-${gen.id}.${ext}`);
                        }}
                        className="h-8 w-8 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                    {gen.url && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          navigator.clipboard.writeText(gen.url);
                          toast.success("Generation URL copied to clipboard!");
                        }}
                        className="h-8 w-8 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default UserDashboardPage;
