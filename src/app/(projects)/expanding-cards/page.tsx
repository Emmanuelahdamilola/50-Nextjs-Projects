'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const panels = [
  { id: 1, title: 'Explore The World', bg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&auto=format' },
  { id: 2, title: 'Wild Forest',       bg: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&auto=format' },
  { id: 3, title: 'Sunny Beach',       bg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format' },
  { id: 4, title: 'City on Winter',    bg: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&auto=format' },
  { id: 5, title: 'Mountains',         bg: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format' },
]

export default function ExpandingCards() {
  const [activeId, setActiveId] = useState<number>(1)

  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-black">
      <Link href="/" className="absolute top-4 left-4 z-10 text-white/60 hover:text-white text-sm transition-colors">
        ← Back
      </Link>

      {panels.map((panel) => {
        const isActive = activeId === panel.id

        return (
          // motion.div replaces plain div — flex value animates smoothly
          <motion.div
            key={panel.id}
            onClick={() => setActiveId(panel.id)}
            // animate drives the flex value change with spring physics
            animate={{ flex: isActive ? 5 : 0.5 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative m-2 cursor-pointer overflow-hidden rounded-[30px] bg-cover bg-center"
            style={{ backgroundImage: `url(${panel.bg})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Title fades in with Framer Motion instead of CSS opacity trick */}
            <motion.h3
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
              transition={{ delay: isActive ? 0.3 : 0, duration: 0.3 }}
              className="absolute bottom-5 left-5 text-white text-2xl font-semibold whitespace-nowrap"
            >
              {panel.title}
            </motion.h3>
          </motion.div>
        )
      })}
    </div>
  )
}