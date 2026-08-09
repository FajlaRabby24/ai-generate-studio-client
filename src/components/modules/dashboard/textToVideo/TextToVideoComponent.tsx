"use client";

import { Button } from "@/components/ui/button";
import { MagicCard } from "@/components/ui/magic-card";
import { Sparkles, Video, Wand2, History, Settings2, Download, Clock, Play } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { textToVideoService, getRecentGenerationService } from "@/services/dashboard/text-to-video/textToVideo.service";
import { GenerationStatus, GenerationType } from "@/config/constant";

const TextToVideoComponent = () => {
  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState<"16:9" | "9:16">("16:9");
  const queryClient = useQueryClient();

  const { data: recentRes, isLoading: isLoadingHistory } = useQuery({
    queryKey: ["recentTextToVideo"],
    queryFn: getRecentGenerationService,
  });
  
  const recentGenerations = recentRes?.data || [];

  const { mutateAsync: generateVideo, isPending } = useMutation({
    mutationFn: textToVideoService,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success("Video generation started! Please wait for it to process.");
        setPrompt("");
        // Invalidate query to refetch pending items
        queryClient.invalidateQueries({ queryKey: ["recentTextToVideo"] });
      } else {
        toast.error(data?.message || "Something went wrong.");
      }
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to generate video.");
    },
  });

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    await generateVideo({
      prompt: prompt.trim(),
      aspectRatio,
      type: GenerationType.TEXT_TO_VIDEO,
    });
  };

  return (
    <div className="flex-1 flex flex-col p-4 md:p-8 max-w-6xl mx-auto w-full gap-8">
      {/* Header */}
      <div className="flex flex-col items-center justify-center text-center gap-3 shrink-0 pt-4">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 border border-primary/20 mb-2">
          <Video className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
          Text to Video AI
          <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary align-middle uppercase tracking-widest">
            Beta
          </span>
        </h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
          Transform your imagination into stunning videos. Just type a prompt, and our AI will start crafting your video in the background.
        </p>
      </div>

      {/* Input Area */}
      <div className="flex justify-center w-full">
        <MagicCard
          mode="gradient"
          gradientColor="rgba(124, 58, 237, 0.05)"
          className="w-full max-w-3xl p-1 rounded-3xl border border-border/40 bg-card/10 backdrop-blur-md shadow-2xl"
        >
          <div className="p-6 md:p-8 flex flex-col gap-6">
            <div className="space-y-4">
              <label className="text-base font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Describe your vision
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="E.g., A cinematic drone shot of a snowy mountain peak at sunrise, 4k, photorealistic..."
                className="w-full h-32 md:h-40 p-5 rounded-2xl border border-border/60 bg-background/50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary placeholder:text-muted-foreground/50 resize-none transition-all text-base shadow-inner"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="space-y-3 flex-1 w-full">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Settings2 className="w-4 h-4 text-muted-foreground" />
                  Aspect Ratio
                </label>
                <div className="grid grid-cols-2 gap-3 max-w-[240px]">
                  <div
                    onClick={() => setAspectRatio("16:9")}
                    className={`p-3 rounded-xl border text-center cursor-pointer transition-colors ${
                      aspectRatio === "16:9"
                        ? "border-primary/50 bg-primary/10 shadow-sm"
                        : "border-border/40 bg-muted/20 hover:bg-muted/40"
                    }`}
                  >
                    <div className={`text-sm font-medium ${aspectRatio === "16:9" ? "text-primary" : "text-foreground"}`}>
                      16:9
                    </div>
                    <div className={`text-xs mt-0.5 ${aspectRatio === "16:9" ? "text-primary/70" : "text-muted-foreground"}`}>
                      Landscape
                    </div>
                  </div>
                  <div
                    onClick={() => setAspectRatio("9:16")}
                    className={`p-3 rounded-xl border text-center cursor-pointer transition-colors ${
                      aspectRatio === "9:16"
                        ? "border-primary/50 bg-primary/10 shadow-sm"
                        : "border-border/40 bg-muted/20 hover:bg-muted/40"
                    }`}
                  >
                    <div className={`text-sm font-medium ${aspectRatio === "9:16" ? "text-primary" : "text-foreground"}`}>
                      9:16
                    </div>
                    <div className={`text-xs mt-0.5 ${aspectRatio === "9:16" ? "text-primary/70" : "text-muted-foreground"}`}>
                      Vertical
                    </div>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isPending || !prompt.trim()}
                className="w-full sm:w-auto h-14 px-8 rounded-xl bg-primary hover:bg-primary/95 text-primary-foreground shadow-lg shadow-primary/25 font-bold group relative overflow-hidden shrink-0"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:animate-[shimmer_2s_infinite]" />
                {isPending ? (
                  <span className="flex items-center gap-2 text-lg">
                    <Wand2 className="w-5 h-5 animate-pulse" />
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center gap-2 text-lg">
                    <Wand2 className="w-5 h-5" />
                    Generate Video
                  </span>
                )}
              </Button>
            </div>
          </div>
        </MagicCard>
      </div>

      {/* History/Gallery Grid */}
      <div className="mt-8 space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
            <History className="w-5 h-5 text-muted-foreground" />
            Recent Generations
          </h3>
        </div>
        
        {isLoadingHistory ? (
           <div className="flex flex-col items-center justify-center p-12 border border-dashed border-border/60 rounded-3xl bg-card/20">
             <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
             <p className="text-muted-foreground text-center">Loading recent generations...</p>
           </div>
        ) : recentGenerations.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 border border-dashed border-border/60 rounded-3xl bg-card/20">
            <History className="w-12 h-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground text-center">No recent generations to display.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentGenerations.map((item) => {
              const videoRecord = item.textToVideos?.[0];
              if (!videoRecord) return null;
              
              const isCompleted = videoRecord.status === GenerationStatus.COMPLETED && videoRecord.outputUrl;
              
              return (
                <div
                  key={item.id}
                  className="group relative rounded-2xl overflow-hidden border border-border/40 bg-card/40 backdrop-blur-sm transition-all hover:shadow-xl hover:border-primary/30"
                >
                  {isCompleted ? (
                    <>
                      <div className="aspect-video relative overflow-hidden bg-black/90">
                        <video
                          src={videoRecord.outputUrl}
                          className="w-full h-full object-cover"
                          controls
                          loop
                        />
                        <div className="absolute inset-0 pointer-events-none bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col h-full border border-dashed border-primary/30 rounded-2xl bg-primary/5">
                      <div className="aspect-video relative overflow-hidden flex flex-col items-center justify-center p-6 text-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-2 animate-pulse">
                          <Clock className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-sm font-bold text-primary">Generating Video...</span>
                        <span className="text-xs text-muted-foreground">This usually takes a few minutes.</span>
                      </div>
                      <div className="p-4 border-t border-primary/20 bg-primary/10">
                        <p className="text-sm text-foreground/80 line-clamp-2 leading-relaxed italic">
                          "{videoRecord.prompt}"
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
};

export default TextToVideoComponent;
