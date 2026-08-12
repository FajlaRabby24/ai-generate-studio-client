"use client";

import { getAdminStatsService } from "@/services/dashboard/admin/admin.service";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  Cpu,
  CreditCard,
  DollarSign,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboardComponent() {
  const { data: statsRes, isLoading } = useQuery({
    queryKey: ["adminStats"],
    queryFn: () => getAdminStatsService(),
  });

  const stats = statsRes?.data;

  if (isLoading) {
    return (
      <div className="p-6 space-y-6 max-w-[1600px] mx-auto animate-pulse">
        <div className="h-8 w-48 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="h-28 bg-neutral-100 dark:bg-neutral-900 rounded-3xl"
            />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 bg-neutral-100 dark:bg-neutral-900 rounded-3xl" />
          <div className="h-96 bg-neutral-100 dark:bg-neutral-900 rounded-3xl" />
        </div>
      </div>
    );
  }

  const {
    totalUsers = 0,
    activeSubscriptions = 0,
    totalRevenue = 0,
    totalGenerations = 0,
    generationStats = [],
    chartData = [],
    recentPayments = [],
    recentUsers = [],
  } = stats || {};

  // Custom SVG Chart calculations
  const maxRevenue = Math.max(...chartData.map((d: any) => d.revenue), 1);
  const chartHeight = 160;
  const chartWidth = 500;
  const padding = 20;

  const points = chartData.map((d: any, i: number) => {
    const x =
      padding +
      (i * (chartWidth - padding * 2)) / Math.max(chartData.length - 1, 1);
    const y =
      chartHeight -
      padding -
      (d.revenue * (chartHeight - padding * 2)) / maxRevenue;
    return { x, y, month: d.month, revenue: d.revenue };
  });

  const pathD = points.reduce((acc: string, p: any, i: number) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, "");

  const areaD = points.length
    ? `${pathD} L ${points[points.length - 1].x} ${chartHeight - padding} L ${points[0].x} ${chartHeight - padding} Z`
    : "";

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Top Welcome Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Admin Management
          </h1>
          <p className="text-xs text-neutral-500 mt-1.5">
            Platform statistics, user control, and billing ledger logs.
          </p>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Revenue */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs relative overflow-hidden"
        >
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-neutral-450 dark:text-neutral-500 uppercase tracking-wider">
              Total Income
            </span>
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <DollarSign className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-extrabold text-neutral-850 dark:text-neutral-100">
              $
              {totalRevenue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </h3>
            <span className="text-[10px] text-emerald-500 flex items-center gap-1 mt-1 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" /> Platform gross volume
            </span>
          </div>
        </motion.div>

        {/* Active Subs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs relative overflow-hidden"
        >
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-neutral-450 dark:text-neutral-500 uppercase tracking-wider">
              Active Subs
            </span>
            <span className="p-2 rounded-xl bg-violet-500/10 text-violet-500">
              <CreditCard className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-extrabold text-neutral-850 dark:text-neutral-100">
              {activeSubscriptions}
            </h3>
            <span className="text-[10px] text-violet-500 flex items-center gap-1 mt-1 font-semibold">
              <UserCheck className="w-3.5 h-3.5" /> Recurring PRO plans
            </span>
          </div>
        </motion.div>

        {/* Total Users */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs relative overflow-hidden"
        >
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-neutral-450 dark:text-neutral-500 uppercase tracking-wider">
              Total Users
            </span>
            <span className="p-2 rounded-xl bg-sky-500/10 text-sky-500">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-extrabold text-neutral-850 dark:text-neutral-100">
              {totalUsers}
            </h3>
            <span className="text-[10px] text-sky-500 flex items-center gap-1 mt-1 font-semibold">
              <UserCheck className="w-3.5 h-3.5" /> Registered userbase
            </span>
          </div>
        </motion.div>

        {/* Generations count */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs relative overflow-hidden"
        >
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold text-neutral-450 dark:text-neutral-500 uppercase tracking-wider">
              AI Generations
            </span>
            <span className="p-2 rounded-xl bg-rose-500/10 text-rose-500">
              <Activity className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-extrabold text-neutral-850 dark:text-neutral-100">
              {totalGenerations.toLocaleString()}
            </h3>
            <span className="text-[10px] text-rose-500 flex items-center gap-1 mt-1 font-semibold">
              <Cpu className="w-3.5 h-3.5" /> Total generated assets
            </span>
          </div>
        </motion.div>
      </div>

      {/* Main Charts block */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue SVG Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-neutral-850 dark:text-neutral-200">
              Monthly Billing Trends
            </h3>
            <p className="text-[10px] text-neutral-450 mt-0.5">
              Platform revenue metrics over the last 6 months.
            </p>
          </div>

          <div className="w-full flex items-center justify-center py-4">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-auto"
            >
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[0, 1, 2, 3].map((n) => {
                const y = padding + (n * (chartHeight - padding * 2)) / 3;
                return (
                  <line
                    key={n}
                    x1={padding}
                    y1={y}
                    x2={chartWidth - padding}
                    y2={y}
                    stroke="currentColor"
                    className="text-neutral-100 dark:text-neutral-800/40"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                );
              })}

              {/* Chart Filled Area */}
              {areaD && <path d={areaD} fill="url(#chartGrad)" />}

              {/* Chart Path */}
              {pathD && (
                <path
                  d={pathD}
                  fill="none"
                  stroke="#7c3aed"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              )}

              {/* Points & Tooltip placeholders */}
              {points.map((p: any, i: number) => (
                <g key={i}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="4"
                    fill="#7c3aed"
                    stroke="currentColor"
                    className="text-white dark:text-neutral-900"
                    strokeWidth="1.5"
                  />
                  <text
                    x={p.x}
                    y={chartHeight - 4}
                    textAnchor="middle"
                    className="text-[9px] font-bold fill-neutral-400 dark:fill-neutral-500"
                  >
                    {p.month}
                  </text>
                  <text
                    x={p.x}
                    y={p.y - 8}
                    textAnchor="middle"
                    className="text-[9px] font-black fill-neutral-700 dark:fill-neutral-300"
                  >
                    ${p.revenue.toFixed(0)}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* AI Generations distribution list */}
        <div className="bg-white dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-neutral-850 dark:text-neutral-200">
              AI Generation Mix
            </h3>
            <p className="text-[10px] text-neutral-450 mt-0.5">
              Breakdown of user requests per utility type.
            </p>
          </div>

          <div className="space-y-4 my-4 flex-1 flex flex-col justify-center">
            {generationStats.length === 0 ? (
              <div className="text-center py-6 text-xs text-neutral-400">
                No asset generation logs found.
              </div>
            ) : (
              generationStats.slice(0, 5).map((item: any, i: number) => {
                const percent = Math.round(
                  (item.count / Math.max(totalGenerations, 1)) * 100,
                );
                return (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-neutral-700 dark:text-neutral-300 truncate max-w-[150px]">
                        {item.type.replace(/_/g, " ")}
                      </span>
                      <span className="text-neutral-400">
                        {item.count} ({percent}%)
                      </span>
                    </div>
                    <div className="w-full bg-neutral-100 dark:bg-neutral-850 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-linear-to-r from-violet-500 to-indigo-500 h-full rounded-full"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Lists Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Payments logs */}
        <div className="bg-white dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-neutral-850 dark:text-neutral-200">
                Recent Invoices
              </h3>
              <p className="text-[10px] text-neutral-450 mt-0.5">
                Stripe portal log transactions feed.
              </p>
            </div>
            <Link
              href="/admin/dashboard/payments"
              className="text-[11px] font-bold text-violet-500 hover:text-violet-600 flex items-center gap-1.5"
            >
              See all logs <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-neutral-100 dark:divide-neutral-800/40">
            {recentPayments.length === 0 ? (
              <div className="text-center py-6 text-xs text-neutral-400">
                No recent payment transactions recorded.
              </div>
            ) : (
              recentPayments.map((pay: any) => (
                <div
                  key={pay.id}
                  className="flex items-center justify-between py-3"
                >
                  <div className="flex flex-col gap-0.5 text-left">
                    <span className="text-xs font-bold text-neutral-800 dark:text-neutral-250 truncate max-w-[180px]">
                      {pay.user?.name || "Anonymous"}
                    </span>
                    <span className="text-[9px] font-mono text-neutral-400">
                      ID:{" "}
                      {pay.transactionId
                        ? pay.transactionId.substring(0, 14)
                        : pay.id.substring(0, 10)}
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs font-extrabold text-neutral-850 dark:text-neutral-200">
                      ${pay.amount.toFixed(2)}
                    </span>
                    <span
                      className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                        pay.status === "SUCCESS"
                          ? "text-emerald-500 bg-emerald-500/10"
                          : "text-amber-500 bg-amber-500/10"
                      }`}
                    >
                      {pay.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent users logs */}
        <div className="bg-white dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-neutral-850 dark:text-neutral-200">
                New User Signups
              </h3>
              <p className="text-[10px] text-neutral-450 mt-0.5">
                Latest creative users joining the studio.
              </p>
            </div>
            <Link
              href="/admin/dashboard/users"
              className="text-[11px] font-bold text-violet-500 hover:text-violet-600 flex items-center gap-1.5"
            >
              Manage users <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-neutral-100 dark:divide-neutral-800/40">
            {recentUsers.length === 0 ? (
              <div className="text-center py-6 text-xs text-neutral-400">
                No user profiles logged.
              </div>
            ) : (
              recentUsers.map((user: any) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 text-white text-xs font-bold flex items-center justify-center">
                      {user.name.substring(0, 1).toUpperCase()}
                    </div>
                    <div className="flex flex-col gap-0.5 text-left">
                      <span className="text-xs font-bold text-neutral-800 dark:text-neutral-250 truncate max-w-[185px]">
                        {user.name}
                      </span>
                      <span className="text-[9px] text-neutral-450 truncate max-w-[185px]">
                        {user.email}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[9px] font-black text-neutral-450 dark:text-neutral-550">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                    <span
                      className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                        user.plan === "PRO"
                          ? "text-emerald-500 bg-emerald-500/10"
                          : "text-neutral-500 bg-neutral-100 dark:bg-neutral-850 dark:text-neutral-400"
                      }`}
                    >
                      {user.plan}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
