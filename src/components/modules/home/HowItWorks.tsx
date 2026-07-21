"use client";

import React from "react";
import { motion } from "framer-motion";
import { Type, Cpu, Download, ArrowRight, Sparkles } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Type Your Prompt",
    subtitle: "Natural Language Input",
    description: "Describe your creative vision in natural text, or select from built-in style presets and prompt enhancers.",
    icon: Type,
    gradient: "from-blue-500 to-cyan-500",
    glow: "group-hover:shadow-blue-500/20",
    badge: "Step 1",
  },
  {
    step: "02",
    title: "Choose AI Engine",
    subtitle: "Flux, Sora & VoiceGen",
    description: "Select from 10+ state-of-the-art AI engines tailored for high-resolution images, 4K videos, or human voiceovers.",
    icon: Cpu,
    gradient: "from-purple-500 to-pink-500",
    glow: "group-hover:shadow-purple-500/20",
    badge: "Step 2",
  },
  {
    step: "03",
    title: "Export & Upscale",
    description: "Download ultra-high resolution 4K images, uncompressed audio, or video files with 100% commercial usage rights.",
    subtitle: "Instant 4K Download",
    icon: Download,
    gradient: "from-emerald-500 to-teal-500",
    glow: "group-hover:shadow-emerald-500/20",
    badge: "Step 3",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto relative z-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Simple 3-Step Process</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
          From Prompt to Masterpiece in Seconds
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg">
          Our intelligent studio engine handles all technical rendering so you can focus purely on imagination.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {steps.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`group relative p-8 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-md flex flex-col justify-between transition-all duration-300 hover:border-primary/50 hover:-translate-y-1.5 shadow-lg ${item.glow}`}
            >
              <div>
                {/* Top Badge & Number */}
                <div className="flex items-center justify-between mb-8">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${item.gradient} text-white shadow-md`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-4xl font-extrabold text-muted-foreground/30 font-mono">
                    {item.step}
                  </span>
                </div>

                {/* Content */}
                <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-1 block">
                  {item.badge} • {item.subtitle}
                </span>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center text-xs font-semibold text-foreground group-hover:text-primary transition-colors gap-1.5 pt-4 border-t border-border/40">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
