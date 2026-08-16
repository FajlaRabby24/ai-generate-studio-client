"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Programmatically force muted and play to satisfy autoplay policies
      video.defaultMuted = true;
      video.muted = true;
      video.play().catch((err) => {
        toast.warning("Background video not supported in your browser", {
          position: "top-center",
          duration: 2000,
        });
        // // console.warn(
        //   "Autoplay failed or was blocked by browser policies:",
        //   err,
        // );
      });
    }
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        className="w-full h-full object-cover object-center block motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/auth.png"
      >
        <source src="/auth.mp4" type="video/mp4" />
      </video>
      <div
        className="absolute inset-0 bg-cover bg-center hidden motion-reduce:block"
        style={{
          backgroundImage: `url('/auth.png')`,
        }}
      />
    </>
  );
}
