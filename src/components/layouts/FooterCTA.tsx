"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Globe,
  MessageSquare,
  Share2,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export function FooterCTA() {
  return (
    <footer className="relative z-10 overflow-hidden pt-12 pb-8 bg-background border-t border-border/40">
      {/* 1. Call to Action Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-44">
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
              Join over 50,000+ creators, designers, and teams generating
              high-resolution images, videos, and voiceovers in seconds.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/register">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-full shadow-lg hover:shadow-primary/25 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </Link>
              <Link href="/auth/login">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              voice, and assistant tools inside one unified workspace.
            </p>
            <div className="flex items-center gap-3 text-muted-foreground">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full hover:bg-secondary hover:text-foreground transition-colors"
              >
                <Globe className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full hover:bg-secondary hover:text-foreground transition-colors"
              >
                <Globe className="w-5 h-5" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full hover:bg-secondary hover:text-foreground transition-colors"
              >
                <MessageSquare className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full hover:bg-secondary hover:text-foreground transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 1: Products */}
          <div>
            <h4 className="text-sm sm:text-base font-bold uppercase tracking-wider text-foreground mb-4">
              AI Tools
            </h4>
            <ul className="space-y-3 text-sm sm:text-base text-muted-foreground">
              <li>
                <Link
                  href="/"
                  className="hover:text-foreground transition-colors"
                >
                  Text to Image
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-foreground transition-colors"
                >
                  Text to Video
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-foreground transition-colors"
                >
                  AI Voiceover
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-foreground transition-colors"
                >
                  Smart Assistant
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div>
            <h4 className="text-sm sm:text-base font-bold uppercase tracking-wider text-foreground mb-4">
              Resources
            </h4>
            <ul className="space-y-3 text-sm sm:text-base text-muted-foreground">
              <li>
                <Link
                  href="/"
                  className="hover:text-foreground transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-foreground transition-colors"
                >
                  API Reference
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-foreground transition-colors"
                >
                  Prompt Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-foreground transition-colors"
                >
                  Community Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-sm sm:text-base font-bold uppercase tracking-wider text-foreground mb-4">
              Company
            </h4>
            <ul className="space-y-3 text-sm sm:text-base text-muted-foreground">
              <li>
                <Link
                  href="/"
                  className="hover:text-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-foreground transition-colors"
                >
                  Contact Support
                </Link>
              </li>
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
