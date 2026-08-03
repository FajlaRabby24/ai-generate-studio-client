"use client";

import { Button } from "@/components/ui/button";
import { MagicCard } from "@/components/ui/magic-card";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  Code2,
  Copy,
  Download,
  Eye,
  Filter,
  Image as ImageIcon,
  MessageSquare,
  Scan,
  Search,
  Sparkles,
  Trash2,
  Video,
} from "lucide-react";
import React, { useState } from "react";

const mockHistory = [
  {
    id: "gen-1",
    type: "TEXT_TO_IMAGE",
    status: "COMPLETED",
    prompt:
      "A futuristic floating cyberpunk citadel in the clouds, illuminated by neon holograms and flying traffic streams, oil painting style.",
    outputUrls:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    createdAt: "2026-08-03T11:30:00.000Z",
  },
  {
    id: "gen-2",
    type: "AI_CHATBOT",
    status: "COMPLETED",
    prompt:
      "Analyze the time complexity of recursion vs iteration and explain call stack space limitations.",
    outputUrls:
      "Recursion uses O(N) call stack space because each call pushes a new frame onto the stack, whereas iteration uses O(1) space. If stack depth exceeds memory limits, it triggers a StackOverflowError.",
    createdAt: "2026-08-03T10:15:00.000Z",
  },
  {
    id: "gen-3",
    type: "TEXT_TO_VIDEO",
    status: "COMPLETED",
    prompt:
      "Cinematic close-up of crystal droplets freezing on a red winter rose under moonlight.",
    outputUrls:
      "https://assets.mixkit.co/videos/preview/mixkit-water-dripping-from-a-flower-42479-large.mp4",
    createdAt: "2026-08-02T16:45:00.000Z",
  },
  {
    id: "gen-4",
    type: "IMAGE_BACKGROUND_REMOVER",
    status: "COMPLETED",
    prompt: "Studio portrait background removal - model in yellow raincoat.",
    outputUrls:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    createdAt: "2026-08-01T09:20:00.000Z",
  },
  {
    id: "gen-5",
    type: "CODE_CHECKER",
    status: "COMPLETED",
    prompt:
      "Check this react component for memory leaks: useEffect returning nothing after setInterval.",
    outputUrls:
      "Warning: Memory leak detected. Your setInterval timer is not cleared when the component unmounts. Return a cleanup function: `return () => clearInterval(timer)`.",
    createdAt: "2026-07-31T14:10:00.000Z",
  },
];

const categoryFilters = [
  { label: "All Creations", value: "ALL", icon: Filter },
  { label: "Images", value: "TEXT_TO_IMAGE", icon: ImageIcon },
  { label: "AI Chat", value: "AI_CHATBOT", icon: MessageSquare },
  { label: "Video", value: "TEXT_TO_VIDEO", icon: Video },
  { label: "Backgrounds", value: "IMAGE_BACKGROUND_REMOVER", icon: Scan },
  { label: "Code Utilities", value: "CODE_CHECKER", icon: Code2 },
];

