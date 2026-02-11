import * as React from "react"

import {
  ToastActionElement,
  type ToastProps,
} from "@/components/ui/toast-new"   // ← NOUVEAU CHEMIN

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
}

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export function useToast() {
  const [state, setState] = React.useState<State>({ toasts: [] })

  const toast = React.useCallback(
    ({ ...props }: ToastProps) => {
      const id = Math.random().toString(36).substring(2, 9)

      setState((state) => ({
        toasts: [
          ...state.toasts,
          {
            id,
            ...props,
          },
        ].slice(-TOAST_LIMIT),
      }))

      addToRemoveQueue(id)
    },
    [setState]
  )

  return {
    ...state,
    toast,
  }
}
