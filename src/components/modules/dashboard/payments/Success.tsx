"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 text-center">
      {/* Animated Checkmark and Glow */}
      <div className="relative mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-500 shadow-lg shadow-emerald-500/10"
        >
          <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
        </motion.div>
        {/* Pulsing Backglows */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.4, opacity: [0, 0.4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl pointer-events-none"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.8, opacity: [0, 0.2, 0] }}
          transition={{
            duration: 1.8,
            delay: 0.6,
            repeat: Infinity,
            ease: "easeOut",
          }}
          className="absolute inset-0 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"
        />
      </div>

      {/* Texts */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="space-y-3 max-w-md"
      >
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full uppercase tracking-wider w-fit mx-auto">
          <Sparkles className="w-3 h-3" /> Upgrade Successful
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-linear-to-r from-neutral-950 via-neutral-850 to-neutral-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent">
          Welcome to Pro Creator!
        </h1>
        <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400">
          Your payment has been successfully processed. Your creative limits
          have been upgraded, and your workspace is fully unlocked.
        </p>
      </motion.div>

      {/* Details Box */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="w-full max-w-sm mt-8 p-6 bg-white dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 rounded-3xl space-y-4 shadow-sm"
      >
        <div className="flex items-center justify-between text-xs border-b border-neutral-100 dark:border-neutral-800/80 pb-3">
          <span className="text-neutral-400 font-semibold">Tier Status</span>
          <span className="font-bold text-emerald-500">ACTIVE PRO</span>
        </div>
        <div className="flex items-center justify-between text-xs border-b border-neutral-100 dark:border-neutral-800/80 pb-3">
          <span className="text-neutral-400 font-semibold">
            Billing Frequency
          </span>
          <span className="font-bold text-neutral-800 dark:text-neutral-200">
            Automatically Syncing
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-neutral-400 dark:text-neutral-500 justify-center">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          Secured Checkout via Stripe
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-sm"
      >
        <Link href="/dashboard" className="flex-1">
          <button className="w-full rounded-xl bg-violet-600 hover:bg-violet-750 text-white font-bold text-sm py-3 shadow-md hover:shadow-violet-600/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer">
            Go to Dashboard <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
        <Link href="/dashboard/billing" className="flex-1">
          <button className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 font-bold text-sm py-3 transition duration-200 cursor-pointer">
            View Billing Settings
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
