'use client'

const STORAGE_KEY = 'enolsun_recently_viewed'
const MAX_ITEMS = 12

export function useRecentlyViewed() {
  function getViewed(): string[] {
    if (typeof window === 'undefined') return []
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return []
      const parsed = JSON.parse(raw)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }

  function addViewed(productId: string) {
    if (typeof window === 'undefined') return
    try {
      const current = getViewed()
      const filtered = current.filter((id) => id !== productId)
      const updated = [productId, ...filtered].slice(0, MAX_ITEMS)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch {
      // silently fail
    }
  }

  return { getViewed, addViewed }
}
