<<<<<<< HEAD
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
=======
import * as React from "react";
>>>>>>> aef7fe5b9a758da028e0f2e2d28b30a4b7b5e706

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

<<<<<<< HEAD
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
=======
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 " +
          className
        }
>>>>>>> aef7fe5b9a758da028e0f2e2d28b30a4b7b5e706
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
<<<<<<< HEAD

export { Textarea };
=======
>>>>>>> aef7fe5b9a758da028e0f2e2d28b30a4b7b5e706
