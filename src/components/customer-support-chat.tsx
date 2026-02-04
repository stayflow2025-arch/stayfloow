"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CustomerSupportChat() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <>
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

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 bg-white shadow-xl rounded-lg p-4 w-80">
          <p className="font-semibold mb-2">Support client</p>
          <p className="text-sm text-muted-foreground">
            Comment pouvons-nous vous aider ?
          </p>
          <Button
            onClick={handleToggle}
            className="mt-4 w-full"
            variant="secondary"
          >
            Fermer
          </Button>
        </div>
      )}
    </>
  );
}
