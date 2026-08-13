"use client";

import { Button } from "@/components/ui/button";
import { MagicCard } from "@/components/ui/magic-card";
import { GenerationStatus, GenerationType } from "@/config/constant";
import {
  deleteTextToSpeechService,
  getRecentGenerationServiceTextToSpeech,
  getVoicesService,
  textToSpeechService,
} from "@/services/dashboard/text-to-speech/textToSpeech.service";
import { IGetRecentTextToSpeechResponse } from "@/types/dashboard.types";
import { IVoiceItem } from "@/types/textToSpeech.types";
import { handleDownload } from "@/utils/handleDownload";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Clock,
  Download,
  History,
  Music,
  Pause,
  Play,
  RefreshCw,
  Sliders,
  Sparkles,
  Trash2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";

const TextToSpeechComponent = () => {
  const [prompt, setPrompt] = useState("");
  const [languageFilter, setLanguageFilter] = useState("English");
  const [genderFilter, setGenderFilter] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("");
  const [speed, setSpeed] = useState("0%");
  const [pitch, setPitch] = useState("0%");

  const queryClient = useQueryClient();

  // Fetch real voices from backend
  const { data: voicesRes, isLoading: isLoadingVoices } = useQuery({
    queryKey: ["voices", languageFilter, genderFilter],
    queryFn: () =>
      getVoicesService({ lang: languageFilter, gender: genderFilter }),
  });

  const voicesList = voicesRes?.data || [];

  // Fetch recent text-to-speech generations
  const { data: recentRes, isLoading: isLoadingHistory } = useQuery({
    queryKey: ["recentTextToSpeech"],
    queryFn: getRecentGenerationServiceTextToSpeech,
  });

  const recentGenerations = recentRes?.data || [];

  // Update selected voice when voices list changes
  useEffect(() => {
    if (voicesList.length > 0) {
      // Find if current selected voice is in the new list, otherwise default to first
      const exists = voicesList.some((v: IVoiceItem) => v.id === selectedVoice);
      if (!exists) {
        setSelectedVoice(voicesList[0].id);
      }
    } else {
      setSelectedVoice("");
    }
  }, [voicesList, selectedVoice]);

  // Audio player state tracking for history
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioPlayersRef = useRef<{ [key: string]: HTMLAudioElement }>({});

  const handlePlayPause = (id: string, audioUrl: string) => {
    // If a different audio is playing, stop it first
    if (playingId && playingId !== id) {
      const currentPlaying = audioPlayersRef.current[playingId];
      if (currentPlaying) {
        currentPlaying.pause();
        currentPlaying.currentTime = 0;
      }
    }

    let audio = audioPlayersRef.current[id];
    if (!audio) {
      audio = new Audio(audioUrl);
      audio.onended = () => setPlayingId(null);
      audioPlayersRef.current[id] = audio;
    }

    if (playingId === id) {
      audio.pause();
      setPlayingId(null);
    } else {
      audio.play().catch((e) => {
        toast.error("Failed to play audio.");
        console.error(e);
      });
      setPlayingId(id);
    }
  };

  const { mutateAsync: generateSpeech, isPending: isGenerating } = useMutation({
    mutationFn: textToSpeechService,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success("Speech synthesized successfully!");
        setPrompt("");
        queryClient.invalidateQueries({ queryKey: ["recentTextToSpeech"] });
      } else {
        toast.error(data?.message || "Failed to synthesize speech.");
      }
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to synthesize speech.");
    },
  });

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter some text to synthesize.");
      return;
    }
    if (!selectedVoice) {
      toast.error("Please select a voice.");
      return;
    }

    await generateSpeech({
      prompt: prompt.trim(),
      voiceId: selectedVoice,
      rate: speed === "0%" ? undefined : speed,
      pitch: pitch === "0%" ? undefined : pitch.replace("%", "Hz"),
      type: GenerationType.TEXT_TO_SPEECH,
    });
  };

  const { mutateAsync: deleteItem } = useMutation({
    mutationFn: deleteTextToSpeechService,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success("History item deleted successfully!");
        queryClient.invalidateQueries({ queryKey: ["recentTextToSpeech"] });
      } else {
        toast.error(data?.message || "Failed to delete history item.");
      }
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to delete history item.");
    },
  });

  const handleDeleteHistory = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this! The creation will be removed from your history.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8b5cf6",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: document.documentElement.classList.contains("dark")
        ? "#171717"
        : "#ffffff",
      color: document.documentElement.classList.contains("dark")
        ? "#ffffff"
        : "#000000",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (playingId === id) {
          audioPlayersRef.current[id]?.pause();
          setPlayingId(null);
        }
        await deleteItem(id);
      }
    });
  };

  const getVoiceDisplayName = (voiceId: string) => {
    const voice = voicesList.find((v: IVoiceItem) => v.id === voiceId);
    if (voice) {
      return `${voice.name} (${voice.gender})`;
    }
    // Fallback parsing from ID (e.g. en-US-JennyNeural -> Jenny)
    const parts = voiceId.split("-");
    const nameWithNeural = parts[parts.length - 1] || voiceId;
    return nameWithNeural.replace("Neural", "");
  };

  return (
    <div className="flex-1 flex flex-col p-4 md:p-8 max-w-6xl mx-auto w-full gap-8">
      {/* Header */}
      <div className="flex flex-col items-center justify-center text-center gap-3 shrink-0 pt-4">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
          Text to Speech AI
          <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary align-middle uppercase tracking-widest">
            HD
          </span>
        </h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
          Convert written text into natural, expressive human-like speech.
          Choose from a variety of voices, languages, and settings.
        </p>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Input panel (7 columns) */}
        <div className="lg:col-span-7 space-y-6">
          <MagicCard
            mode="gradient"
            gradientColor="rgba(124, 58, 237, 0.05)"
            className="w-full p-1 rounded-3xl border border-border/40 bg-card/10 backdrop-blur-md shadow-2xl"
          >
            <div className="p-6 md:p-8 flex flex-col gap-6">
              <div className="space-y-4">
                <label className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Your text content
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter text to synthesize... (e.g. Type something here and let the AI read it aloud.)"
                  className="w-full h-40 md:h-48 p-5 rounded-2xl border border-border/60 bg-background/50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary placeholder:text-muted-foreground/50 resize-none transition-all text-base shadow-inner"
                  maxLength={1000}
                />
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>Neural voice synthesis</span>
                  <span>{prompt.length}/1000 characters</span>
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="w-full h-14 rounded-xl bg-primary hover:bg-primary/95 text-primary-foreground shadow-lg shadow-primary/25 font-bold group relative overflow-hidden shrink-0"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:animate-[shimmer_2s_infinite]" />
                {isGenerating ? (
                  <span className="flex items-center gap-2 text-lg">
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Synthesizing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2 text-lg">
                    <Music className="w-5 h-5" />
                    Generate Audio
                  </span>
                )}
              </Button>
            </div>
          </MagicCard>
        </div>

        {/* Right Settings panel (5 columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 md:p-8 rounded-3xl border border-border/60 bg-card/40 backdrop-blur-md shadow-xl flex flex-col gap-6">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Sliders className="w-5 h-5 text-primary" />
              Voice Settings
            </h3>

            {/* Filter controls */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">
                  Language
                </label>
                <select
                  value={languageFilter}
                  onChange={(e) => setLanguageFilter(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-border/60 bg-background/50 text-foreground text-xs focus:border-primary outline-none transition-all cursor-pointer"
                >
                  <option value="">All Languages</option>
                  <option value="Arabic">Arabic</option>
                  <option value="Bangla">Bangla</option>
                  <option value="Chinese">Chinese</option>
                  <option value="English">English</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Indonesian">Indonesian</option>
                  <option value="Italian">Italian</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Korean">Korean</option>
                  <option value="Portuguese">Portuguese</option>
                  <option value="Russian">Russian</option>
                  <option value="Spanish">Spanish</option>
                  <option value="Swedish">Swedish</option>
                  <option value="Turkish">Turkish</option>
                  <option value="Vietnamese">Vietnamese</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">
                  Gender
                </label>
                <select
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-border/60 bg-background/50 text-foreground text-xs focus:border-primary outline-none transition-all cursor-pointer"
                >
                  <option value="">All Genders</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            {/* Voice Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Select Voice
              </label>
              {isLoadingVoices ? (
                <div className="w-full p-3.5 rounded-xl border border-border/60 bg-background/50 text-muted-foreground text-sm flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" /> Loading
                  voices...
                </div>
              ) : (
                <select
                  value={selectedVoice}
                  onChange={(e) => setSelectedVoice(e.target.value)}
                  disabled={voicesList.length === 0}
                  className="w-full p-3.5 rounded-xl border border-border/60 bg-background/50 text-foreground text-sm focus:border-primary outline-none transition-all cursor-pointer disabled:opacity-50"
                >
                  {voicesList.length === 0 ? (
                    <option value="">No voices found</option>
                  ) : (
                    voicesList.map((voice: IVoiceItem) => (
                      <option
                        key={voice.id}
                        value={voice.id}
                        className="bg-card text-foreground"
                      >
                        {voice.name} ({voice.gender}) - {voice.language}
                      </option>
                    ))
                  )}
                </select>
              )}
            </div>

            {/* Speed Option */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-foreground">
                  Speed (Rate)
                </label>
                <span className="text-xs font-semibold text-primary">
                  {speed}
                </span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                step="5"
                value={speed.replace("%", "").replace("+", "")}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setSpeed(val >= 0 ? `+${val}%` : `${val}%`);
                }}
                className="w-full accent-primary cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>Slower</span>
                <span>Normal</span>
                <span>Faster</span>
              </div>
            </div>

            {/* Pitch Option */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-foreground">
                  Pitch
                </label>
                <span className="text-xs font-semibold text-primary">
                  {pitch}
                </span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                step="5"
                value={pitch.replace("%", "").replace("+", "")}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setPitch(val >= 0 ? `+${val}%` : `${val}%`);
                }}
                className="w-full accent-primary cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>Lower</span>
                <span>Normal</span>
                <span>Higher</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* History section */}
      <div className="space-y-6 pt-6 border-t border-border/40">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
            <History className="w-5 h-5 text-muted-foreground" />
            Recent Audio Synthesized
          </h3>
        </div>

        {isLoadingHistory ? (
          <div className="flex flex-col items-center justify-center p-12 border border-dashed border-border/60 rounded-3xl bg-card/20">
            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
            <p className="text-muted-foreground text-center">
              Loading recent audio generations...
            </p>
          </div>
        ) : recentGenerations.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 border border-dashed border-border/60 rounded-3xl bg-card/20">
            <History className="w-12 h-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground text-center">
              No audio conversions yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentGenerations.map((item: IGetRecentTextToSpeechResponse) => {
              const speechRecord = item.textToSpeeches?.[0];
              if (!speechRecord) return null;

              const isCompleted =
                speechRecord.status === GenerationStatus.COMPLETED &&
                speechRecord.audioUrl;

              return (
                <div
                  key={item.id}
                  className="group relative rounded-2xl p-5 border border-border/40 bg-card/40 backdrop-blur-sm transition-all hover:shadow-xl hover:border-primary/30 flex flex-col justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary">
                        {getVoiceDisplayName(speechRecord.id)}
                      </span>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(speechRecord.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-foreground line-clamp-2 leading-relaxed font-medium">
                      "{speechRecord.prompt}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-2 border-t border-border/20">
                    {isCompleted ? (
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            handlePlayPause(item.id, speechRecord.audioUrl)
                          }
                          className="rounded-full w-9 h-9 p-0 flex items-center justify-center bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer"
                        >
                          {playingId === item.id ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4 fill-primary ml-0.5" />
                          )}
                        </Button>
                        <span className="text-xs text-muted-foreground">
                          {playingId === item.id
                            ? "Playing..."
                            : "Listen audio"}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4 animate-pulse" />
                        <span className="text-xs">Processing speech...</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      {isCompleted && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            handleDownload(
                              speechRecord.audioUrl,
                              `speech-${speechRecord.id}.mp3`,
                            )
                          }
                          className="rounded-xl hover:bg-muted/50 p-2 h-auto text-muted-foreground hover:text-foreground cursor-pointer"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteHistory(item.id)}
                        className="rounded-xl hover:bg-red-500/10 p-2 h-auto text-muted-foreground hover:text-red-500 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
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

export default TextToSpeechComponent;
