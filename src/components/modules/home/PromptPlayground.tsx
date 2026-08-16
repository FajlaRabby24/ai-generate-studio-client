"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Copy, Check, Wand2, ArrowRight } from "lucide-react";

const presets = [
  {
    id: "cyberpunk",
    label: "Cyberpunk City",
    prompt: "Futuristic neon cyberpunk city street at rainy night, ultra-detailed 8K, unreal engine 5 render, ray tracing reflections, cinematic atmospheric lighting",
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80",
    model: "Flux 1.1 Pro",
    aspect: "16:9",
  },
  {
    id: "anime",
    label: "Anime Fantasy",
    prompt: "Ethereal anime heroine standing in floating crystal garden, Studio Ghibli inspired, soft glowing sunbeams, cherry blossom petals in wind, highly detailed digital artwork",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80",
    model: "Midjourney v6",
    aspect: "1:1",
  },
  {
    id: "portrait",
    label: "Photorealistic Portrait",
    prompt: "Studio lighting portrait of an astronaut in sleek white suit, reflections in visor, volumetric atmosphere, 35mm lens photograph, 8K ultra detail",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    model: "Photoreal v3",
    aspect: "4:3",
  },
  {
    id: "render",
    label: "3D Abstract",
    prompt: "Abstract iridescent liquid metallic ribbons floating in zero gravity, glassmorphic sphere depth, soft ambient occlusion, pastel gradient backdrop, Octane render",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80",
    model: "Octane 3D",
    aspect: "16:9",
  },
];

export function PromptPlayground() {
  const [activeTab, setActiveTab] = useState(presets[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeTab.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative w-full py-24 bg-background overflow-hidden ">

      
      {/* Right Spotlight */}
      <div className="absolute top-0 right-0 w-[80%] h-full pointer-events-none select-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#ffffff12,transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(225deg,#ffffff0d_0%,#ffffff03_35%,transparent_80%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white/80 mb-4">
          <Wand2 className="w-3.5 h-3.5 text-blue-400" />
          <span>Interactive Playground</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
          Try the AI Prompt Playground
        </h2>
        <p className="text-white/60 text-base sm:text-lg">
          Click any style preset below to see how our AI engine translates prompts into high-resolution visuals.
        </p>
      </div>

      {/* Style Presets Chips (Rounded pill dock style) */}
      <div className="flex flex-wrap justify-center gap-2 border border-gray-700/60 rounded-full p-1.5 bg-black/40 backdrop-blur-md max-w-fit mx-auto mb-12 shadow-lg">
        {presets.map((preset) => {
          const isActive = activeTab.id === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => setActiveTab(preset)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-white text-black shadow-md scale-105"
                  : "text-white/80 hover:text-white hover:bg-white/5"
              }`}
            >
              {preset.label}
            </button>
          );
        })}
      </div>

      {/* Playground Preview Card */}
      <div className="relative rounded-2xl border border-white/10 bg-[#0c0c0c]/80 backdrop-blur-md overflow-hidden p-6 md:p-8 max-w-5xl mx-auto shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
          >
            {/* Left Prompt Controls */}
            <div className="md:col-span-7 flex flex-col justify-between h-full space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-white/80">
                    Model: {activeTab.model}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/80">
                    Aspect Ratio: {activeTab.aspect}
                  </span>
                </div>
                
                <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-2.5">
                  Prompt Input Text
                </h3>
                <div className="p-4 rounded-xl bg-black/60 border border-blue-500/20 text-cyan-400 text-sm leading-relaxed font-mono relative shadow-[0_0_15px_rgba(59,130,246,0.04)]">
                  "{activeTab.prompt}"
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-white/80 hover:text-white hover:bg-white/5 text-xs font-semibold transition-all cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? "Prompt Copied!" : "Copy Prompt"}</span>
                </button>

                <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-black text-xs font-bold shadow-md hover:bg-white/90 active:scale-[0.98] transition-all cursor-pointer">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                  <span>Generate Variations</span>
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            </div>

            {/* Right Result Preview */}
            <div className="md:col-span-5 relative group">
              <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-square shadow-xl">
                <img
                  src={activeTab.image}
                  alt={activeTab.label}
                  className="w-full h-full object-cover rounded-xl transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      </div>
    </section>
  );
}
