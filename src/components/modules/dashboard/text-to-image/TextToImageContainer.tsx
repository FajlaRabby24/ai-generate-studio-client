"use client";

import { Button } from "@/components/ui/button";
import { GenerationStatus, GenerationType } from "@/config/constant";
import {
  generateTextToImageService,
  getRecentGenerationServiceTextToImage,
  IGenerateTextToImagePayload,
} from "@/services/dashboard/text-to-image/text-to-image.service";
import { ITextToImageResponse } from "@/types/dashboard.types";
import { handleDownload } from "@/utils/handleDownload";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Clock,
  Download,
  History,
  Image as ImageIcon,
  Maximize2,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export function TextToImageContainer() {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: recentRes, isLoading: isLoadingHistory } = useQuery({
    queryKey: ["recentTextToImage"],
    queryFn: getRecentGenerationServiceTextToImage,
  });

  const recentGenerations = recentRes?.data;
  const allImages = recentGenerations?.flatMap((gen) => gen.textToImages) || [];

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: IGenerateTextToImagePayload) =>
      generateTextToImageService(payload),
  });

  // Handle Image Generation Request
  const handleGenerate = async () => {
    setValidationError(null);

    // Prepare payload automatically selecting GenerationType.TEXT_TO_IMAGE
    const payload: IGenerateTextToImagePayload = {
      prompt,
      type: GenerationType.TEXT_TO_IMAGE,
    };

    if (!prompt.trim()) {
      toast.error("Prompt cannot be empty");
      return;
    }

    try {
      const res = await mutateAsync(payload);
      // // console.log("response from mutate", res);
      if (res?.success) {
        if (res?.data?.imageUrl) {
          setGeneratedImage(res.data.imageUrl);
        }
        queryClient.invalidateQueries({ queryKey: ["recentTextToImage"] });
        toast.success("Image generated successfully!");
      } else {
        // // console.log("text to image response", res);
        toast.error(res?.message || "Failed to generate image");
      }
    } catch (err: any) {
      // // console.log("text to image response Error", err);
      toast.error(err?.message || "Failed to process text to image request");
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
                  <Image
                    src={generatedImage}
                    alt="AI Generated Output"
                    width={500}
                    height={500}
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
                    <Button
                      onClick={() =>
                        handleDownload(generatedImage, "ai-generated-image.jpg")
                      }
                      className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11 flex items-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer animate-in fade-in zoom-in duration-300"
                    >
                      <Download className="w-4 h-4" /> Download
                    </Button>
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
                      Generate Image
                    </span>{" "}
                    to generate your first 8K AI artwork.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* History/Gallery Grid */}
      <div className="mt-8 space-y-6 pt-6 border-t border-border/40">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
            <History className="w-5 h-5 text-muted-foreground" />
            Recent Generations
          </h3>
        </div>

        {isLoadingHistory ? (
          <div className="flex flex-col items-center justify-center p-12 border border-dashed border-border/60 rounded-3xl bg-card/20">
            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
            <p className="text-muted-foreground text-center">
              Loading recent generations...
            </p>
          </div>
        ) : !recentGenerations || allImages.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 border border-dashed border-border/60 rounded-3xl bg-card/20">
            <History className="w-12 h-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground text-center">
              No recent generations to display.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allImages.map((imageRecord: ITextToImageResponse) => {
              const isCompleted =
                imageRecord.status === GenerationStatus.COMPLETED &&
                imageRecord.outputUrl;

              return (
                <div
                  key={imageRecord.id}
                  className="group relative rounded-2xl overflow-hidden border border-border/40 bg-card/40 backdrop-blur-sm transition-all hover:shadow-xl hover:border-primary/30 flex flex-col"
                >
                  {isCompleted ? (
                    <>
                      <div className="aspect-square relative overflow-hidden bg-black/5">
                        <Image
                          src={imageRecord.outputUrl}
                          alt={imageRecord.prompt}
                          width={500}
                          height={500}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 pointer-events-none bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                        <div className="absolute top-2 right-2 flex items-center gap-4  ">
                          <Link
                            href={imageRecord.outputUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-primary transition-colors bg-black/50 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity rounded-full p-1.5 z-20"
                          >
                            <Maximize2 className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() =>
                              handleDownload(
                                imageRecord.outputUrl,
                                `ai-image-${imageRecord.id}.jpg`,
                              )
                            }
                            className="text-white hover:text-primary bg-black/50 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity rounded-full p-1.5 z-20 cursor-pointer"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col h-full border border-dashed border-primary/30 rounded-2xl bg-primary/5">
                      <div className="aspect-square relative overflow-hidden flex flex-col items-center justify-center p-6 text-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-2 animate-pulse">
                          <Clock className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-sm font-bold text-primary">
                          Generating...
                        </span>
                      </div>
                      <div className="p-4 border-t border-primary/20 bg-primary/10 flex-1">
                        <p className="text-xs text-foreground/80 line-clamp-3 leading-relaxed italic">
                          "{imageRecord.prompt}"
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
