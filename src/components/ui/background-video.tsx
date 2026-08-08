"use client";

import React, { useEffect, useRef } from "react";

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Programmatically force muted and play to satisfy autoplay policies
      video.defaultMuted = true;
      video.muted = true;
      video.play().catch((err) => {
        console.warn("Autoplay failed or was blocked by browser policies:", err);
      });
    }
  }, []);

  return (
    <video
      ref={videoRef}
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
  );
}
