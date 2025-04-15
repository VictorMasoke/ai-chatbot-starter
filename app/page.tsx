"use client";

import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, MessageCircle, Send, Loader2, ArrowDownCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "@ai-sdk/react";
import LandingSections from "@/components/LandingSections";

type CustomMessage = Message & {
  type?: "action" | "chat";
  payload?: Record<string, any>;
};

export default function Chat() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showChatIcon, setShowChatIcon] = useState(false);
  const chatIconRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    stop,
    reload,
    error,
    isLoading,
  } = useChat<CustomMessage>({
    api: "/api/gemini",
    onResponse: (response) => {
      if (response.headers.get("Content-Type")?.includes("application/json")) {
        response.json().then((data) => {
          // Handle action responses
          append({
            id: generateId(),
            role: "assistant",
            content: data.message,
            type: "action",
          });
        });
      }
    },
  });

  const append = (message: CustomMessage) => {
    // Add your state management logic here
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowChatIcon(window.scrollY > 200);
      if (window.scrollY <= 200) setIsChatOpen(false);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  return (
    <div className="flex flex-col min-h-screen bg-[#0C1427] text-white">
      <LandingSections />

      <AnimatePresence>
        {showChatIcon && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <Button
              ref={chatIconRef}
              onClick={toggleChat}
              size="icon"
              className="rounded-full size-14 p-2 shadow-lg bg-[#FBBC06] text-[#0C1427] hover:bg-[#048B3F]"
            >
              {!isChatOpen ? (
                <MessageCircle className="size-12" />
              ) : (
                <ArrowDownCircle />
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 z-50 w-[95%] md:w-[500px]"
          >
            <Card className="border-2 border-[#6571E3] bg-[#0C1427] text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-lg font-bold text-[#FBBC06]">
                  Chat with Shantie
                </CardTitle>
                <Button
                  onClick={toggleChat}
                  size="icon"
                  variant="ghost"
                  className="px-2 py-0 text-[#FBBC06]"
                >
                  <X className="size-12" />
                  <span className="sr-only">Close</span>
                </Button>
              </CardHeader>

              <CardContent>
                <ScrollArea className="h-[300px] pr-4">
                  {messages?.map((message, index) => (
                    <div
                      key={index}
                      className={`mb-4 ${
                        message.role === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      <div
                        className={`inline-block p-3 rounded-lg ${
                          message.type === "action"
                            ? "bg-[#6571E3] text-white"
                            : message.role === "user"
                            ? "bg-[#6571E3] text-white"
                            : "bg-[#048B3F] text-white"
                        }`}
                      >
                        {message.type === "action" ? (
                          <div className="flex flex-col gap-1">
                            <span className="font-bold">System Action:</span>
                            {message.content}
                          </div>
                        ) : (
                          <ReactMarkdown
                            children={message.content}
                            remarkPlugins={[remarkGfm]}
                            components={{
                              code({ inline, children, ...props }) {
                                return inline ? (
                                  <code
                                    {...props}
                                    className="bg-gray-800 px-1 rounded text-[#FBBC06]"
                                  >
                                    {children}
                                  </code>
                                ) : (
                                  <pre
                                    {...props}
                                    className="bg-gray-800 p-2 rounded text-[#FBBC06]"
                                  >
                                    {children}
                                  </pre>
                                );
                              },
                            }}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="w-full flex justify-center gap-3">
                      <Loader2 className="animate-spin h-5 w-5 text-[#FBBC06]" />
                      <button
                        className="underline"
                        type="button"
                        onClick={() => stop()}
                      >
                        abort
                      </button>
                    </div>
                  )}
                  {error && (
                    <div className="w-full flex justify-center gap-3">
                      <div>An error occurred</div>
                      <button
                        className="underline"
                        type="button"
                        onClick={() => reload()}
                      >
                        retry
                      </button>
                    </div>
                  )}
                  <div ref={scrollRef} />
                </ScrollArea>
              </CardContent>

              <CardFooter>
                <form onSubmit={handleSubmit} className="flex w-full gap-2">
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type your message here..."
                    className="flex-1 bg-gray-900 text-white border-[#6571E3]"
                  />
                  <Button
                    type="submit"
                    className="size-9 bg-[#FBBC06] hover:bg-[#048B3F] text-[#0C1427]"
                    disabled={isLoading}
                    size="icon"
                  >
                    <Send className="size-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
