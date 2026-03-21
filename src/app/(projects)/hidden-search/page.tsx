'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function HiddenSearch() {
  const [isOpen, setIsOpen] = useState(false)
  // useRef gives us a direct reference to the <input> DOM node.
  // We need this to call .focus() on it programmatically —
  // something you can't do with state alone.
  const inputRef = useRef<HTMLInputElement>(null)

  // useEffect runs AFTER the component renders.
  // When isOpen becomes true, we wait for the CSS transition to start
  // then focus the input so the user can type immediately.
  useEffect(() => {
    if (isOpen) {
      // Small delay so the expand transition starts before focus
      const timer = setTimeout(() => inputRef.current?.focus(), 100)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#2c3e50]">
      <Link href="/" className="absolute top-4 left-4 text-white/40 hover:text-white text-sm transition-colors">
        ← Back
      </Link>

      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          className={cn(
            'bg-transparent border-b-2 border-white/50',
            'text-white placeholder-white/30 outline-none',
            'transition-all duration-300 ease-in-out',
            'py-2 text-base',
            // Width transition: 0 when closed, 200px when open
            // overflow-hidden hides the placeholder text when collapsed
            isOpen ? 'w-[200px] px-4 opacity-100' : 'w-0 px-0 opacity-0',
          )}
        />

        {/* Search / Close button */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="w-[45px] h-[45px] rounded-full bg-white text-[#2c3e50] flex items-center justify-center text-lg cursor-pointer hover:bg-white/90 transition-colors border-none"
        >
          {isOpen ? '✕' : '🔍'}
        </button>
      </div>
    </div>
  )
}