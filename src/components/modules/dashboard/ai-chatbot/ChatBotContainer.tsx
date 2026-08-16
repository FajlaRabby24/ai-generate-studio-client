"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { MagicCard } from "@/components/ui/magic-card";
import { GenerationType } from "@/config/constant";
import { envVars } from "@/config/env";
import {
  getConversationChatsById,
  getPreviousConversation,
} from "@/services/dashboard/ai-chatbot/ai-chatbot.service";
import { betterAuthSessionCookieName } from "@/utils/authUtils";
import { getCookie } from "@/utils/cookieUtils";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  ChevronDown,
  History,
  MessageSquarePlus,
  Send,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

export function ChatBotContainer() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch previous conversations
  const { data: previousConversationsRes, isLoading: isLoadingConversations } =
    useQuery({
      queryKey: ["previousConversations"],
      queryFn: () => getPreviousConversation(),
    });

  const previousConversations = previousConversationsRes?.data || [];
  const [isPending, setIsPending] = useState(false);

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

    // Instantly show user message and an empty bot message
    setMessages([...updatedHistory, { role: "model", parts: [{ text: "" }] }]);
    setIsPending(true);

    try {
      const token = await getCookie("accessToken");
      const sessionToken = await getCookie(betterAuthSessionCookieName);
      const response = await fetch(
        `${envVars.API_BASE_URL}/ai-chat-bot/stream`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
            ...(sessionToken && { "x-session-token": sessionToken }),
          },
          credentials: "include",
          body: JSON.stringify({
            message: userMessageText,
            type: GenerationType.AI_CHATBOT,
            ...(activeConversationId && {
              conversationId: activeConversationId,
            }),
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setIsPending(false); // Stream starting

      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");

      if (!reader) throw new Error("No reader available");

      let currentText = "";
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        let boundary = buffer.indexOf("\n\n");
        while (boundary !== -1) {
          const messageChunk = buffer.slice(0, boundary);
          buffer = buffer.slice(boundary + 2);

          if (messageChunk.startsWith("data: ")) {
            const dataStr = messageChunk.slice(6);
            try {
              const data = JSON.parse(dataStr);
              if (data.done) {
                if (data.conversationId && !activeConversationId) {
                  setActiveConversationId(data.conversationId);
                }
              } else if (data.chunk) {
                currentText += data.chunk;
                setMessages((prev) => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1].parts[0].text =
                    currentText;
                  return newMessages;
                });
              }
            } catch (err) {
              // Ignore parse errors from partial chunks
            }
          }
          boundary = buffer.indexOf("\n\n");
        }
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to process chatbot request");
      setIsPending(false);
      // Remove the empty bot message if request failed completely
      setMessages((prev) => prev.slice(0, -1));
    }
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
          </div>
          <p className="text-muted-foreground text-sm">
            Engage in seamless conversational intelligence with our advanced
            chatbot model.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger
              className={
                "flex items-center gap-2 border border-border rounded-xl px-2 py-1 cursor-pointer"
              }
            >
              {/* <button className="gap-2 rounded-xl"> */}
              <History className="w-4 h-4" />
              Conversations
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
              {/* </button> */}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuItem
                className="gap-2 text-primary focus:text-primary font-medium"
                onClick={() => {
                  setActiveConversationId(null);
                  setMessages([]);
                }}
              >
                <MessageSquarePlus className="w-4 h-4" />
                New Chat
              </DropdownMenuItem>
              {previousConversations.length > 0 && (
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase">
                  Previous Chats
                </div>
              )}
              {isLoadingConversations ? (
                <div className="px-4 py-2 text-sm text-muted-foreground">
                  Loading...
                </div>
              ) : (
                <div className="max-h-60 overflow-y-auto">
                  {/* @ts-ignore - response type mismatch */}
                  {previousConversations.map((conv: any) => (
                    <DropdownMenuItem
                      key={conv.id}
                      className={`gap-2 truncate cursor-pointer ${
                        activeConversationId === conv.id
                          ? "bg-accent/50 text-accent-foreground"
                          : ""
                      }`}
                      onClick={async () => {
                        setActiveConversationId(conv.id);
                        try {
                          const chatRes = await getConversationChatsById(
                            conv.id,
                          );
                          if (chatRes?.success && chatRes.data?.chatHistory) {
                            // The server pushes arrays of [userMessage, botMessage] to the DB,
                            // so we need to flatten the history before displaying.
                            const history = chatRes.data.chatHistory;
                            const flatHistory = Array.isArray(history[0])
                              ? history.flat(Infinity)
                              : history;
                            setMessages(flatHistory as any[]);
                          }
                        } catch (error) {
                          toast.error("Failed to load conversation history");
                        }
                      }}
                    >
                      <Bot className="w-4 h-4 shrink-0 opacity-70" />
                      <span className="truncate">
                        {conv.title || "New Conversation"}
                      </span>
                    </DropdownMenuItem>
                  ))}
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Chat Interface */}
      <MagicCard
        mode="gradient"
        gradientColor="rgba(124, 58, 237, 0.05)"
        className="flex-1 mt-4 flex flex-col overflow-hidden rounded-2xl border border-border/40 bg-card/10 backdrop-blur-md shadow-xl [&>div.relative.z-40]:flex-grow [&>div.relative.z-40]:flex [&>div.relative.z-40]:flex-col [&>div.relative.z-40]:min-h-0"
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
                        {msg?.parts[0]?.text}
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
