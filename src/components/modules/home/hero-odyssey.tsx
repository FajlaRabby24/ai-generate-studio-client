"use client";

import { AnimatedBeam } from "@/components/ui/animated-beam";
import { motion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  ImageIcon,
  MessageSquare,
  Mic,
  Scissors,
  Video,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";

interface ShinyTextProps {
  text: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({ text }) => {
  return (
    <motion.span
      className="inline-block bg-clip-text text-transparent"
      style={{
        backgroundImage:
          "linear-gradient(100deg, #64CEFB 0%, #64CEFB 35%, #ffffff 50%, #64CEFB 65%, #64CEFB 100%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        color: "transparent",
      }}
      animate={{
        backgroundPosition: ["200% 0%", "-200% 0%"],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {text}
    </motion.span>
  );
};

const Circle = React.forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode; title?: string }
>(({ className, children, title }, ref) => {
  return (
    <div
      ref={ref}
      title={title}
      className={`z-10 flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95 ${className}`}
    >
      {children}
    </div>
  );
});
Circle.displayName = "Circle";

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const left1Ref = useRef<HTMLDivElement>(null);
  const left2Ref = useRef<HTMLDivElement>(null);
  const left3Ref = useRef<HTMLDivElement>(null);
  const right1Ref = useRef<HTMLDivElement>(null);
  const right2Ref = useRef<HTMLDivElement>(null);
  const right3Ref = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full  md:h-[calc(100vh-64px)] overflow-y-auto lg:overflow-hidden bg-black text-white select-none flex flex-col">
      {/* Background Loop Video */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover pointer-events-none opacity-75"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4"
        />
        {/* Scrim Overlay */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Main Content Layout (z-10) */}
      <div className="relative z-10 w-full flex-1 flex flex-col justify-between max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 lg:py-14">
        {/* Navigation spacer */}
        <div className="h-2" />

        {/* Center Hero Block */}
        <div className="flex-1 flex flex-col items-center justify-start text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-white/80 text-xs md:text-sm font-bold uppercase tracking-widest mb-3"
          >
            7 AI Tools. One Platform.
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-semibold tracking-tighter leading-[0.9] sm:leading-[0.85] flex flex-col items-center">
              Generate
            </span>
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter leading-[0.9] sm:leading-[0.85] flex flex-col items-center"
          >
            <ShinyText text="Next-Gen Content." />
          </motion.h1>

          {/* Supporting subtext */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="text-white/70 text-xs sm:text-base md:text-lg max-w-[280px] sm:max-w-xl mt-4 leading-relaxed"
          >
            Images, videos, chatbot, resume analysis, and more — all in one
            place, completely free to start.
          </motion.p>

          {/* Animated Beam Graphics Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            ref={containerRef}
            className="relative flex w-full max-w-lg md:max-w-2xl items-center justify-between gap-8 md:gap-16 px-4 py-6 mt-4 mx-auto"
          >
            {/* Left Column Nodes (Inputs) */}
            <div className="flex flex-col gap-5 md:gap-7">
              <Circle
                ref={left1Ref}
                title="Text to Image"
                className="border-blue-500/30 bg-blue-950/20 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.25)]"
              >
                <ImageIcon className="h-6 w-6 md:h-7 md:w-7" />
              </Circle>
              <Circle
                ref={left2Ref}
                title="Text to Video"
                className="border-purple-500/30 bg-purple-950/20 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:border-purple-400/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.25)]"
              >
                <Video className="h-6 w-6 md:h-7 md:w-7" />
              </Circle>
              <Circle
                ref={left3Ref}
                title="AI Chatbot"
                className="border-cyan-500/30 bg-cyan-950/20 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.25)]"
              >
                <MessageSquare className="h-6 w-6 md:h-7 md:w-7" />
              </Circle>
            </div>

            {/* Center Column Node (Studio Hub) */}
            <div className="flex flex-col items-center justify-center">
              <div
                ref={centerRef}
                className="z-10 flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full border-2 border-white bg-white text-black shadow-2xl shadow-[#3D81E3]/30 hover:scale-105 transition-transform duration-300"
              >
                <div className="flex relative h-12 w-12 md:h-17 md:w-17 items-center justify-center rounded-full bg-black/5 text-[#3D81E3]">
                  {/* <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-[#3D81E3] animate-pulse" /> */}
                  <Image
                    src="/icon.svg"
                    alt="logo"
                    fill
                    // width={100}
                    // height={100}
                    className="text-[#3D81E3] rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Right Column Nodes (Outputs) */}
            <div className="flex flex-col gap-5 md:gap-7">
              <Circle
                ref={right1Ref}
                title="Resume Analyzer"
                className="border-emerald-500/30 bg-emerald-950/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:border-emerald-400/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]"
              >
                <FileText className="h-6 w-6 md:h-7 md:w-7" />
              </Circle>
              <Circle
                ref={right2Ref}
                title="BG Remover"
                className="border-amber-500/30 bg-amber-950/20 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)] hover:border-amber-400/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.25)]"
              >
                <Scissors className="h-6 w-6 md:h-7 md:w-7" />
              </Circle>
              <Circle
                ref={right3Ref}
                title="Text to Speech"
                className="border-rose-500/30 bg-rose-950/20 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.15)] hover:border-rose-400/50 hover:shadow-[0_0_20px_rgba(244,63,94,0.25)]"
              >
                <Mic className="h-6 w-6 md:h-7 md:w-7" />
              </Circle>
            </div>

            {/* Animated Beams connecting inputs -> center -> outputs with vibrant custom paths */}
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={left1Ref}
              toRef={centerRef}
              duration={3.2}
              delay={0}
              pathColor="rgba(255,255,255,0.08)"
              pathWidth={3}
              pathOpacity={0.3}
              gradientStartColor="#3b82f6"
              gradientStopColor="#ffffff"
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={left2Ref}
              toRef={centerRef}
              duration={3.2}
              delay={0.6}
              pathColor="rgba(255,255,255,0.08)"
              pathWidth={3}
              pathOpacity={0.3}
              gradientStartColor="#a855f7"
              gradientStopColor="#ffffff"
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={left3Ref}
              toRef={centerRef}
              duration={3.2}
              delay={1.2}
              pathColor="rgba(255,255,255,0.08)"
              pathWidth={3}
              pathOpacity={0.3}
              gradientStartColor="#06b6d4"
              gradientStopColor="#ffffff"
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={centerRef}
              toRef={right1Ref}
              duration={3.6}
              delay={0.3}
              pathColor="rgba(255,255,255,0.08)"
              pathWidth={3}
              pathOpacity={0.3}
              gradientStartColor="#ffffff"
              gradientStopColor="#10b981"
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={centerRef}
              toRef={right2Ref}
              duration={3.6}
              delay={0.9}
              pathColor="rgba(255,255,255,0.08)"
              pathWidth={3}
              pathOpacity={0.3}
              gradientStartColor="#ffffff"
              gradientStopColor="#f59e0b"
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={centerRef}
              toRef={right3Ref}
              duration={3.6}
              delay={1.5}
              pathColor="rgba(255,255,255,0.08)"
              pathWidth={3}
              pathOpacity={0.3}
              gradientStartColor="#ffffff"
              gradientStopColor="#f43f5e"
            />
          </motion.div>

          {/* CTA Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-6"
          >
            <Link href="/dashboard" className="group">
              <button className="inline-flex items-center gap-2 rounded-full bg-black hover:bg-gray-900 border border-white/10 text-white font-medium text-sm md:text-base px-6 md:px-8 py-3 md:py-4 transition-all active:scale-[0.98]  cursor-pointer shadow-lg">
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
