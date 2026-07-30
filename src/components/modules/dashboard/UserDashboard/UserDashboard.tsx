"use client";

import { Button } from "@/components/ui/button";
import { MagicCard } from "@/components/ui/magic-card";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  ChevronRight,
  CreditCard,
  Crown,
  Download,
  FileText,
  Image as ImageIcon,
  MessageSquare,
  RefreshCw,
  ScanFace,
  Share2,
  Terminal,
  Volume2,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Mock Data
const mockUser = {
  name: "Fajla",
  email: "fajla@example.com",
  plan: "PRO",
  renewalDate: "Aug 29, 2026",
};

const mockQuotas = [
  {
    name: "Text to Image",
    used: 15,
    limit: 20,
    icon: ImageIcon,
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "AI Chatbot",
    used: 48,
    limit: null, // Unlimited
    icon: MessageSquare,
    color: "from-emerald-500 to-teal-500",
  },
  {
    name: "Remove Background",
    used: 8,
    limit: 10,
    icon: ScanFace,
    color: "from-sky-500 to-blue-500",
  },
  {
    name: "Resume Analyzer",
    used: 3,
    limit: 5,
    icon: FileText,
    color: "from-amber-500 to-orange-500",
  },
];

const mockActivityData = [
  { day: "Mon", generations: 4 },
  { day: "Tue", generations: 7 },
  { day: "Wed", generations: 5 },
  { day: "Thu", generations: 12 },
  { day: "Fri", generations: 8 },
  { day: "Sat", generations: 15 },
  { day: "Sun", generations: 10 },
];

const quickActions = [
  {
    title: "Text to Image",
    description: "Generate stunning art from descriptions",
    href: "/dashboard/text-to-image",
    icon: ImageIcon,
    color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    badge: "Popular",
  },
  {
    title: "AI Chatbot",
    description: "Interactive conversation with AI models",
    href: "/dashboard/ai-chatbot",
    icon: MessageSquare,
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    badge: "New",
  },
  {
    title: "Remove Background",
    description: "Extract clean subjects from images",
    href: "/dashboard/remove-background",
    icon: ScanFace,
    color: "text-sky-400 bg-sky-500/10 border-sky-500/20",
  },
  {
    title: "Resume Analyzer",
    description: "Optimize your resume for ATS tracking",
    href: "/dashboard/resume-analyzer",
    icon: FileText,
    color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    badge: "Pro",
  },
  {
    title: "Code Checker",
    description: "Scan code for bugs and security flaws",
    href: "/dashboard/code-checker",
    icon: Terminal,
    color: "text-red-400 bg-red-500/10 border-red-500/20",
  },
  {
    title: "Text to Speech",
    description: "Convert written script into human voice",
    href: "/dashboard/text-to-speech",
    icon: Volume2,
    color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  },
];

const mockGenerations = [
  {
    id: "1",
    type: "Image",
    prompt:
      "Futuristic neon cyberpunk alley with glowing signs and flying drones",
    status: "Success",
    time: "2 hours ago",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "2",
    type: "Chat",
    prompt:
      "Write a high-performance Express middleware for checking API rate limits using Redis",
    status: "Success",
    time: "5 hours ago",
  },
  {
    id: "3",
    type: "Background Removal",
    prompt: "portrait-professional-photo.png",
    status: "Success",
    time: "1 day ago",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60",
  },
];

