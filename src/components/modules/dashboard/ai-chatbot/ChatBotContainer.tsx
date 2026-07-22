"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MagicCard } from "@/components/ui/magic-card";
import { GenerationType } from "@/config/constant";
import { aiChatBotService } from "@/services/dashboard/ai-chatbot/ai-chatbot.service";
import { getGenerationLeftCountService } from "@/services/dashboard/text-to-image/text-to-image.service";
import { useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Bot, Send, Trash2, User, Zap } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

export function ChatBotContainer() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [remainingCredits, setRemainingCredits] = useState<number | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mutation for sending message to AI Chatbot
  const { mutateAsync: sendMessage, isPending } = useMutation({
    mutationFn: (payload: {
      message: string;
      type: GenerationType;
      chatHistory: ChatMessage[];
    }) => aiChatBotService(payload),
  });

  // Mutation for fetching remaining credits count
  const { mutateAsync: fetchGenerationCount } = useMutation({
    mutationFn: (generationType: GenerationType) =>
      getGenerationLeftCountService(generationType),
  });

  // Reusable function to refresh remaining credits
  const refreshCredits = useCallback(async () => {
    try {
      const res = await fetchGenerationCount(GenerationType.AI_CHATBOT);
      if (res?.success && res.data) {
        setRemainingCredits(res.data.aiChatbot ?? 0);
      }
    } catch (err) {
      console.error("Failed to load remaining credits", err);
    }
  }, [fetchGenerationCount]);

  // Load credits on mount
  useEffect(() => {
    refreshCredits();
  }, [refreshCredits]);

  // Scroll to bottom whenever messages or typing state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isPending]);

  // Handle message submit
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const userMessageText = input.trim();
    setInput("");
    setValidationError(null);

    // 1. Add user message to local state
    const userMessage: ChatMessage = {
      role: "user",
      parts: [{ text: userMessageText }],
    };
    const updatedHistory = [...messages, userMessage];
    setMessages(updatedHistory);

    try {
      // 2. Call chatbot API
      const res = await sendMessage({
        message: userMessageText,
        chatHistory: messages,
        type: GenerationType.AI_CHATBOT,
      });

      if (res?.success && res.data) {
        // 3. Add bot message to local state
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            parts: [{ text: res.data.response }],
          },
        ]);

        // 4. Refetch remaining credits since chatbot decrements it in the background
        await refreshCredits();
      } else {
        setValidationError(
          res?.message || "Failed to generate AI response. Please try again.",
        );
      }
    } catch (err: any) {
      setValidationError(err?.message || "Failed to process chatbot request");
    }
  };

  // Clear chat thread
  const handleClearChat = () => {
    setMessages([]);
    setValidationError(null);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-5rem)] p-4 md:p-6 max-w-5xl mx-auto w-full">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border/40 shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
              <Bot className="w-8 h-8 text-primary" />
              AI Chat Studio
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
              Gemini 3.6 Flash
            </span>
          </div>
          <p className="text-muted-foreground text-sm">
            Engage in seamless conversational intelligence with our advanced
            chatbot model.
          </p>
        </div>

        {/* Action Controls & Credits */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-card border border-border/60 text-xs font-semibold text-foreground shadow-sm">
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>
              {remainingCredits !== null
                ? `${remainingCredits} Generations Left`
                : "Loading Credits..."}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearChat}
            className="gap-1.5 rounded-xl text-xs font-semibold cursor-pointer text-muted-foreground hover:text-foreground border-border/60 hover:bg-muted"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </Button>
        </div>
      </div>

      {/* Validation Error Alert */}
      {validationError && (
        <div className="mt-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold flex items-center gap-2 shrink-0">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Main Chat Interface */}
      <MagicCard
        mode="gradient"
        gradientColor="rgba(124, 58, 237, 0.05)"
        className="flex-1 mt-4 flex flex-col overflow-hidden rounded-2xl border border-border/40 bg-card/10 backdrop-blur-md shadow-xl"
      >
        <div className="flex-1 flex flex-col min-h-0">
          {/* Messages Viewport */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scrollbar-thin scrollbar-thumb-muted">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center text-muted-foreground space-y-4">
                <div className="p-5 rounded-full bg-primary/10 border border-primary/20 text-primary">
                  <Bot className="w-10 h-10" />
                </div>
                <div className="max-w-md space-y-1">
                  <h3 className="text-base font-bold text-foreground">
                    Welcome to AI Chat Studio
                  </h3>
                  <p className="text-xs leading-relaxed">
                    Ask questions, analyze code, translate languages, write
                    copy, or brainstorm ideas. Start a conversation below!
                  </p>
                </div>
              </div>
            ) : (
              <AnimatePresence initial={false}>
                {messages.map((msg, index) => {
                  const isUser = msg.role === "user";
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex items-start gap-3 ${
                        isUser ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      {/* Avatar */}
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                          isUser
                            ? "bg-primary border-primary/20 text-primary-foreground"
                            : "bg-muted border-border/40 text-muted-foreground"
                        }`}
                      >
                        {isUser ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <Bot className="w-4 h-4" />
                        )}
                      </div>

                      {/* Message Bubble */}
                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm shadow-sm leading-relaxed whitespace-pre-wrap ${
                          isUser
                            ? "bg-primary text-primary-foreground rounded-tr-none"
                            : "bg-muted/80 dark:bg-muted/30 border border-border/20 text-foreground rounded-tl-none"
                        }`}
                      >
                        {msg.parts[0]?.text}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            )}

            {/* Typing Indicator */}
            {isPending && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 flex-row"
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-muted border border-border/40 text-muted-foreground shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-muted/80 dark:bg-muted/30 border border-border/20 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce delay-100" />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce delay-200" />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce delay-300" />
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form Box */}
          <div className="p-4 border-t border-border/30 bg-background/40 backdrop-blur-xs shrink-0">
            <form onSubmit={handleSend} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  if (validationError) setValidationError(null);
                }}
                placeholder="Ask me anything..."
                disabled={isPending}
                className="flex-1 h-12 px-4 rounded-xl border border-border/60 bg-background focus-visible:ring-primary focus-visible:border-primary placeholder:text-muted-foreground/60"
              />
              <Button
                type="submit"
                disabled={isPending || !input.trim()}
                className="h-12 w-12 rounded-xl shrink-0 bg-primary hover:bg-primary/95 text-primary-foreground shadow-lg flex items-center justify-center p-0 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </MagicCard>
    </div>
  );
}