export default function HistoryComponent() {
  const [historyList, setHistoryList] = useState(mockHistory);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setHistoryList((prev) => prev.filter((item) => item.id !== id));
  };

  const getCardIcon = (type: string) => {
    switch (type) {
      case "TEXT_TO_IMAGE":
        return <ImageIcon className="h-4 w-4 text-purple-500" />;
      case "AI_CHATBOT":
        return <MessageSquare className="h-4 w-4 text-emerald-500" />;
      case "TEXT_TO_VIDEO":
        return <Video className="h-4 w-4 text-pink-500" />;
      case "IMAGE_BACKGROUND_REMOVER":
        return <Scan className="h-4 w-4 text-sky-500" />;
      case "CODE_CHECKER":
        return <Code2 className="h-4 w-4 text-red-500" />;
      default:
        return <Sparkles className="h-4 w-4 text-violet-500" />;
    }
  };

  const formatType = (type: string) => {
    return type.replace(/_/g, " ");
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const filteredHistory = historyList.filter((item) => {
    const matchesFilter = activeFilter === "ALL" || item.type === activeFilter;
    const matchesSearch = item.prompt
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6  mx-auto p-4 md:p-6 text-neutral-900 dark:text-white transition-colors duration-300">
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-neutral-950 via-neutral-750 to-neutral-500 dark:from-white dark:via-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent">
            Creations History
          </h1>
          <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Browse, view, or manage your generated images, chats, and utility
            runs.
          </p>
        </div>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 p-4 rounded-2xl shadow-sm">
        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search prompts..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-violet-500/50 rounded-xl transition"
          />
        </div>

        {/* Filters Tabs scrollbar */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none pb-1 md:pb-0">
          {categoryFilters.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeFilter === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap border transition cursor-pointer ${
                  isActive
                    ? "bg-violet-600 border-violet-600 text-white shadow-sm"
                    : "bg-neutral-50 dark:bg-neutral-950/45 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. History Items Grid */}
      <AnimatePresence mode="popLayout">
        {filteredHistory.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-neutral-200 dark:border-neutral-800 rounded-3xl min-h-[300px]"
          >
            <div className="p-4 bg-violet-500/10 rounded-full text-violet-500 mb-4 animate-pulse">
              <Sparkles className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold">No creations found</h3>
            <p className="text-xs text-neutral-500 max-w-xs mt-1">
              Try adjusting your search criteria or filter selections, or head
              over to the generators to start creating!
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            {filteredHistory.map((item) => (
              <motion.div
                key={item.id}
                layoutId={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedItem(item)}
                className="cursor-pointer flex h-full"
              >
                <MagicCard
                  className="flex flex-col justify-between p-5 bg-white dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm dark:shadow-none hover:border-neutral-300 dark:hover:border-neutral-750 transition-all duration-300 w-full"
                  gradientColor="rgba(139, 92, 246, 0.03)"
                >
                  <div className="space-y-4 flex-grow">
                    {/* Header: Icon / Badge & Date */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                        {getCardIcon(item.type)}
                        <span className="text-neutral-700 dark:text-neutral-300">
                          {formatType(item.type)}
                        </span>
                      </div>
                      <span className="text-[10px] text-neutral-400 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(item.createdAt)}
                      </span>
                    </div>

                    {/* Media preview area */}
                    <div className="h-36 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-950/60 border border-neutral-100 dark:border-neutral-900 flex items-center justify-center relative group">
                      {item.type === "TEXT_TO_IMAGE" ||
                      item.type === "IMAGE_BACKGROUND_REMOVER" ? (
                        <img
                          src={item.outputUrls}
                          alt="Creations preview"
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                      ) : item.type === "TEXT_TO_VIDEO" ? (
                        <div className="text-center space-y-1 p-4">
                          <div className="p-3 bg-pink-500/10 rounded-full text-pink-500 inline-block">
                            <Video className="h-6 w-6" />
                          </div>
                          <p className="text-[10px] font-semibold text-neutral-500">
                            Video Output
                          </p>
                        </div>
                      ) : item.type === "AI_CHATBOT" ? (
                        <div className="text-center space-y-1 p-4">
                          <div className="p-3 bg-emerald-500/10 rounded-full text-emerald-500 inline-block">
                            <MessageSquare className="h-6 w-6" />
                          </div>
                          <p className="text-[10px] font-semibold text-neutral-500">
                            Chat Log
                          </p>
                        </div>
                      ) : (
                        <div className="text-center space-y-1 p-4">
                          <div className="p-3 bg-violet-500/10 rounded-full text-violet-500 inline-block">
                            <Sparkles className="h-6 w-6" />
                          </div>
                          <p className="text-[10px] font-semibold text-neutral-500">
                            Generated Run
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Prompt snippet */}
                    <div className="space-y-1.5">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                        Prompt
                      </p>
                      <p className="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-2 leading-relaxed">
                        {item.prompt}
                      </p>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="flex items-center justify-between border-t border-neutral-100 dark:border-neutral-900 pt-4 mt-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs gap-1 text-violet-600 dark:text-violet-400 hover:bg-violet-500/5 px-2 py-1 rounded-lg"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      View Details
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleDelete(item.id, e)}
                      className="text-red-500 hover:text-red-650 hover:bg-red-500/5 border border-transparent hover:border-red-500/10 rounded-lg p-1.5 size-7 cursor-pointer flex items-center justify-center"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </MagicCard>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Details Popup Overlay Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop filter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl p-6 overflow-hidden z-10 space-y-6"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 w-fit">
                    {getCardIcon(selectedItem.type)}
                    <span className="text-neutral-700 dark:text-neutral-300">
                      {formatType(selectedItem.type)}
                    </span>
                  </div>
                  <span className="text-[10px] text-neutral-400 block pt-1">
                    Created on {formatDate(selectedItem.createdAt)}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Modal Media Showcase */}
              <div className="rounded-2xl overflow-hidden bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center relative min-h-[220px]">
                {selectedItem.type === "TEXT_TO_IMAGE" ||
                selectedItem.type === "IMAGE_BACKGROUND_REMOVER" ? (
                  <img
                    src={selectedItem.outputUrls}
                    alt="Creations detailed"
                    className="w-full max-h-[350px] object-contain"
                  />
                ) : selectedItem.type === "TEXT_TO_VIDEO" ? (
                  <video
                    src={selectedItem.outputUrls}
                    controls
                    autoPlay
                    loop
                    className="w-full max-h-[350px] rounded-xl"
                  />
                ) : (
                  <div className="p-4 w-full text-xs font-mono bg-neutral-900 text-neutral-300 dark:bg-neutral-950 rounded-xl overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[250px] border border-neutral-800">
                    {selectedItem.outputUrls}
                  </div>
                )}
              </div>

              {/* Modal Prompt & Details */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    Input Prompt
                  </h4>
                  <p className="text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed font-medium">
                    {selectedItem.prompt}
                  </p>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-900">
                {selectedItem.type === "TEXT_TO_IMAGE" ||
                selectedItem.type === "IMAGE_BACKGROUND_REMOVER" ? (
                  <a
                    href={selectedItem.outputUrls}
                    download="creations.png"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-violet-600 hover:bg-violet-700 text-white rounded-xl shadow transition"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download Image
                  </a>
                ) : null}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(selectedItem.prompt);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold border border-neutral-200 dark:border-neutral-800 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900 transition cursor-pointer"
                >
                  <Copy className="h-3.5 w-3.5" />
                  Copy Prompt
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
