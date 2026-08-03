"use client";

import { Button } from "@/components/ui/button";
import { MagicCard } from "@/components/ui/magic-card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  deleteHistoryItemService,
  getMyHistoryService,
} from "@/services/dashboard/history/history.service";
import { IHistory } from "@/types/history.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
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
  Volume2,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

const categoryFilters = [
  { label: "All Creations", value: "ALL", icon: Filter },
  { label: "Images", value: "TEXT_TO_IMAGE", icon: ImageIcon },
  { label: "AI Chat", value: "AI_CHATBOT", icon: MessageSquare },
  { label: "Text to Video", value: "TEXT_TO_VIDEO", icon: Video },
  { label: "Image to Video", value: "IMAGE_TO_VIDEO", icon: Video },
  { label: "Text to Speech", value: "TEXT_TO_SPEECH", icon: Volume2 },
  { label: "Backgrounds", value: "IMAGE_BACKGROUND_REMOVER", icon: Scan },
];

interface HistoryComponentProps {
  initialQuery?: any;
}

export default function HistoryComponent({
  initialQuery,
}: HistoryComponentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const page = Number(searchParams.get("page")) || 1;
  const searchTerm = searchParams.get("searchTerm") || "";
  const activeFilter = searchParams.get("type") || "ALL";

  const [searchInput, setSearchInput] = useState(searchTerm);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Sync search input with URL search term (only if different to avoid cursor jumps)
  useEffect(() => {
    if (searchTerm !== searchInput) {
      setSearchInput(searchTerm);
    }
  }, [searchTerm]);

  // Debounce search input
  useEffect(() => {
    if (searchInput === searchTerm) return;

    const timer = setTimeout(() => {
      updateFilters({ searchTerm: searchInput });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const updateFilters = (newParams: Record<string, string | number | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === "" || value === "ALL") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    // Reset to page 1 for any filter change that isn't pagination
    if (newParams.page === undefined) {
      params.set("page", "1");
    }

    startTransition(() => {
      router.push(`/dashboard/history?${params.toString()}`);
    });
  };

  const clearFilters = () => {
    setSearchInput("");
    router.push("/dashboard/history");
  };

  // Fetch paginated generation history records tied to search parameters
  const { data: response, isLoading } = useQuery({
    queryKey: ["history", searchParams.toString()],
    queryFn: async () => {
      const queryObj: Record<string, any> = {};
      searchParams.forEach((value, key) => {
        queryObj[key] = value;
      });
      if (!queryObj.limit) queryObj.limit = 6;

      const res = await getMyHistoryService(queryObj);
      return res;
    },
  });

  // Soft delete mutation
  const { mutateAsync: deleteItem } = useMutation({
    mutationFn: (id: string) => deleteHistoryItemService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history"] });
      toast.success("Creation removed from history");
      if (selectedItem) setSelectedItem(null);
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to delete item");
    },
  });

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await deleteItem(id);
  };

  const getCardIcon = (type: string) => {
    switch (type) {
      case "TEXT_TO_IMAGE":
        return <ImageIcon className="h-4 w-4 text-purple-500" />;
      case "AI_CHATBOT":
        return <MessageSquare className="h-4 w-4 text-emerald-500" />;
      case "TEXT_TO_VIDEO":
      case "IMAGE_TO_VIDEO":
        return <Video className="h-4 w-4 text-pink-500" />;
      case "IMAGE_BACKGROUND_REMOVER":
        return <Scan className="h-4 w-4 text-sky-500" />;
      case "TEXT_TO_SPEECH":
        return <Volume2 className="h-4 w-4 text-violet-500" />;
      default:
        return <Sparkles className="h-4 w-4 text-amber-500" />;
    }
  };

  const formatType = (type: string) => {
    return type?.replace(/_/g, " ") || "";
  };

  const formatDate = (isoString: string) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const historyList = response?.data || [];
  const meta = response?.meta || { page: 1, limit: 6, total: 0, totalPage: 1 };

  return (
    <div className="space-y-6  text-neutral-900 dark:text-white transition-colors duration-300">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-linear-to-r from-neutral-950 via-neutral-750 to-neutral-500 dark:from-white dark:via-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent">
            Creations History
          </h1>
          <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Browse, view, or manage your generated outputs, chats, and utility
            runs.
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 p-4 rounded-2xl shadow-sm w-full">
        <div className="relative w-full lg:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search prompts..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-violet-500/50 rounded-xl transition"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto scrollbar-none pb-1 lg:pb-0">
          {categoryFilters.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeFilter === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => updateFilters({ type: tab.value })}
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

      {/* Creations Grid */}
      <AnimatePresence mode="popLayout">
        {isLoading || isPending ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-72 w-full animate-pulse bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-2xl"
              />
            ))}
          </div>
        ) : historyList.length === 0 ? (
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
            {searchTerm || activeFilter !== "ALL" ? (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="mt-4 rounded-xl font-bold cursor-pointer"
              >
                Clear Filters
              </Button>
            ) : null}
          </motion.div>
        ) : (
          <div className="space-y-6">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              layout
            >
              {historyList.map((item: IHistory) => (
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
                    className="flex flex-col justify-between p-5 bg-white dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm dark:shadow-none hover:border-neutral-300 dark:hover:border-neutral-750 transition-all duration-300 w-full [&>div.relative.z-40]:flex [&>div.relative.z-40]:flex-col [&>div.relative.z-40]:h-full [&>div.relative.z-40]:w-full"
                    gradientColor="rgba(139, 92, 246, 0.03)"
                  >
                    <div className="space-y-4 grow flex flex-col">
                      {/* Header Badge */}
                      <div className="flex justify-between items-center shrink-0">
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

                      {/* Preview Container */}
                      <div className="h-36 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-950/60 border border-neutral-100 dark:border-neutral-900 flex items-center justify-center relative group flex-grow">
                        {item.type === "TEXT_TO_IMAGE" ||
                        item.type === "IMAGE_BACKGROUND_REMOVER" ? (
                          <img
                            src={item.outputUrls}
                            alt="Creation Preview"
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          />
                        ) : item.type === "TEXT_TO_VIDEO" ||
                          item.type === "IMAGE_TO_VIDEO" ? (
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

                      {/* Prompt */}
                      <div className="space-y-1 shrink-0">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                          Prompt
                        </p>
                        <p className="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-2 leading-relaxed">
                          {item.prompt}
                        </p>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between border-t border-neutral-100 dark:border-neutral-900 pt-4 mt-4 shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs cursor-pointer gap-1 text-violet-600 dark:text-violet-400 hover:bg-violet-500/5 px-2 py-1 rounded-lg"
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

            {/* Pagination */}
            {meta.totalPages > 1 && (
              <Pagination className="pt-6 text-center mx-auto">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      disabled={page <= 1}
                      onClick={(e) => {
                        e.preventDefault();
                        if (page > 1) updateFilters({ page: page - 1 });
                      }}
                      className="cursor-pointer"
                    />
                  </PaginationItem>

                  {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(
                    (p) => {
                      const isNear =
                        Math.abs(p - page) <= 1 ||
                        p === 1 ||
                        p === meta.totalPages;
                      if (!isNear) {
                        if (p === 2 || p === meta.totalPages - 1) {
                          return (
                            <PaginationItem key={p}>
                              <span className="px-2 text-neutral-400">...</span>
                            </PaginationItem>
                          );
                        }
                        return null;
                      }
                      return (
                        <PaginationItem key={p}>
                          <PaginationLink
                            href="#"
                            isActive={p === page}
                            onClick={(e) => {
                              e.preventDefault();
                              updateFilters({ page: p });
                            }}
                            className="cursor-pointer text-xs font-semibold"
                          >
                            {p}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    },
                  )}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      disabled={page >= meta.totalPages}
                      onClick={(e) => {
                        e.preventDefault();
                        if (page < meta.totalPages)
                          updateFilters({ page: page + 1 });
                      }}
                      className="cursor-pointer"
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        )}
      </AnimatePresence>

      {/* Details Popup Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl p-6 overflow-y-auto max-h-[90vh] z-10 space-y-6"
            >
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
              {/* text to image/video modal  */}
              <div className="rounded-2xl overflow-hidden bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center relative min-h-[220px]">
                {selectedItem.type === "TEXT_TO_IMAGE" ||
                selectedItem.type === "IMAGE_BACKGROUND_REMOVER" ? (
                  <img
                    src={selectedItem.outputUrls}
                    alt="Creation Preview"
                    className="w-full max-h-[350px] object-contain"
                  />
                ) : selectedItem.type === "TEXT_TO_VIDEO" ||
                  selectedItem.type === "IMAGE_TO_VIDEO" ? (
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
              <div className="space-y-3">
                <div className="space-y-1">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    Input Prompt
                  </h4>
                  <p className="text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed font-medium">
                    {selectedItem.prompt}
                  </p>
                </div>
              </div>{" "}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-900 w-full">
                {selectedItem.type === "TEXT_TO_IMAGE" ||
                selectedItem.type === "IMAGE_BACKGROUND_REMOVER" ? (
                  <a
                    href={selectedItem.outputUrls}
                    download="creation.png"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold bg-violet-600 hover:bg-violet-750 text-white rounded-xl shadow transition w-full sm:w-auto text-center cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download Image
                  </a>
                ) : null}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(selectedItem.prompt);
                    toast.success("Prompt copied to clipboard");
                  }}
                  className="flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold border border-neutral-200 dark:border-neutral-800 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900 transition cursor-pointer w-full sm:w-auto text-center"
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
