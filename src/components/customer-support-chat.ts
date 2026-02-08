"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare } from "lucide-react";

export function CustomerSupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages] = useState<string[]>([
    "Bonjour ! Comment pouvons-nous vous aider aujourd’hui ?",
  ]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <>
      {/* Bouton flottant */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 transition-transform duration-300 ease-in-out",
          isOpen ? "scale-0" : "scale-100"
        )}
      >
        <Button
          onClick={handleToggle}
          size="lg"
          className="rounded-full shadow-lg w-16 h-16"
        >
          <MessageSquare className="h-7 w-7" />
        </Button>
      </div>

      {/* Fenêtre de chat */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] max-w-md transition-all duration-300 ease-in-out",
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        <Card className="flex flex-col h-[60vh] shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>
                  <MessageSquare />
                </AvatarFallback>
              </Avatar>

              <div>
                <CardTitle className="text-base font-semibold">
                  Assistant StayFloow
                </CardTitle>

                <p className="text-xs text-green-500 flex items-center gap-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  En ligne
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent
            ref={scrollAreaRef}
            className="flex-1 overflow-y-auto p-4 space-y-2"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className="bg-muted px-3 py-2 rounded-md text-sm text-muted-foreground"
              >
                {msg}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
