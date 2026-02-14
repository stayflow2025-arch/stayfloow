import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  useFormContext,
} from "react-hook-form"
import { cn } from "@/lib/utils"

const Form = ({ ...props }) => <form {...props} />

const FormField = ({ control, name, render }) => (
  <Controller control={control} name={name} render={render} />
)

const FormItem = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("space-y-2", className)} {...props}>
      {children}
    </div>
  )
)
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn("text-sm font-medium", className)}
      {...props}
    />
  )
)
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef(
  ({ ...props }, ref) => <Slot ref={ref} {...props} />
)
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
)
FormDescription.displayName = "FormDescription"

const FormMessage = ({ name, className, children }) => {
  const { formState } = useFormContext()
  const error = name ? formState.errors?.[name] : null

  return (
    <p className={cn("text-sm font-medium text-destructive", className)}>
      {error ? String(error.message) : children}
    </p>
  )
}

export {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
