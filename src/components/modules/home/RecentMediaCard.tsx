import { GenerationType } from "@/config/constant";
import { MediaItem } from "@/services/home/recentMedia.service";
import {
  Image as ImageIcon,
  Maximize2,
  Video as VideoIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const typeLabels: Record<GenerationType, string> = {
  [GenerationType.TEXT_TO_IMAGE]: "Text to Image",
  [GenerationType.IMAGE_BACKGROUND_REMOVER]: "Bg Removed",
  [GenerationType.IMAGE_TO_VIDEO]: "Image to Video",
  [GenerationType.TEXT_TO_VIDEO]: "Text to Video",
  [GenerationType.AI_CHATBOT]: "AI Chat",
  [GenerationType.CODE_CHECKER]: "Code Checker",
  [GenerationType.IMAGE_CAPTION_GENERATOR]: "Caption Gen",
  [GenerationType.RESUME_ANALYZER]: "Resume Analyzer",
  [GenerationType.LANGUAGE_TRANSLATOR]: "Translator",
  [GenerationType.GRAMMER_IMPROVER]: "Grammar",
  [GenerationType.TEXT_TO_SPEECH]: "Speech Gen",
  [GenerationType.SPEECH_TO_TEXT]: "Transcription",
};

export const RecentMediaCard = ({ item }: { item: MediaItem }) => {
  const isImage =
    item.type === GenerationType.TEXT_TO_IMAGE ||
    item.type === GenerationType.IMAGE_BACKGROUND_REMOVER;

  const badgeText = typeLabels[item.type] || item.type;

  return (
    <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/40 backdrop-blur-md shadow-2xl flex flex-col group transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-primary/5">
      {/* Media Preview container */}
      <div className="relative aspect-video w-full overflow-hidden bg-black/20">
        {isImage ? (
          <Image
            fill
            src={item.outputUrl}
            alt={"AI generated image"}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            sizes="300px"
          />
        ) : (
          <video
            src={item.outputUrl}
            loop
            muted
            autoPlay
            playsInline
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}

        {/* Ambient Dark Overlay */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300" />

        {/* Media type badge */}
        <div className="absolute flex items-center gap-4 justify-between top-4 left-4 z-10  ">
          <p className="flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-black/60 border border-white/10 text-white rounded-full backdrop-blur-md">
            {isImage ? (
              <ImageIcon className="w-3.5 h-3.5 text-purple-400" />
            ) : (
              <VideoIcon className="w-3.5 h-3.5 text-blue-400" />
            )}
            {badgeText}
          </p>
          <Link
            href={item.outputUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white transition-colors bg-black/50 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity rounded-full p-1.5 z-20"
          >
            <Maximize2 className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
