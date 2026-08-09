"use client";

import { Button } from "@/components/ui/button";
import { MagicCard } from "@/components/ui/magic-card";
import {
  Sparkles,
  Volume2,
  Music,
  Play,
  Pause,
  Download,
  Clock,
  History,
  Trash2,
  Sliders,
  RefreshCw,
} from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";

// Mock Voices
const mockVoices = [
  { id: "en-US-JennyNeural", name: "Jenny (Female) - English (US)", gender: "Female", lang: "en-US" },
  { id: "en-US-GuyNeural", name: "Guy (Male) - English (US)", gender: "Male", lang: "en-US" },
  { id: "bn-BD-PradeepNeural", name: "Pradeep (Male) - Bengali (BD)", gender: "Male", lang: "bn-BD" },
  { id: "bn-BD-NabanitaNeural", name: "Nabanita (Female) - Bengali (BD)", gender: "Female", lang: "bn-BD" },
];

// Mock History
const initialMockHistory = [
  {
    id: "1",
    prompt: "Welcome to AI Generate Studio. Here you can transform your text into realistic human speech using advanced neural voices.",
    voiceName: "Jenny (Female) - English (US)",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    status: "completed",
    createdAt: "10 mins ago",
  },
  {
    id: "2",
    prompt: "কৃত্রিম বুদ্ধিমত্তা চালিত টেক্সট টু স্পিচ সিস্টেমে আপনাকে স্বাগতম।",
    voiceName: "Nabanita (Female) - Bengali (BD)",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    status: "completed",
    createdAt: "1 hour ago",
  },
];

const TextToSpeechComponent = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("en-US-JennyNeural");
  const [speed, setSpeed] = useState("0%");
  const [pitch, setPitch] = useState("0%");
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState(initialMockHistory);

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

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast.error("Please enter some text to synthesize.");
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      const newGeneration = {
        id: Date.now().toString(),
        prompt: prompt.trim(),
        voiceName: mockVoices.find((v) => v.id === selectedVoice)?.name || selectedVoice,
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        status: "completed",
        createdAt: "Just now",
      };
      setHistory((prev) => [newGeneration, ...prev]);
      setPrompt("");
      toast.success("Speech synthesized successfully!");
    }, 2000);
  };

  const handleDeleteHistory = (id: string) => {
    if (playingId === id) {
      audioPlayersRef.current[id]?.pause();
      setPlayingId(null);
    }
    setHistory((prev) => prev.filter((item) => item.id !== id));
    toast.success("History item deleted.");
  };

  return (
    <div className="flex-1 flex flex-col p-4 md:p-8 max-w-6xl mx-auto w-full gap-8">
      {/* Header */}
      <div className="flex flex-col items-center justify-center text-center gap-3 shrink-0 pt-4">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 border border-primary/20 mb-2">
          <Volume2 className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
          Text to Speech AI
          <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary align-middle uppercase tracking-widest">
            HD
          </span>
        </h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
          Convert written text into natural, expressive human-like speech. Choose from a variety of voices, languages, and settings.
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

            {/* Voice Dropdown */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Select Voice</label>
              <select
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                className="w-full p-3.5 rounded-xl border border-border/60 bg-background/50 text-foreground text-sm focus:border-primary outline-none transition-all cursor-pointer"
              >
                {mockVoices.map((voice) => (
                  <option key={voice.id} value={voice.id} className="bg-card text-foreground">
                    {voice.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Speed Option */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-foreground">Speed (Rate)</label>
                <span className="text-xs font-semibold text-primary">{speed}</span>
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
                <label className="text-sm font-semibold text-foreground">Pitch</label>
                <span className="text-xs font-semibold text-primary">{pitch}</span>
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

        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 border border-dashed border-border/60 rounded-3xl bg-card/20">
            <History className="w-12 h-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground text-center">No audio conversions yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {history.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-2xl p-5 border border-border/40 bg-card/40 backdrop-blur-sm transition-all hover:shadow-xl hover:border-primary/30 flex flex-col justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary">
                      {item.voiceName}
                    </span>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.createdAt}
                    </span>
                  </div>
                  <p className="text-sm text-foreground line-clamp-2 leading-relaxed font-medium">
                    "{item.prompt}"
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3 pt-2 border-t border-border/20">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handlePlayPause(item.id, item.audioUrl)}
                      className="rounded-full w-9 h-9 p-0 flex items-center justify-center bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer"
                    >
                      {playingId === item.id ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4 fill-primary ml-0.5" />
                      )}
                    </Button>
                    <span className="text-xs text-muted-foreground">
                      {playingId === item.id ? "Playing preview..." : "Listen preview"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a href={item.audioUrl} download target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="ghost" className="rounded-xl hover:bg-muted/50 p-2 h-auto text-muted-foreground hover:text-foreground">
                        <Download className="w-4 h-4" />
                      </Button>
                    </a>
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TextToSpeechComponent;
