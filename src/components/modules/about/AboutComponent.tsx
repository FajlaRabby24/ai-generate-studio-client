"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  FileText,
  Globe,
  Info,
  Layers,
  Image as LucideImage,
  MessageSquare,
  Scissors,
  Sparkles,
  Volume2,
  Webhook,
  Mail,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
} as any;

export default function AboutComponent() {
  return (
    <div className="min-h-screen bg-linear-to-b from-neutral-50 via-white to-neutral-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 text-neutral-900 dark:text-white pt-10 pb-16 px-6 transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto space-y-16">
        {/* 1. Page Header Block */}
        <motion.div
          className="text-center space-y-4 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-violet-500/10 text-violet-500 border border-violet-500/10 uppercase tracking-widest inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Project Overview
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-neutral-950 via-neutral-800 to-neutral-600 dark:from-white dark:via-neutral-200 dark:to-neutral-450 bg-clip-text text-transparent">
            A Full-Stack AI Integration Project
          </h1>
          <p className="text-base sm:text-lg text-neutral-500 dark:text-neutral-400 mt-2 font-medium leading-relaxed">
            AI Generate Studio is a portfolio application built to demonstrate
            clean full-stack engineering, API integrations, role-based access
            management, and structured billing simulation.
          </p>
        </motion.div>

        {/* 2. Platform Identity & Values Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Pillar 1 */}
          <div className="p-6 rounded-3xl border border-violet-500/50">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-xl bg-violet-500/10 text-violet-500">
                <Cpu className="w-6 h-6" />
              </span>
              <h4 className="text-base font-bold text-neutral-850 dark:text-neutral-200">
                API Integration Architecture
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-neutral-450 dark:text-neutral-455 mt-3 leading-relaxed">
              Integrates third-party AI endpoints (image creation, chatbot
              conversation, voice synthesis, resume parsing) into a single
              unified client-side dashboard.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 rounded-3xl border border-violet-500/50">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
                <Layers className="w-6 h-6" />
              </span>
              <h4 className="text-base font-bold text-neutral-850 dark:text-neutral-200">
                Quota Reset Middleware
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-neutral-450 dark:text-neutral-455 mt-3 leading-relaxed">
              Demonstrates daily resetting logic mapped to dynamic database
              limits. Uses background validation hooks inside middleware to
              enforce user tier access.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 rounded-3xl border border-violet-500/50">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500">
                <Info className="w-6 h-6" />
              </span>
              <h4 className="text-base font-bold text-neutral-850 dark:text-neutral-200">
                Stripe Sandbox Ledger
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-neutral-450 dark:text-neutral-455 mt-3 leading-relaxed">
              Implements e-commerce billing simulation using Stripe Webhook
              listener endpoints, subscription lifecycle mapping, and portal
              session redirection.
            </p>
          </div>
        </motion.div>

        {/* 3. Core Integration Features */}
        <motion.div
          className="space-y-8 pt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl font-black text-neutral-850 dark:text-white">
              Integrated Technical Showcase
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-450 leading-relaxed font-medium">
              This portfolio application is built to demonstrate engineering
              implementations across multiple distinct service categories:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Webhook Video */}
            <div className="p-6 rounded-3xl border border-violet-500/50">
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-xl bg-violet-500/10 text-violet-500">
                  <Webhook className="w-5 h-5" />
                </span>
                <h4 className="text-base font-bold text-neutral-850 dark:text-neutral-200">
                  Asynchronous Webhooks
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-neutral-450 dark:text-neutral-455 mt-3 leading-relaxed">
                Simulates asynchronous video generators (Text-to-Video and
                Image-to-Video) by registering webhook listener endpoints on the
                backend to dynamically notify completion status.
              </p>
            </div>

            {/* 2. Text to Image */}
            <div className="p-6 rounded-3xl border border-violet-500/50">
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500">
                  <LucideImage className="w-5 h-5" />
                </span>
                <h4 className="text-base font-bold text-neutral-850 dark:text-neutral-200">
                  Stable Diffusion Image Generation
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-neutral-450 dark:text-neutral-455 mt-3 leading-relaxed">
                Connects text prompt queries to generative art pipelines through
                Hugging Face Stable Diffusion APIs, outputting structured image
                buffers to user galleries.
              </p>
            </div>

            {/* 3. AI Chatbot */}
            <div className="p-6 rounded-3xl border border-violet-500/50">
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
                  <MessageSquare className="w-5 h-5" />
                </span>
                <h4 className="text-base font-bold text-neutral-850 dark:text-neutral-200">
                  Contextual AI Chatbot
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-neutral-455 dark:text-neutral-455 mt-3 leading-relaxed">
                Implements low-latency chat messaging powered by Google Gemini
                and Groq SDKs, rendering styled Markdown formatting and saving
                active user session logs.
              </p>
            </div>

            {/* 4. Resume Analyzer */}
            <div className="p-6 rounded-3xl border border-violet-500/50">
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500">
                  <FileText className="w-5 h-5" />
                </span>
                <h4 className="text-base font-bold text-neutral-850 dark:text-neutral-200">
                  Resume PDF Analyzer
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-neutral-455 dark:text-neutral-455 mt-3 leading-relaxed">
                Extracts raw texts from PDF file uploads using backend parsing
                utilities, evaluating technical scores and career advice using
                prompt engineering models.
              </p>
            </div>

            {/* 5. Background Remover */}
            <div className="p-6 rounded-3xl border border-violet-500/50">
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500">
                  <Scissors className="w-5 h-5" />
                </span>
                <h4 className="text-base font-bold text-neutral-850 dark:text-neutral-200">
                  Background Removal
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-neutral-455 dark:text-neutral-455 mt-3 leading-relaxed">
                Performs background segmentation from graphics using image
                modeling networks, outputting transparent PNG cutouts ready for
                download.
              </p>
            </div>

            {/* 6. Speech Synthesizer */}
            <div className="p-6 rounded-3xl border border-violet-500/50">
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
                  <Volume2 className="w-5 h-5" />
                </span>
                <h4 className="text-base font-bold text-neutral-850 dark:text-neutral-200">
                  Text-to-Speech Synth
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-neutral-455 dark:text-neutral-455 mt-3 leading-relaxed">
                Translates scripts into natural spoken audio via backend
                synthesis engines, streaming audio files dynamically to custom
                audio players on the client.
              </p>
            </div>
          </div>
        </motion.div>

        {/* 4. Meet the Founder / Creator Section (Describes the developer) */}
        <motion.div
          className="pt-8 border-t border-neutral-200 dark:border-neutral-850"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white/30 dark:bg-neutral-900/10 rounded-3xl border border-violet-500/50 p-8 sm:p-12 relative overflow-hidden flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-violet-600/5 blur-3xl" />

            {/* Founder Avatar */}
            <div className="relative shrink-0">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white p-1 shadow-xl">
                <div className="w-full relative h-full rounded-full bg-white dark:bg-neutral-950 flex items-center justify-center overflow-hidden">
                  <Image
                    src={"/profile.png"}
                    alt="Profile"
                    fill
                    sizes="100%"
                    className="object-cover rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Founder Description Text */}
            <div className="space-y-4 text-center lg:text-left flex-1 relative z-10">
              <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-violet-500/10 text-violet-500 border border-violet-500/20 inline-block">
                Software Engineer
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-850 dark:text-white">
                Fajla Rabby
              </h2>
              <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">
                
              </p>
              <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">
                I built this project to explore full-stack challenges and
                demonstrate my ability to model robust relational schemas,
                construct expressive Node.js backend controllers, build
                responsive React layouts using TypeScript, and integrate sandbox
                payment webhooks. It serves as a proof of concept for a unified
                creative tools dashboard.
              </p>

              {/* Email & Whatsapp details */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-1 text-xs text-neutral-500 dark:text-neutral-450 font-mono">
                <p
                  className="flex items-center gap-2 "
                >
                  <Mail className="w-4 h-4 text-neutral-400" />
                  fajlarabby.dev@gmail.com
                </p>
                <Link
                  href="https://wa.me/8801307495864"
                  target="_blank"
                  className="flex items-center gap-2 hover:text-emerald-500 transition-colors"
                >
                  <svg className="w-4 h-4 text-neutral-450 dark:text-neutral-400 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.729-1.465L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.45 5.556 0 10.076-4.522 10.079-10.082.002-2.693-1.047-5.224-2.953-7.13C16.59 1.48 14.062.43 11.37.43 5.815.43 1.294 4.953 1.291 10.516c-.002 1.636.43 3.226 1.251 4.633L1.586 20.16l5.06-1.006zM17.56 15.3c-.304-.152-1.8-.888-2.077-.989-.278-.1-.48-.152-.68.152-.2.304-.777.99-.95 1.193-.173.203-.347.228-.65.077-1.785-.892-2.92-1.417-3.901-3.1-2.28-3.916.143-3.693.42-4.258.127-.253.063-.48-.032-.682-.096-.2-.777-1.87-.992-2.387-.215-.503-.43-.43-.615-.43h-.53c-.185 0-.488.07-.743.348-.256.279-1 .974-1 2.375 0 1.4 1.018 2.755 1.16 2.946.14.19 2.074 3.167 5.025 4.444 2.128.921 2.92 1.028 3.966.872.637-.095 1.8-.737 2.05-1.448.25-.71.25-1.32.176-1.448-.074-.127-.278-.203-.582-.355z" />
                  </svg>
                  +8801307495864
                </Link>
              </div>

              {/* Social Links Row */}
              <div className="flex justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="https://github.com/FajlaRabby24"
                  target="_blank"
                  className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-850 dark:text-neutral-400 hover:text-neutral-800 transition-colors"
                >
                  <svg
                    className="w-4.5 h-4.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
                    />
                  </svg>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/fajlarabby24"
                  target="_blank"
                  className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-850 dark:text-neutral-400 hover:text-neutral-800 transition-colors"
                >
                  <svg
                    className="w-4.5 h-4.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </Link>
                <Link
                  href="https://fajlarabby.netlify.app"
                  target="_blank"
                  className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-850 dark:text-neutral-400 hover:text-neutral-800 transition-colors flex items-center gap-1.5 text-xs font-bold"
                >
                  <Globe className="w-4.5 h-4.5" />
                  Portfolio
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
