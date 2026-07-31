"use client";

import { Button } from "@/components/ui/button";
import { MagicCard } from "@/components/ui/magic-card";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { motion } from "framer-motion";
import { Check, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const PricingComponent = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  const monthlyFeatures = [
    "5 Daily AI Generations per tool",
    "High-Fidelity Text-to-Image",
    "Priority queues (no wait times)",
    "Unlimited AI Chatbot conversation",
    "Resume & Code Analyzer access",
  ];

  const yearlyFeatures = [
    "Everything in Monthly plan",
    "Premium HD Video (Text-to-Video)",
    "Image-to-Video super-res rendering",
    "TTS & Speech-to-Text access",
    "24/7 Priority VIP support",
  ];

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  } as any;

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
  } as any;

  return (
    <div className="py-4 md:py-8 px-4 max-w-5xl mx-auto text-neutral-900 dark:text-white transition-colors duration-300">
      {/* Header section */}
      <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
          <Sparkles className="h-3 w-3" />
          Pricing Plans
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-neutral-950 via-neutral-750 to-neutral-500 dark:from-white dark:via-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent">
          Simple, Transparent Pricing
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
          Choose the creative tier that fits your flow. Upgrade anytime to
          unlock premium video outputs and higher quotas.
        </p>
      </div>

      {/* Cards container */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto items-stretch"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Card 1: Monthly Plan */}
        <motion.div variants={itemVariants} className="flex">
          <MagicCard
            className="flex flex-col justify-between p-8 bg-white dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-md dark:shadow-none hover:border-neutral-300 dark:hover:border-neutral-750 transition-all duration-300 w-full min-h-[450px]"
            gradientColor={
              isDark ? "rgba(139, 92, 246, 0.05)" : "rgba(124, 58, 237, 0.03)"
            }
          >
            <div className="space-y-4">
              {/* Plan Header */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                  Starter Pack
                </span>
                <h3 className="text-xl font-bold text-neutral-800 dark:text-white leading-none">
                  Monthly Pro
                </h3>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-450 leading-snug">
                  Perfect for creators starting their AI journey.
                </p>
              </div>

              {/* Price Details */}
              <div className="flex items-baseline gap-1">
                <span className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-850 dark:text-white">
                  $10
                </span>
                <span className="text-xs font-semibold text-neutral-500">
                  / month
                </span>
              </div>

              <div className="h-[1px] bg-neutral-100 dark:bg-neutral-800/80" />

              {/* Bullet Features */}
              <ul className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-300">
                {monthlyFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <div className="mt-0.5 p-0.5 bg-neutral-100 dark:bg-neutral-800 rounded-full border border-neutral-200 dark:border-neutral-750 text-violet-500 dark:text-violet-400 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3" />
                    </div>
                    <span className="leading-tight text-">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Trigger */}
            <div className="pt-6 mt-auto">
              <Button
                variant="ghost"
                className="w-full py-2.5 text-xs font-semibold rounded-xl text-neutral-700 hover:text-white dark:text-neutral-300 dark:hover:text-white border border-neutral-200 dark:border-neutral-800 hover:bg-violet-600 dark:hover:bg-violet-600 transition-all duration-300 cursor-pointer"
              >
                Choose Monthly Pro
              </Button>
            </div>
          </MagicCard>
        </motion.div>

        {/* Card 2: Yearly Plan (Featured) */}
        <motion.div variants={itemVariants} className="flex relative">
          {/* Best Value floating badge */}
          <div className="absolute -top-3 right-5 z-20 flex items-center gap-0.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-sm shadow-violet-500/10">
            <Zap className="h-2.5 w-2.5 fill-white" />
            Best Value (Save ~17%)
          </div>

          <MagicCard
            className="flex flex-col justify-between p-8 bg-white dark:bg-neutral-900/40 border border-violet-500/30 dark:border-violet-500/20 rounded-2xl shadow-lg dark:shadow-none hover:border-violet-500/50 dark:hover:border-violet-500/40 transition-all duration-300 w-full relative min-h-[450px]"
            gradientColor={
              isDark ? "rgba(139, 92, 246, 0.08)" : "rgba(124, 58, 237, 0.04)"
            }
          >
            <div className="space-y-4">
              {/* Plan Header */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400 flex items-center gap-0.5">
                  <ShieldCheck className="h-3 w-3" /> Premium Access
                </span>
                <h3 className="text-xl font-bold text-neutral-850 dark:text-white leading-none">
                  Yearly Pro
                </h3>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-450 leading-snug">
                  Uncompromised power with HD Video outputs.
                </p>
              </div>

              {/* Price Details */}
              <div className="flex items-baseline gap-1">
                <span className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-850 dark:text-white bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  $99.99
                </span>
                <span className="text-xs font-semibold text-neutral-500">
                  / year
                </span>
              </div>

              <div className="h-[1px] bg-neutral-100 dark:bg-neutral-800/80" />

              {/* Bullet Features */}
              <ul className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-300">
                {yearlyFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <div className="mt-0.5 p-0.5 bg-violet-500/10 rounded-full border border-violet-500/20 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3" />
                    </div>
                    <span className="leading-tight font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Trigger */}
            <div className="pt-6 mt-auto">
              <ShimmerButton
                shimmerColor={isDark ? "#8b5cf6" : "#ffffff"}
                background={
                  isDark
                    ? "linear-gradient(to right, #6d28d9, #7c3aed)"
                    : "linear-gradient(to right, #4f46e5, #6366f1)"
                }
                className="w-full py-2.5 text-xs font-semibold rounded-xl text-center shadow-md shadow-violet-500/5 hover:shadow-violet-500/15 transition-all duration-300"
              >
                Choose Yearly Pro
              </ShimmerButton>
            </div>
          </MagicCard>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PricingComponent;
