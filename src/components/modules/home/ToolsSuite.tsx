"use client";

import { MagicCard } from "@/components/ui/magic-card";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Image as ImageIcon,
  Mic,
  Sparkles,
  Video,
} from "lucide-react";

const tools = [
  {
    id: "image",
    title: "Text to Image",
    subtitle: "High Resolution & Flux Models",
    description:
      "Transform your text prompts into hyper-realistic 8K digital artwork and studio quality photography in seconds.",
    icon: ImageIcon,
    badge: "Popular",
    gradientFrom: "#3B82F6",
    gradientTo: "#06B6D4",
    accent:
      "text-blue-400 bg-blue-950/20 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]",
    cardGlow:
      "hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.12)]",
  },
  {
    id: "video",
    title: "Text to Video",
    subtitle: "4K Cinematic Motion",
    description:
      "Generate fluid, high-frame-rate video clips with natural lighting, camera movements, and photorealistic dynamics.",
    icon: Video,
    badge: "Pro Engine",
    gradientFrom: "#A855F7",
    gradientTo: "#EC4899",
    accent:
      "text-purple-400 bg-purple-950/20 border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]",
    cardGlow:
      "hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.12)]",
  },
  {
    id: "voice",
    title: "AI Voiceover",
    subtitle: "Natural Human Speech",
    description:
      "Synthesize lifelike voiceovers in 40+ languages with emotion control, pitch tuning, and instant audio download.",
    icon: Mic,
    badge: "Ultra Fast",
    gradientFrom: "#10B981",
    gradientTo: "#14B8A6",
    accent:
      "text-emerald-400 bg-emerald-950/20 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]",
    cardGlow:
      "hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.12)]",
  },
  {
    id: "assistant",
    title: "Smart AI Assistant",
    subtitle: "Creative Writing & Code",
    description:
      "Chat with advanced LLM models tailored for storyboarding, scriptwriting, prompt optimization, and technical tasks.",
    icon: Bot,
    badge: "GPT-4o & Claude",
    gradientFrom: "#F59E0B",
    gradientTo: "#F97316",
    accent:
      "text-amber-400 bg-amber-950/20 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.15)]",
    cardGlow:
      "hover:border-amber-500/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.12)]",
  },
];

export function ToolsSuite() {
  return (
    <section className="relative w-full py-24 bg-background overflow-hidden">
      {/* Side Spotlight Beams (Framing Gradients as in reference image) */}
      {/* Left Spotlight */}
   
      
      {/* Right Spotlight */}
      <div className="absolute top-0 right-0 w-[80%] h-full pointer-events-none select-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#ffffff12,transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(225deg,#ffffff0d_0%,#ffffff03_35%,transparent_80%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white/80 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Complete AI Creation Suite</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
            Everything You Need to Create
          </h2>
          <p className="text-white/60 text-base sm:text-lg">
            Explore powerful AI tools engineered for creators, designers,
            marketers, and developers.
          </p>
        </div>

      {/* Cards Grid with MagicCard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <MagicCard
                className={`cursor-pointer flex flex-col justify-between p-8 rounded-2xl border border-white/5 bg-[#0c0c0c]/80 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 shadow-xl ${tool.cardGlow}`}
                gradientColor="#1a1a1a"
                gradientFrom={tool.gradientFrom}
                gradientTo={tool.gradientTo}
                gradientSize={250}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`p-3 md:p-3.5 rounded-full border ${tool.accent}`}
                    >
                      <Icon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full bg-white/5 text-white/80 border border-white/10">
                      {tool.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1">
                    {tool.title}
                  </h3>
                  <p className="text-xs font-medium text-white/50 mb-3">
                    {tool.subtitle}
                  </p>
                  <p className="text-white/70 text-sm leading-relaxed mb-6">
                    {tool.description}
                  </p>
                </div>

                <div className="flex items-center text-xs font-semibold text-white/80 hover:text-white transition-colors gap-1.5 pt-4 border-t border-white/10 group">
                  <span>Explore {tool.title}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </MagicCard>
            </motion.div>
          );
        })}
      </div>
      </div>
    </section>
  );
}
