import * as React from "react"

export type FormMessageProps = {
  name?: any
  className?: string
  children?: React.ReactNode
}

export const FormMessage: React.FC<FormMessageProps> = ({
  className,
  children,
}) => {
  if (!children) return null

  return (
    <p className={className ?? "text-sm font-medium text-destructive"}>
      {children}
    </p>
  )
}

export const FormItem: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <div className="space-y-2">{children}</div>
}
