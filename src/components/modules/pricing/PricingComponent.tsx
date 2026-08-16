"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";

export const PricingComponent = () => {
  const freeFeatures = [
    "5 Daily AI Generations per tool",
    "Basic Text-to-Image creation",
    "Access to standard AI Chatbot",
    "Standard rendering queues",
    "Free templates and icons",
  ];

  const monthlyFeatures = [
    "Everything in Free plan",
    "High-Fidelity Text-to-Image (Flux)",
    "Priority queues (no wait times)",
    "Resume & Code Analyzer access",
    "Advanced editing toolkits",
  ];

  const yearlyFeatures = [
    "Everything in Monthly plan",
    "Premium HD Video (Text-to-Video)",
    "Image-to-Video super-res rendering",
    "TTS & Speech-to-Text access",
    "24/7 Priority VIP support",
  ];

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
    hidden: { y: 30, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any },
    },
  } as any;

  return (
    <div className="relative w-full overflow-x-hidden bg-black text-white select-none flex flex-col justify-start">
      {/* Background Loop Video */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover pointer-events-none opacity-40"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4"
        />
        {/* Scrim Overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Giant Watermark "Pricing" Faint text */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[12rem] sm:text-[18rem] md:text-[24rem] font-black tracking-tighter text-white/[0.02] select-none uppercase">
          Pricing
        </span>
      </div>

      {/* Brand Watermark Label */}
      <div className="absolute top-10 right-10 z-0 pointer-events-none text-white/10 font-semibold text-xs tracking-widest uppercase hidden lg:block">
        AI Generate Studio
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 w-full flex-1 flex flex-col justify-center max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
        {/* Header section */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/5 border border-white/10 text-white/80"
          >
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            Pricing Plans
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight"
          >
            Choose Your Creative Tier
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/60 text-sm max-w-md mx-auto leading-relaxed"
          >
            Simple, transparent pricing engineered for creators, builders, and
            studios. Upgrade or cancel anytime.
          </motion.p>
        </div>

        {/* Pricing Cards Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto w-full items-stretch"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Card 1: Free Plan */}
          <motion.div variants={itemVariants} className="flex">
            <div className="flex flex-col justify-between p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300 w-full min-h-[500px] shadow-2xl relative">
              <div className="space-y-6">
                {/* Plan Header */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                    Starter
                  </span>
                  <h3 className="text-2xl font-bold text-white leading-none">
                    Free
                  </h3>
                  <p className="text-xs text-white/50 leading-snug">
                    For creators taking their first steps with AI.
                  </p>
                </div>

                {/* Price Details */}
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight text-white">
                    $0
                  </span>
                </div>

                <div className="h-[1px] bg-white/10" />

                {/* Bullet Features */}
                <ul className="space-y-3.5 text-xs text-white/70">
                  {freeFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5 p-0.5 bg-white/10 rounded-full border border-white/20 text-white flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Trigger */}
              <div className="pt-8 mt-auto">
                <Link href="/dashboard/billing" className="w-full flex">
                  <button className="w-full py-3 text-xs font-bold rounded-full bg-white text-black hover:bg-white/90 active:scale-[0.97] transition-all cursor-pointer shadow-md text-center flex items-center justify-center">
                    Choose Plan
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Monthly Pro Plan */}
          <motion.div variants={itemVariants} className="flex">
            <div className="flex flex-col justify-between p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300 w-full min-h-[500px] shadow-2xl relative">
              <div className="space-y-6">
                {/* Plan Header */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                    Popular
                  </span>
                  <h3 className="text-2xl font-bold text-white leading-none">
                    Monthly
                  </h3>
                  <p className="text-xs text-white/50 leading-snug">
                    For freelancers and small teams who need more freedom.
                  </p>
                </div>

                {/* Price Details */}
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight text-white">
                    $10
                  </span>
                  <span className="text-xs font-semibold text-white/50">
                    / month
                  </span>
                </div>

                <div className="h-[1px] bg-white/10" />

                {/* Bullet Features */}
                <ul className="space-y-3.5 text-xs text-white/70">
                  {monthlyFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5 p-0.5 bg-white/10 rounded-full border border-white/20 text-white flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Trigger */}
              <div className="pt-8 mt-auto">
                <Link href="/dashboard/billing" className="w-full flex">
                  <button className="w-full py-3 text-xs font-bold rounded-full bg-white text-black hover:bg-white/90 active:scale-[0.97] transition-all cursor-pointer shadow-md text-center flex items-center justify-center">
                    Choose Plan
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Yearly Pro Plan */}
          <motion.div variants={itemVariants} className="flex">
            <div className="flex flex-col justify-between p-8 rounded-3xl border border-white/15 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300 w-full min-h-[500px] shadow-2xl relative">
              {/* Best Value floating badge */}
              <div className="absolute -top-3.5 right-6 z-20 flex items-center gap-0.5 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-white text-black shadow-lg">
                Best Value (Save ~17%)
              </div>

              <div className="space-y-6">
                {/* Plan Header */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">
                    VIP Pass
                  </span>
                  <h3 className="text-2xl font-bold text-white leading-none">
                    Yearly
                  </h3>
                  <p className="text-xs text-white/50 leading-snug">
                    Uncompromised power with cinematic HD Video.
                  </p>
                </div>

                {/* Price Details */}
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight text-white bg-gradient-to-r from-blue-400 to-[#64CEFB] bg-clip-text text-transparent">
                    $99.99
                  </span>
                  <span className="text-xs font-semibold text-white/50">
                    / year
                  </span>
                </div>

                <div className="h-[1px] bg-white/10" />

                {/* Bullet Features */}
                <ul className="space-y-3.5 text-xs text-white/70">
                  {yearlyFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-0.5 p-0.5 bg-blue-500/20 rounded-full border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="leading-tight font-medium">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Trigger */}
              <div className="pt-8 mt-auto">
                <Link href="/dashboard/billing" className="w-full flex">
                  <button className="w-full py-3 text-xs font-bold rounded-full bg-white text-black hover:bg-white/90 active:scale-[0.97] transition-all cursor-pointer shadow-md text-center flex items-center justify-center">
                    Choose Plan
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingComponent;
