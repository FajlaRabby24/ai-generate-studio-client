"use client";

import { Button } from "@/components/ui/button";
import { MagicCard } from "@/components/ui/magic-card";
import { GenerationStatus, GenerationType } from "@/config/constant";
import {
  getRecentGenerationService,
  imageToVideoService,
} from "@/services/dashboard/image-to-video/imageToVideo.service";
import { IImageToVideoRecord } from "@/types/imageToVideo.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Clock,
  History,
  Image as ImageIcon,
  Monitor,
  Play,
  RefreshCw,
  Sparkles,
  UploadCloud,
  Video,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ImageToVideoComponent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState<"16:9" | "9:16">("16:9");

  const queryClient = useQueryClient();

  // Fetch recent generations
  const { data: recentRes, isLoading: isLoadingHistory } = useQuery({
    queryKey: ["recentImageToVideo"],
    queryFn: getRecentGenerationService,
  });

  const recentGenerations = recentRes?.data;
  const allVideos = recentGenerations?.flatMap((gen) => gen.imageToVideos) || [];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (!selectedFile.type.startsWith("image/")) {
        toast.error("Please upload a valid image file.");
        return;
      }
      setFile(selectedFile);
      setFilePreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleDeselectFile = () => {
    setFile(null);
    if (filePreview) {
      URL.revokeObjectURL(filePreview);
      setFilePreview(null);
    }
  };

  const { mutateAsync: generateVideo, isPending: isGenerating } = useMutation({
    mutationFn: imageToVideoService,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(
          data?.message || "Video generation started successfully!",
        );
        setPrompt("");
        handleDeselectFile();
        queryClient.invalidateQueries({ queryKey: ["recentImageToVideo"] });
      } else {
        toast.error(data?.message || "Failed to start video generation.");
      }
    },
    onError: (err: any) => {
      toast.error(err?.message || "Something went wrong.");
    },
  });

  const handleGenerate = async () => {
    if (!file) {
      toast.error("Please upload an image first.");
      return;
    }
    if (!prompt.trim()) {
      toast.error("Prompt is required.");
      return;
    }

    const formData = new FormData();
    formData.append("singleFile", file);
    formData.append("prompt", prompt.trim());
    formData.append("aspectRatio", aspectRatio);
    formData.append("type", GenerationType.IMAGE_TO_VIDEO);

    try {
      await generateVideo(formData);
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 max-w-6xl mx-auto w-full gap-8">
      {/* Header */}
      <div className="flex flex-col items-center justify-center text-center gap-3 shrink-0">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
          AI Image to Video
          <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary align-middle uppercase tracking-widest">
            LTX Video
          </span>
        </h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
          Bring your static images to life. Upload an image, write a descriptive
          prompt, and generate a dynamic cinema-quality video clip.
        </p>
      </div>

      {/* Centered Settings Card */}
      <div className="max-w-2xl mx-auto w-full space-y-6">
        <MagicCard
          mode="gradient"
          gradientColor="rgba(124, 58, 237, 0.05)"
          className="w-full p-1 rounded-3xl border border-border/40 bg-card/10 backdrop-blur-md shadow-2xl"
        >
          <div className="p-6 md:p-8 flex flex-col gap-6">
            {/* Image Uploader */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-primary" />
                Source Image
              </label>

              {filePreview ? (
                <div className="relative rounded-2xl overflow-hidden border border-primary/30 aspect-video bg-black/40 flex items-center justify-center group shadow-inner">
                  <img
                    src={filePreview}
                    alt="Source preview"
                    className="max-w-full max-h-full object-contain"
                  />
                  <button
                    onClick={handleDeselectFile}
                    disabled={isGenerating}
                    className="absolute top-3 right-3 p-2 rounded-xl bg-black/60 hover:bg-black/80 text-white transition-all cursor-pointer shadow-md hover:scale-105 border border-white/10"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="relative border-2 border-dashed border-border/60 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 hover:border-primary/50 transition-all bg-background/30 group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="p-4 rounded-full bg-muted/40 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-all">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  <div className="text-center font-sans">
                    <span className="text-sm font-bold text-foreground">
                      Choose image or drag here
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">
                      Support JPG, PNG, WEBP up to 5MB
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Prompt Textarea */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Motion Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isGenerating}
                placeholder="Describe the motion details. For example: 'A gentle camera panning, trees swaying in the wind, dramatic lighting...'"
                className="w-full h-28 p-4 rounded-xl border border-border/60 bg-background/50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary placeholder:text-muted-foreground/50 resize-none transition-all text-sm outline-none shadow-inner"
              />
            </div>

            {/* Aspect Ratio Selection */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Aspect Ratio
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setAspectRatio("16:9")}
                  disabled={isGenerating}
                  className={`flex items-center cursor-pointer justify-center gap-2 py-3 px-4 rounded-xl border transition-all font-bold text-xs ${
                    aspectRatio === "16:9"
                      ? "border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10"
                      : "border-border/60 bg-muted/10 text-muted-foreground hover:bg-muted/20"
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                  Landscape (16:9)
                </button>
                <button
                  onClick={() => setAspectRatio("9:16")}
                  disabled={isGenerating}
                  className={`flex items-center justify-center cursor-pointer gap-2 py-3 px-4 rounded-xl border transition-all font-bold text-xs ${
                    aspectRatio === "9:16"
                      ? "border-primary bg-primary/10 text-primary shadow-sm shadow-primary/10"
                      : "border-border/60 bg-muted/10 text-muted-foreground hover:bg-muted/20"
                  }`}
                >
                  <Play className="w-4 h-4 rotate-90" />
                  Portrait (9:16)
                </button>
              </div>
            </div>

            {/* Action Trigger Button */}
            <Button
              onClick={handleGenerate}
              disabled={!file || !prompt.trim() || isGenerating}
              className="w-full h-14 rounded-xl cursor-pointer bg-primary text-primary-foreground shadow-lg shadow-primary/25 font-bold group relative overflow-hidden shrink-0"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:animate-[shimmer_2s_infinite]" />
              {isGenerating ? (
                <span className="flex items-center justify-center gap-2 text-lg">
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Generating Video...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2 text-lg cursor-pointer">
                  <Video className="w-5 h-5" />
                  Generate Video
                </span>
              )}
            </Button>
          </div>
        </MagicCard>
      </div>

      {/* History Grid Gallery */}
      <div className="space-y-6 pt-6 border-t border-border/40">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
            <History className="w-5 h-5 text-muted-foreground" />
            Recent Creations
          </h3>
        </div>

        {isLoadingHistory ? (
          <div className="flex flex-col items-center justify-center p-12 border border-dashed border-border/60 rounded-3xl bg-card/20">
            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
            <p className="text-muted-foreground text-center">
              Loading recent creations...
            </p>
          </div>
        ) : !recentGenerations || allVideos.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 border border-dashed border-border/60 rounded-3xl bg-card/20">
            <History className="w-12 h-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground text-center">
              No recent creations to display.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allVideos.map((videoRecord: IImageToVideoRecord) => {
              const isCompleted =
                videoRecord.status === GenerationStatus.COMPLETED &&
                videoRecord.outputUrl;

              return (
                <div
                  key={videoRecord.id}
                  className="group relative rounded-2xl overflow-hidden border border-border/40 bg-card/40 backdrop-blur-sm transition-all hover:shadow-xl hover:border-primary/30 flex flex-col justify-between"
                >
                  <div className="relative aspect-video overflow-hidden bg-black/90 flex items-center justify-center border-b border-border/20">
                    {isCompleted ? (
                      <video
                        src={videoRecord.outputUrl}
                        className="w-full h-full object-cover"
                        controls
                        loop
                      />
                    ) : (
                      <>
                        <img
                          src={videoRecord.imageUrl}
                          alt="Input"
                          className="w-full h-full object-cover blur-sm opacity-50"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                            <Clock className="w-5 h-5 text-primary" />
                          </div>
                          <span className="text-xs font-bold text-foreground">
                            {videoRecord.status === GenerationStatus.FAILED
                              ? "Generation Failed"
                              : "Generating video..."}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="p-4 flex flex-col gap-2 bg-muted/10">
                    <p className="text-xs text-foreground/80 line-clamp-2 leading-relaxed italic">
                      "{videoRecord.prompt}"
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1 border-t border-border/10">
                      <span>
                        {new Date(videoRecord.createdAt).toLocaleDateString()}
                      </span>
                      {/* {isCompleted && (
                        <button
                          onClick={() =>
                            handleDownload(
                              videoRecord.outputUrl,
                              `video-result-${videoRecord.id}.mp4`,
                            )
                          }
                          className="flex items-center gap-1 text-primary font-bold hover:underline cursor-pointer bg-transparent border-none p-0 outline-none"
                        >
                          <Download className="w-3.5 h-3.5" /> Download
                        </button>
                      )} */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageToVideoComponent;
