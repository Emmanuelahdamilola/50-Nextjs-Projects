'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

// The type for which side is hovered
type Side = 'left' | 'right' | null

// ─── Data ─────────────────────────────────────────────────────────────────────
const sides = [
  {
    id:      'left' as Side,
    label:   'PlayStation',
    color:   '#0072ce',           // PlayStation blue
    image:   'https://images.unsplash.com/photo-1580327344181-c1163234e5a0?w=1200&auto=format',
    emoji:   '🎮',
  },
  {
    id:      'right' as Side,
    label:   'Xbox',
    color:   '#107c10',           // Xbox green
    image:   'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=1200&auto=format',
    emoji:   '🕹️',
  },
]

export default function SplitLandingPage() {
  const [hover, setHover] = useState<Side>(null)

  return (
    <div
      className="relative flex h-screen w-full overflow-hidden"
      // When mouse leaves the entire container, reset to equal split
      onMouseLeave={() => setHover(null)}
    >
      <Link
        href="/"
        className="absolute top-4 left-1/2 -translate-x-1/2 z-20 text-white/60 hover:text-white text-sm transition-colors"
      >
        ← Back
      </Link>

      {sides.map((side) => {
        // Calculate the flex value for THIS side based on hover state.
        //
        // hover === this side  → expanded  (flex: 3)
        // hover === other side → collapsed (flex: 0.8)
        // hover === null       → equal     (flex: 1)
        //
        // Both sides share the same logic — they just get opposite values.
        // This is the power of deriving everything from one state variable.
        const flexValue =
          hover === side.id     ? 3    :
          hover !== null        ? 0.8  :
          1

        return (
          <motion.div
            key={side.id}
            onMouseEnter={() => setHover(side.id)}
            // ── The core animation ──────────────────────────────────────────
            // animate={{ flex }} drives the layout change.
            // Framer Motion animates the flex CSS property directly.
            // Spring physics makes it feel bouncy and physical —
            // much better than CSS ease-in-out curves.
            animate={{ flex: flexValue }}
            transition={{
              type:      'spring',
              stiffness: 150,   // how snappy (higher = faster snap)
              damping:   25,    // how much bounce (higher = less bounce)
            }}
            className="relative flex items-center justify-center h-full cursor-pointer overflow-hidden"
          >
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${side.image})` }}
            />

            {/* Color overlay — semi-transparent brand color */}
            <motion.div
              className="absolute inset-0"
              animate={{
                // When this side is hovered, overlay is slightly more transparent
                // so the image shows through more
                opacity: hover === side.id ? 0.5 : 0.65,
              }}
              transition={{ duration: 0.3 }}
              style={{ backgroundColor: side.color }}
            />

            {/* Content */}
            <div className="relative z-10 text-center select-none">
              {/* Emoji scales up when hovered */}
              <motion.div
                animate={{
                  scale: hover === side.id ? 1.3 : 1,
                  y:     hover === side.id ? -10 : 0,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="text-6xl mb-4"
              >
                {side.emoji}
              </motion.div>

              {/* Label — slides up and grows on hover */}
              <motion.h2
                animate={{
                  scale:       hover === side.id ? 1.15 : 1,
                  letterSpacing: hover === side.id ? '0.2em' : '0.1em',
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="text-white text-4xl font-black uppercase drop-shadow-lg"
              >
                {side.label}
              </motion.h2>

              {/* "Click to explore" fades in only when this side is hovered */}
              <motion.p
                animate={{
                  opacity: hover === side.id ? 1 : 0,
                  y:       hover === side.id ? 0 : 10,
                }}
                transition={{ duration: 0.3 }}
                className="text-white/70 text-sm mt-3 font-medium"
              >
                Click to explore →
              </motion.p>
            </div>
          </motion.div>
        )
      })}

      {/* ── Center divider line ── */}
      {/* This stays fixed in the center regardless of which side is expanded */}
      <div className="absolute top-0 left-1/2 h-full w-[4px] bg-white z-10 -translate-x-1/2 pointer-events-none" />
    </div>
  )
}