"use client";

import { Button } from "@/components/ui/button";
import { MagicCard } from "@/components/ui/magic-card";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  UploadCloud,
  History,
  X,
  Sparkles,
  Download,
  RefreshCw,
  Image as ImageIcon,
  CheckCircle2,
  Undo2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  bgRemoverService,
  getRecentGenerationService,
} from "@/services/dashboard/bgRemover/bgRemover.service";
import { IGetRecentImageToVideoResponse } from "@/types/backgroundRemove.types";
import { GenerationStatus, GenerationType } from "@/config/constant";

const RemoveBackgroundComponent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);

  const queryClient = useQueryClient();

  // Fetch recent generations
  const { data: recentRes, isLoading: isLoadingHistory } = useQuery({
    queryKey: ["recentBackgroundRemover"],
    queryFn: getRecentGenerationService,
  });

  const recentGenerations = recentRes?.data || [];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (!selectedFile.type.startsWith("image/")) {
        toast.error("Please upload a valid image file.");
        return;
      }
      setFile(selectedFile);
      setFilePreview(URL.createObjectURL(selectedFile));
      setOutputUrl(null); // Reset output when new file is loaded
    }
  };

  const handleDeselectFile = () => {
    setFile(null);
    if (filePreview) {
      URL.revokeObjectURL(filePreview);
      setFilePreview(null);
    }
    setOutputUrl(null);
  };

  const { mutateAsync: removeBackground, isPending: isProcessing } = useMutation({
    mutationFn: bgRemoverService,
    onSuccess: (data) => {
      if (data?.success && data.data?.secureUrl) {
        toast.success(data?.message || "Background removed successfully!");
        setOutputUrl(data.data.secureUrl);
        queryClient.invalidateQueries({ queryKey: ["recentBackgroundRemover"] });
      } else {
        toast.error(data?.message || "Failed to remove background.");
      }
    },
    onError: (err: any) => {
      toast.error(err?.message || "Something went wrong.");
    },
  });

  const handleProcess = async () => {
    if (!file) {
      toast.error("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("singleFile", file);
    formData.append("type", GenerationType.IMAGE_BACKGROUND_REMOVER);

    try {
      await removeBackground(formData);
    } catch (e: any) {
      toast.error(e?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6 max-w-6xl mx-auto w-full gap-8">
      {/* Header */}
      <div className="flex flex-col items-center justify-center text-center gap-3 shrink-0">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
          AI Background Remover
          <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary align-middle uppercase tracking-widest">
            AI Tool
          </span>
        </h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
          Instantly remove backgrounds from images with professional precision. Clean transparency in just one click.
        </p>
      </div>

      {/* Workspace Wrapper */}
      <div className="max-w-4xl mx-auto w-full space-y-6">
        <MagicCard
          mode="gradient"
          gradientColor="rgba(124, 58, 237, 0.05)"
          className="w-full p-1 rounded-3xl border border-border/40 bg-card/10 backdrop-blur-md shadow-2xl"
        >
          <div className="p-6 md:p-8 flex flex-col gap-6">
            
            {/* File Upload / Image Preview Section */}
            {!filePreview ? (
              <div className="relative border-2 border-dashed border-border/60 rounded-2xl p-12 flex flex-col items-center justify-center gap-4 hover:border-primary/50 transition-all bg-background/30 group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="p-4 rounded-full bg-muted/40 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-all">
                  <UploadCloud className="w-10 h-10" />
                </div>
                <div className="text-center font-sans">
                  <span className="text-base font-bold text-foreground">
                    Choose image or drag here
                  </span>
                  <p className="text-xs text-muted-foreground mt-1.5">
                    Supports PNG, JPG, WEBP formats up to 5MB
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Side-by-Side Comparison Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Before Side */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                      Before (Original)
                    </span>
                    <div className="relative rounded-2xl overflow-hidden border border-border bg-black/25 aspect-video flex items-center justify-center shadow-inner">
                      <img
                        src={filePreview}
                        alt="Source Preview"
                        className="max-w-full max-h-full object-contain"
                      />
                      {!outputUrl && !isProcessing && (
                        <button
                          onClick={handleDeselectFile}
                          className="absolute top-3 right-3 p-2 rounded-xl bg-black/60 hover:bg-black/80 text-white cursor-pointer transition-all border border-white/10 shadow-md"
                        >
                          <X className="w-4.5 h-4.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* After Side */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                      After (Transparency)
                    </span>
                    <div className="relative rounded-2xl overflow-hidden border border-border bg-black/25 aspect-video flex items-center justify-center shadow-inner">
                      {isProcessing ? (
                        <div className="flex flex-col items-center justify-center gap-3 text-center p-6">
                          <RefreshCw className="w-8 h-8 text-primary animate-spin" />
                          <p className="text-xs text-muted-foreground font-semibold">Removing background...</p>
                        </div>
                      ) : outputUrl ? (
                        <div 
                          className="w-full h-full flex items-center justify-center bg-[linear-gradient(45deg,#ccc_25%,transparent_25%),linear-gradient(-45deg,#ccc_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#ccc_75%),linear-gradient(-45deg,transparent_75%,#ccc_75%)] bg-[size:16px_16px] bg-[position:0_0,0_8px,8px_-8px,-8px_0] bg-neutral-200 dark:bg-neutral-800"
                        >
                          <img
                            src={outputUrl}
                            alt="Background Removed Result"
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-2 p-6 text-center text-muted-foreground/60">
                          <ImageIcon className="w-10 h-10 stroke-[1.5]" />
                          <p className="text-xs">Result will appear here</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions Row */}
                <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-border/40">
                  {outputUrl ? (
                    <>
                      <Button
                        onClick={handleDeselectFile}
                        variant="outline"
                        className="rounded-xl border border-border font-bold h-11 flex items-center gap-2 cursor-pointer"
                      >
                        <Undo2 className="w-4 h-4" /> Start Over
                      </Button>
                      <a href={outputUrl} download target="_blank" rel="noopener noreferrer">
                        <Button className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11 flex items-center gap-2 shadow-lg shadow-emerald-600/20">
                          <Download className="w-4 h-4" /> Download Result
                        </Button>
                      </a>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={handleDeselectFile}
                        variant="outline"
                        disabled={isProcessing}
                        className="rounded-xl border border-border font-bold h-11 flex items-center gap-2 cursor-pointer"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleProcess}
                        disabled={isProcessing}
                        className="rounded-xl bg-primary text-primary-foreground font-bold h-11 flex items-center gap-2 shadow-lg shadow-primary/20 cursor-pointer"
                      >
                        {isProcessing ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" /> Removing...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" /> Remove Background
                          </>
                        )}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </MagicCard>
      </div>

      {/* History Section */}
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
            <p className="text-muted-foreground text-center">Loading recent creations...</p>
          </div>
        ) : recentGenerations.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 border border-dashed border-border/60 rounded-3xl bg-card/20">
            <History className="w-12 h-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground text-center">No recent creations to display.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentGenerations.map((item: IGetRecentImageToVideoResponse) => {
              const bgRecord = item.backgroundRemoves?.[0];
              if (!bgRecord) return null;

              return (
                <div
                  key={item.id}
                  className="group relative rounded-2xl overflow-hidden border border-border/40 bg-card/40 backdrop-blur-sm transition-all hover:shadow-xl hover:border-primary/30 flex flex-col justify-between"
                >
                  <div className="relative aspect-video overflow-hidden bg-black/90 flex items-center justify-center border-b border-border/20">
                    {/* Checkered transparency preview grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,#ccc_25%,transparent_25%),linear-gradient(-45deg,#ccc_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#ccc_75%),linear-gradient(-45deg,transparent_75%,#ccc_75%)] bg-[size:10px_10px] bg-[position:0_0,0_5px,5px_-5px,-5px_0] bg-neutral-200 dark:bg-neutral-800" />
                    <img
                      src={bgRecord.outputUrls}
                      alt="Output Preview"
                      className="w-full h-full object-contain relative z-10 p-2"
                    />
                  </div>
                  <div className="p-4 flex flex-col gap-2 bg-muted/10">
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                      <span>{new Date(bgRecord.createdAt).toLocaleDateString()}</span>
                      <a
                        href={bgRecord.outputUrls}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-primary font-bold hover:underline"
                      >
                        <Download className="w-3.5 h-3.5" /> Download
                      </a>
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

export default RemoveBackgroundComponent;
