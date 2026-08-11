"use client";

import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 text-center">
      {/* Animated Cross/Alert Icon */}
      <div className="relative mb-6">
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: [0, 1.2, 1], rotate: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 w-24 h-24 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 text-amber-500 shadow-lg shadow-amber-500/10"
        >
          <AlertCircle className="w-12 h-12 stroke-[2.5]" />
        </motion.div>
        {/* Pulsing Backglows */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.4, opacity: [0, 0.3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl pointer-events-none"
        />
      </div>

      {/* Texts */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="space-y-3 max-w-md"
      >
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full uppercase tracking-wider w-fit mx-auto">
          Transaction Cancelled
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-linear-to-r from-neutral-950 via-neutral-850 to-neutral-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent">
          Payment Cancelled
        </h1>
        <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400">
          The Stripe payment process was cancelled by the user. No charges were
          made to your card, and your plan remains unchanged.
        </p>
      </motion.div>

      {/* Help Box */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="w-full max-w-sm mt-8 p-6 bg-white dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 rounded-3xl space-y-4 shadow-sm"
      >
        <div className="flex items-center gap-3 text-left">
          <HelpCircle className="w-5 h-5 text-violet-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-neutral-850 dark:text-neutral-100">
              Need assistance?
            </h4>
            <p className="text-[10px] text-neutral-400 mt-0.5 leading-relaxed">
              If you encountered payment gateway issues or need help setting up
              cards, reach out to our client support desk.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-sm"
      >
        <Link href="/dashboard/billing" className="flex-grow">
          <button className="w-full rounded-xl bg-violet-600 hover:bg-violet-750 text-white font-bold text-sm py-3 shadow-md hover:shadow-violet-600/25 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer">
            <ArrowLeft className="w-4 h-4" /> Return to Billing
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
