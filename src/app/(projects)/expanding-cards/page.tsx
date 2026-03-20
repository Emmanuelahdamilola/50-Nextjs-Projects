'use client'

// 'use client' is REQUIRED here because we use useState and onClick.
// Without it, Next.js would try to render this on the server and crash
// because the server has no concept of "clicking" or React state.

import { useState } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

// Each panel has a title and a background image URL.
// We define this data outside the component so it doesn't get
// re-created on every render — it's a constant, not state.
const panels = [
  {
    id: 1,
    title: 'Explore The World',
    bg: 'https://plus.unsplash.com/premium_photo-1670986971794-1ab9ec4beb28?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    title: 'Wild Forest',
    bg: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&auto=format',
  },
  {
    id: 3,
    title: 'Sunny Beach',
    bg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format',
  },
  {
    id: 4,
    title: 'City on Winter',
    bg: 'https://images.unsplash.com/photo-1452868195396-89c1af3b1b2e?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 5,
    title: 'Mountains — Clouds',
    bg: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format',
  },
]

export default function ExpandingCards() {
  // activeId tracks which panel is currently expanded.
  // useState(1) means panel 1 is expanded by default on first render.
  // Every time setActiveId() is called, React re-renders this component
  // with the new activeId value — that's what makes the UI reactive.
  const [activeId, setActiveId] = useState<number>(1)

  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-black">

      {/* Back link */}
      <Link
        href="/"
        className="absolute top-4 left-4 z-10 text-white/60 hover:text-white text-sm transition-colors"
      >
        ← Back
      </Link>

      {panels.map((panel) => {
        const isActive = activeId === panel.id

        return (
          <div
            key={panel.id}
            onClick={() => setActiveId(panel.id)}
            // cn() merges all these classes cleanly.
            // The flex value is what drives the expand/collapse animation.
            // flex-[5] = this panel takes 5x the space of others
            // flex-[0.5] = this panel is very narrow (collapsed)
            // transition-all duration-700 animates between the two states
            className={cn(
              'relative m-2 cursor-pointer overflow-hidden rounded-[30px]',
              'bg-cover bg-center',
              'transition-all duration-700 ease-in-out',
              isActive ? 'flex-[5]' : 'flex-[0.5]',
            )}
            style={{ backgroundImage: `url(${panel.bg})` }}
          >
            {/* Dark gradient overlay at the bottom for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Panel title — only visible when this panel is active */}
            <h3
              className={cn(
                'absolute bottom-5 left-5 text-white text-2xl font-semibold',
                'whitespace-nowrap transition-opacity duration-300',
                // Delay the fade-in so it appears AFTER the expand animation
                isActive ? 'opacity-100 delay-300' : 'opacity-0',
              )}
            >
              {panel.title}
            </h3>
          </div>
        )
      })}
    </div>
  )
}