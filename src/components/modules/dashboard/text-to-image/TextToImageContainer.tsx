"use client";

import { GenerationType } from "@/config/constant";
import {
  generateTextToImageService,
  getGenerationLeftCountService,
  IGenerateTextToImagePayload,
} from "@/services/dashboard/text-to-image/text-to-image.service";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Download,
  Image as ImageIcon,
  Maximize2,
  RefreshCw,
  Sparkles,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

export function TextToImageContainer() {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [remainingCredits, setRemainingCredits] = useState<number | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: IGenerateTextToImagePayload) =>
      generateTextToImageService(payload),
  });

  const { mutateAsync: fetchGenerationCount } = useMutation({
    mutationFn: (generationType: GenerationType) =>
      getGenerationLeftCountService(generationType),
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchGenerationCount(GenerationType.TEXT_TO_IMAGE);
        if (res?.success && res.data) {
          setRemainingCredits(res.data.textToImage ?? 0);
        }
      } catch (err) {
        console.error("Failed to load remaining credits", err);
      }
    })();
  }, [fetchGenerationCount, generatedImage]);

  // Handle Image Generation Request
  const handleGenerate = async () => {
    setValidationError(null);

    // Prepare payload automatically selecting GenerationType.TEXT_TO_IMAGE
    const payload: IGenerateTextToImagePayload = {
      prompt,
      type: GenerationType.TEXT_TO_IMAGE,
    };

    try {
      const res = await mutateAsync(payload);
      if (res?.success) {
        if (res?.data?.imageUrl) {
          setGeneratedImage(res.data.imageUrl);
        }
        setRemainingCredits(res?.data?.creditRemainig || null);
      } else {
        setValidationError(
          res?.message || "Failed to generate image. Please try again.",
        );
      }
    } catch (err: any) {
      setValidationError(
        err?.message || "Failed to process text to image request",
      );
    }
  };

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 max-w-7xl mx-auto">
      {/* Top Title & Header Status */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
              Text to Image Studio
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
              FLUX.1-schnell
            </span>
          </div>
          <p className="text-muted-foreground text-sm">
            Generate ultra-realistic 8K digital artwork using Black Forest Labs
            AI engine.
          </p>
        </div>

        {/* Credits Counter Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-card border border-border/60 text-xs font-semibold text-foreground shadow-sm">
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{remainingCredits} Generations Left</span>
          </div>
        </div>
      </div>

      {/* Validation Error Alert */}
      {validationError && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Studio Workspace Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Input Panel (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-md shadow-xl space-y-6">
            {/* Prompt Input Box */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Prompt Description <span className="text-red-500">*</span>
                </label>
              </div>

              <div className="relative">
                <textarea
                  rows={6}
                  value={prompt}
                  onChange={(e) => {
                    setPrompt(e.target.value);
                    if (validationError) setValidationError(null);
                  }}
                  placeholder="Describe what you want to create in detail... (e.g. A futuristic samurai overlooking a rainy neon city at twilight)"
                  className="w-full p-4 rounded-xl bg-background border border-border/60 focus:border-primary focus:ring-1 focus:ring-primary text-foreground text-sm placeholder:text-muted-foreground/60 resize-none outline-none transition-all"
                />
                {prompt && (
                  <button
                    onClick={() => setPrompt("")}
                    className="absolute top-3 right-3 text-muted-foreground hover:text-foreground text-xs p-1 cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Generate Action Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGenerate}
              disabled={isPending}
              className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg hover:shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {isPending ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Pixels...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Image (1 Credit)</span>
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* Right Column: Result & Preview Display Canvas (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="flex-1 min-h-[440px] p-6 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-md shadow-xl flex flex-col items-center justify-center relative overflow-hidden">
            {isPending ? (
              /* Generating Loader State */
              <div className="flex flex-col items-center text-center space-y-4 p-8">
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                  <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground mb-1">
                    Generating Your AI Image
                  </h3>
                  <p className="text-xs text-muted-foreground max-w-sm">
                    FLUX.1-schnell model is executing 5 inference steps...
                  </p>
                </div>
              </div>
            ) : generatedImage ? (
              /* Generated Result Display State */
              <div className="w-full h-full flex flex-col justify-between space-y-4">
                <div className="relative w-full aspect-square md:aspect-[4/3] rounded-xl overflow-hidden border border-border/60 shadow-lg group">
                  <img
                    src={generatedImage}
                    alt="AI Generated Output"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-xs">
                    <a
                      href={generatedImage}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-colors"
                    >
                      <Maximize2 className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Result Control Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <a
                      href={generatedImage}
                      download="ai-generated-image.jpg"
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center gap-1.5 shadow-md hover:shadow-primary/25 transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              /* Initial Empty Canvas State */
              <div className="flex flex-col items-center text-center p-8 text-muted-foreground space-y-4">
                <div className="p-5 rounded-full bg-primary/10 border border-primary/20 text-primary">
                  <ImageIcon className="w-10 h-10" />
                </div>
                <div className="max-w-md space-y-1">
                  <h3 className="text-base font-bold text-foreground">
                    Your Canvas is Empty
                  </h3>
                  <p className="text-xs leading-relaxed">
                    Type a prompt on the left panel or click{" "}
                    <span className="font-semibold text-primary">
                      AI Enhance
                    </span>{" "}
                    to generate your first 8K AI artwork.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