const UserDashboardPage = () => {
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
      className="space-y-8  text-white min-h-screen bg-neutral-950"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* 1. Header Banner */}
      <motion.div variants={itemVariants}>
        <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 p-8 shadow-2xl">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-violet-600/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-64 w-64 rounded-full bg-pink-600/10 blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent flex items-center gap-3">
                Welcome back, {mockUser.name}{" "}
                <span className="animate-pulse">👋</span>
              </h1>
              <p className="text-neutral-400 text-sm md:text-base">
                Your creative studio is fully powered up. Create images, check
                code, translate languages, and more.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-neutral-900/80 backdrop-blur-md p-4 rounded-xl border border-neutral-800">
              <div className="h-10 w-10 rounded-lg bg-violet-500/10 flex items-center justify-center border border-violet-500/20">
                <Crown className="h-5 w-5 text-violet-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm tracking-wide">
                    {mockUser.plan} TIER
                  </span>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                </div>
                <p className="text-xs text-neutral-500">
                  Renews on {mockUser.renewalDate}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-neutral-500 ml-2" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. Quota Usage Cards */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {mockQuotas.map((quota, idx) => {
          const Icon = quota.icon;
          const percentage = quota.limit
            ? Math.round((quota.used / quota.limit) * 100)
            : 100;

          return (
            <MagicCard
              key={idx}
              className="flex flex-col justify-between p-6 bg-neutral-900/30 border border-neutral-800 rounded-xl hover:border-neutral-700 transition-colors"
              gradientColor="rgba(139, 92, 246, 0.05)"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-neutral-400 font-medium text-sm">
                  {quota.name}
                </span>
                <div
                  className={`p-2 rounded-lg bg-neutral-800 text-neutral-300 border border-neutral-700`}
                >
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-2">
                  {quota.used}
                  <span className="text-neutral-500 text-sm font-medium">
                    {quota.limit ? ` / ${quota.limit}` : " generations"}
                  </span>
                </h3>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${quota.color} transition-all duration-500`}
                    style={{ width: `${quota.limit ? percentage : 100}%` }}
                  />
                </div>

                <div className="flex justify-between items-center mt-2 text-xs text-neutral-500">
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
          className="lg:col-span-2 p-6 bg-neutral-900/40 border border-neutral-800 rounded-2xl flex flex-col justify-between"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="space-y-1">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Activity className="h-4 w-4 text-violet-400" />
                Generation Activity
              </h2>
              <p className="text-xs text-neutral-500">
                Tracking your usage trends over the week
              </p>
            </div>
            <div className="flex items-center gap-2 bg-neutral-800/50 border border-neutral-700/50 px-3 py-1.5 rounded-lg text-xs">
              <span className="h-2 w-2 rounded-full bg-violet-500" />
              <span>Total generations</span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={mockActivityData}
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
                  stroke="#525252"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#525252"
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
          className="p-6 bg-gradient-to-b from-neutral-900/60 to-neutral-950/80 border border-neutral-800 rounded-2xl flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-purple-500/10 blur-2xl" />

          <div className="space-y-4 relative z-10">
            <div className="h-12 w-12 rounded-xl bg-violet-500/10 flex items-center justify-center border border-violet-500/20">
              <Zap className="h-6 w-6 text-violet-400" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold">Unleash Ultimate Power</h2>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Unlock high-fidelity Text-to-Video, super-resolution
                Image-to-Video, and priority server queues.
              </p>
            </div>

            <ul className="space-y-2.5 text-sm text-neutral-300">
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
              shimmerColor="#8b5cf6"
              background="linear-gradient(to right, #6d28d9, #7c3aed)"
              className="w-full py-3 text-sm font-semibold rounded-xl text-center"
            >
              Upgrade Plan
            </ShimmerButton>
            <Button
              variant="ghost"
              className="w-full text-neutral-400 hover:text-white border border-neutral-800 hover:bg-neutral-900 rounded-xl"
            >
              <CreditCard className="h-4 w-4 mr-2" /> Billing Settings
            </Button>
          </div>
        </motion.div>
      </div>

      {/* 4. Quick Actions Hub */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight">Quick Actions Hub</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <MagicCard
                key={idx}
                className="group relative flex items-center justify-between p-6 bg-neutral-900/30 border border-neutral-800/80 rounded-xl cursor-pointer hover:border-neutral-700 transition-all duration-300 hover:-translate-y-0.5"
                gradientColor="rgba(124, 58, 237, 0.05)"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg border ${action.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm group-hover:text-violet-400 transition-colors">
                        {action.title}
                      </span>
                      {action.badge && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-violet-500/20 text-violet-400 border border-violet-500/20">
                          {action.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-neutral-400 text-xs mt-1 leading-snug">
                      {action.description}
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-neutral-600 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
              </MagicCard>
            );
          })}
        </div>
      </motion.div>

      {/* 5. Recent History */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold tracking-tight">
            Recent Generations
          </h2>
          <Button
            variant="ghost"
            className="text-xs text-neutral-400 hover:text-white"
          >
            View All History <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockGenerations.map((gen, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between overflow-hidden bg-neutral-900/35 border border-neutral-800/80 rounded-xl p-5 hover:border-neutral-700/80 transition-colors"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-violet-400 bg-violet-500/10 px-2 py-1 rounded">
                    {gen.type}
                  </span>
                  <span className="text-xs text-neutral-500">{gen.time}</span>
                </div>

                <p className="text-sm text-neutral-300 font-medium line-clamp-2 mb-4 italic">
                  "{gen.prompt}"
                </p>

                {gen.url && (
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-4 border border-neutral-800">
                    <img
                      src={gen.url}
                      alt={gen.prompt}
                      className="object-cover h-full w-full hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-neutral-800/60 mt-auto">
                <span className="flex items-center gap-1.5 text-xs text-neutral-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {gen.status}
                </span>

                <div className="flex items-center gap-1">
                  {gen.url && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-neutral-400 hover:text-white hover:bg-neutral-800"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-neutral-400 hover:text-white hover:bg-neutral-800"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-neutral-400 hover:text-white hover:bg-neutral-800"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UserDashboardPage;
