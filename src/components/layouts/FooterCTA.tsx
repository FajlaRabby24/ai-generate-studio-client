"use client";

import { motion } from "framer-motion";
import { ArrowRight, Globe, Sparkles } from "lucide-react";
import Link from "next/link";

export function FooterCTA() {
  return (
    <footer className="relative w-full z-10 overflow-hidden pt-12 pb-8 bg-background">
      {/* Right Spotlight */}
      <div className="absolute bottom-0 right-0 w-[50%] h-full pointer-events-none select-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,#ffffff12,transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(225deg,#ffffff0d_0%,#ffffff03_35%,transparent_80%)]" />
      </div>

      {/* 1. Call to Action Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-36 relative z-10">
        <div className="relative rounded-3xl overflow-hidden border border-border/60 bg-gradient-to-b from-primary/10 via-card/50 to-card/80 p-8 sm:p-12 md:p-16 text-center backdrop-blur-xl shadow-2xl">
          {/* Subtle Glow Backdrop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl rounded-full -z-10 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Start Creating Today</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-4">
              Ready to Light Up Your Future of Creation?
            </h2>

            <p className="text-muted-foreground text-base sm:text-lg mb-8 max-w-2xl mx-auto">
              Join creators generating high-resolution images, videos, chatbot
              conversations, and audio voices in seconds.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/register">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-full shadow-lg hover:shadow-primary/25 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </Link>
              <Link href="/auth/login">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3.5 bg-secondary text-secondary-foreground font-semibold rounded-full border border-border/60 hover:bg-secondary/80 backdrop-blur-sm transition-all cursor-pointer"
                >
                  Sign In to Studio
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 2. Main Footer Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-border/40">
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
                AI
              </div>
              <span className="font-extrabold text-xl tracking-tight text-foreground">
                AI Generate Studio
              </span>
            </Link>
            <p className="text-sm sm:text-base text-muted-foreground max-w-sm leading-relaxed">
              Empowering creators worldwide with next-gen AI image, video,
              chatbot, PDF parser, and speech synthesis tools inside one unified
              workspace.
            </p>

            {/* Real Social Links */}
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/FajlaRabby24"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl border border-border/60 hover:bg-secondary hover:text-foreground transition-all duration-200"
                title="GitHub Profile"
              >
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
                  />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/fajlarabby24"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl border border-border/60 hover:bg-secondary hover:text-foreground transition-all duration-200"
                title="LinkedIn Profile"
              >
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://fajlarabby.netlify.app"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl border border-border/60 hover:bg-secondary hover:text-foreground transition-all duration-200"
                title="Portfolio Website"
              >
                <Globe className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://wa.me/8801307495864"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl border border-border/60 hover:bg-secondary hover:text-emerald-500 transition-all duration-200"
                title="WhatsApp Contact"
              >
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.729-1.465L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.45 5.556 0 10.076-4.522 10.079-10.082.002-2.693-1.047-5.224-2.953-7.13C16.59 1.48 14.062.43 11.37.43 5.815.43 1.294 4.953 1.291 10.516c-.002 1.636.43 3.226 1.251 4.633L1.586 20.16l5.06-1.006zM17.56 15.3c-.304-.152-1.8-.888-2.077-.989-.278-.1-.48-.152-.68.152-.2.304-.777.99-.95 1.193-.173.203-.347.228-.65.077-1.785-.892-2.92-1.417-3.901-3.1-2.28-3.916.143-3.693.42-4.258.127-.253.063-.48-.032-.682-.096-.2-.777-1.87-.992-2.387-.215-.503-.43-.43-.615-.43h-.53c-.185 0-.488.07-.743.348-.256.279-1 .974-1 2.375 0 1.4 1.018 2.755 1.16 2.946.14.19 2.074 3.167 5.025 4.444 2.128.921 2.92 1.028 3.966.872.637-.095 1.8-.737 2.05-1.448.25-.71.25-1.32.176-1.448-.074-.127-.278-.203-.582-.355z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 1: AI Tools (Fully functional route mapping) */}
          <div>
            <h4 className="text-sm sm:text-base font-bold uppercase tracking-wider text-foreground mb-4">
              AI Tools
            </h4>
            <ul className="space-y-3 text-sm sm:text-base text-muted-foreground">
              <li>
                <Link
                  href="/dashboard/text-to-image"
                  className="hover:text-foreground transition-colors"
                >
                  Text to Image
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/text-to-video"
                  className="hover:text-foreground transition-colors"
                >
                  Text to Video
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/image-to-video"
                  className="hover:text-foreground transition-colors"
                >
                  Image to Video
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/ai-chatbot"
                  className="hover:text-foreground transition-colors"
                >
                  AI Chatbot
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/resume-analyzer"
                  className="hover:text-foreground transition-colors"
                >
                  Resume Analyzer
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Dashboard Links */}
          <div>
            <h4 className="text-sm sm:text-base font-bold uppercase tracking-wider text-foreground mb-4">
              Workspace
            </h4>
            <ul className="space-y-3 text-sm sm:text-base text-muted-foreground">
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-foreground transition-colors"
                >
                  User Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/history"
                  className="hover:text-foreground transition-colors"
                >
                  History Ledger
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/billing"
                  className="hover:text-foreground transition-colors"
                >
                  Billing & Quota
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/my-profile"
                  className="hover:text-foreground transition-colors"
                >
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company / Common Layout */}
          <div>
            <h4 className="text-sm sm:text-base font-bold uppercase tracking-wider text-foreground mb-4">
              Company
            </h4>
            <ul className="space-y-3 text-sm sm:text-base text-muted-foreground">
              <li>
                <Link
                  href="/about"
                  className="hover:text-foreground transition-colors"
                >
                  About Project
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:text-foreground transition-colors"
                >
                  Pricing Plans
                </Link>
              </li>
              <li></li>
            </ul>
          </div>
        </div>

        {/* 3. Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} AI Generate Studio. All rights
            reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>All AI Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
