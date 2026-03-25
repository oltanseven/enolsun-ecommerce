'use client'

import { useState, useEffect, useCallback } from 'react'

type ToastType = 'success' | 'error' | 'info'

interface ToastMessage {
  id: number
  text: string
  type: ToastType
}

let toastId = 0
let addToastExternal: ((text: string, type: ToastType) => void) | null = null

export function showToast(text: string, type: ToastType = 'info') {
  if (addToastExternal) {
    addToastExternal(text, type)
  }
}

export default function ToastProvider() {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const addToast = useCallback((text: string, type: ToastType) => {
    const id = ++toastId
    setToasts((prev) => [...prev, { id, text, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  useEffect(() => {
    addToastExternal = addToast
    return () => { addToastExternal = null }
  }, [addToast])

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-20 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => {
        const bgClass =
          toast.type === 'success'
            ? 'bg-success-base'
            : toast.type === 'error'
            ? 'bg-error-base'
            : 'bg-primary-500'

        return (
          <div
            key={toast.id}
            className={`${bgClass} text-white px-4 py-3 rounded-xl shadow-align-lg text-sm font-medium pointer-events-auto animate-slide-in-right`}
          >
            {toast.text}
          </div>
        )
      })}
    </div>
  )
}
