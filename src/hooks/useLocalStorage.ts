'use client'

import { useState, useEffect } from 'react'

// A custom hook that works exactly like useState but also persists
// the value to localStorage so it survives page refreshes.
// Usage: const [notes, setNotes] = useLocalStorage('notes', [])
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    // Only runs on first render — tries to load from localStorage
    if (typeof window === 'undefined') return initialValue
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  // Every time storedValue changes, sync it to localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch {
      console.warn(`useLocalStorage: failed to save key "${key}"`)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue] as const
}