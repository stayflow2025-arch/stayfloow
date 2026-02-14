"use client"

import * as React from "react"
import { Controller, FormProvider, useFormContext } from "react-hook-form"

export const Form = FormProvider

export const FormField = Controller

export const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={className} {...props} />
))
FormItem.displayName = "FormItem"

export const FormLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label ref={ref} className={className} {...props} />
))
FormLabel.displayName = "FormLabel"

export const FormControl = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => <div ref={ref} {...props} />)
FormControl.displayName = "FormControl"

export const FormMessage: React.FC<{
  name?: string
  className?: string
  children?: React.ReactNode
}> = ({ children, className }) => {
  const { formState } = useFormContext()
  if (!children && !formState.errors) return null
  return (
    <p className={className ?? "text-sm text-red-500"}>
      {children}
    </p>
  )
}
