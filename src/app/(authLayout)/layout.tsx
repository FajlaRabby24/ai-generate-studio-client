import { JetBrains_Mono, Sora } from "next/font/google";
import React from "react";

const sora = Sora({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
  variable: "--font-sora",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jetbrains-mono",
});

import BackgroundVideo from "@/components/ui/background-video";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${sora.variable} ${jetbrainsMono.variable} relative w-full  h-screen h-[100svh] min-h-[640px] max-h-[640px]:min-h-[100svh] overflow-hidden grid grid-rows-[1fr_auto] bg-black text-white font-sans antialiased select-none [--gutter:clamp(20px,5vw,100px)]`}
      style={{ isolation: "isolate" }}
    >
      {/* Preconnect */}
      <link rel="preconnect" href="https://d8j0ntlcm91z4.cloudfront.net" />

      {/* Media Layer */}
      <div className="absolute inset-0 z-[-1] bg-black">
        {/* We use a poster/fallback image and native video tags */}
        <BackgroundVideo />
        {/* Background Poster for Reduced Motion or Video Fallback */}
      
      </div>

      {/* Scrim Overlay */}
      {/* Desktop (>=721px) */}
      <div
        className="absolute inset-0 z-[-1] pointer-events-none hidden min-[721px]:block"
        style={{
          background:
            "linear-gradient(to right, transparent 0%, transparent 45%, rgba(0,0,0,0.45) 72%, rgba(0,0,0,0.72) 100%), linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 22%, transparent 78%, rgba(0,0,0,0.65) 100%)",
        }}
      />
      {/* Mobile (<=720px) */}
      <div
        className="absolute inset-0 z-[-1] pointer-events-none hidden max-[720px]:block"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* HERO BODY (Content container) */}
      <main className="relative w-full px-[var(--gutter)] flex items-center justify-end max-[720px]:justify-center min-h-0 overflow-y-auto max-h-[640px]:py-4 no-scrollbar">
        {children}
      </main>
    </div>
  );
}
