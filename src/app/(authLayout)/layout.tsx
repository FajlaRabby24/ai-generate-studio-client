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
        <video
          className="w-full h-full object-cover object-center block motion-reduce:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260806_132328_5f9029c8-218f-4489-82b6-29ff2849920e.png"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260806_133255_956f653f-5d80-4b06-abd5-0f46c98b60fa.mp4"
            type="video/mp4"
          />
        </video>
        {/* Background Poster for Reduced Motion or Video Fallback */}
        <div
          className="absolute inset-0 bg-cover bg-center hidden motion-reduce:block"
          style={{
            backgroundImage: `url('https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260806_132328_5f9029c8-218f-4489-82b6-29ff2849920e.png')`,
          }}
        />
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
