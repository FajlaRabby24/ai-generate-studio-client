"use client";

import React from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon, Video, Mic, Bot, Sparkles, ArrowRight } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";
import { useTheme } from "next-themes";

const tools = [
  {
    id: "image",
    title: "Text to Image",
    subtitle: "High Resolution & Flux Models",
    description: "Transform your text prompts into hyper-realistic 8K digital artwork and studio quality photography in seconds.",
    icon: ImageIcon,
    badge: "Popular",
    gradientFrom: "#3B82F6",
    gradientTo: "#06B6D4",
    accent: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  },
  {
    id: "video",
    title: "Text to Video",
    subtitle: "4K Cinematic Motion",
    description: "Generate fluid, high-frame-rate video clips with natural lighting, camera movements, and photorealistic dynamics.",
    icon: Video,
    badge: "Pro Engine",
    gradientFrom: "#A855F7",
    gradientTo: "#EC4899",
    accent: "text-purple-500 bg-purple-500/10 border-purple-500/20",
  },
  {
    id: "voice",
    title: "AI Voiceover",
    subtitle: "Natural Human Speech",
    description: "Synthesize lifelike voiceovers in 40+ languages with emotion control, pitch tuning, and instant audio download.",
    icon: Mic,
    badge: "Ultra Fast",
    gradientFrom: "#10B981",
    gradientTo: "#14B8A6",
    accent: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    id: "assistant",
    title: "Smart AI Assistant",
    subtitle: "Creative Writing & Code",
    description: "Chat with advanced LLM models tailored for storyboarding, scriptwriting, prompt optimization, and technical tasks.",
    icon: Bot,
    badge: "GPT-4o & Claude",
    gradientFrom: "#F59E0B",
    gradientTo: "#F97316",
    accent: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  },
];

export function ToolsSuite() {
  const { theme } = useTheme();

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Complete AI Creation Suite</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
          Everything You Need to Create Without Limits
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg">
          Explore powerful AI tools engineered for creators, designers, marketers, and developers.
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
                className="cursor-pointer flex flex-col justify-between p-8 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 shadow-lg"
                gradientColor={theme === "dark" ? "#262626" : "#E5E7EB"}
                gradientFrom={tool.gradientFrom}
                gradientTo={tool.gradientTo}
                gradientSize={250}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3.5 rounded-xl border ${tool.accent}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-secondary text-secondary-foreground border border-border/40">
                      {tool.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {tool.title}
                  </h3>
                  <p className="text-xs font-medium text-muted-foreground/80 mb-3">
                    {tool.subtitle}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {tool.description}
                  </p>
                </div>

                <div className="flex items-center text-xs font-semibold text-foreground hover:text-primary transition-colors gap-1.5 pt-4 border-t border-border/40">
                  <span>Explore {tool.title}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </MagicCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
