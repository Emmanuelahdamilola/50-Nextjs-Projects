'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function BlurryLoading() {
  const [load, setLoad] = useState(0) // 0 to 100

  useEffect(() => {
    // setInterval runs a callback repeatedly every N milliseconds.
    // We store the interval ID so we can cancel it later.
    const interval = setInterval(() => {
      setLoad((prev) => {
        if (prev >= 100) {
          // Stop the interval once we reach 100
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 30)

    // CLEANUP FUNCTION — this is critical.
    // React calls this when the component unmounts (user navigates away).
    // Without it, the interval keeps running in the background forever
    // even after the user has left the page — a memory leak.
    return () => clearInterval(interval)
  }, []) // Empty array = run this effect only once, on first mount

  // Map load (0-100) → blur (10px-0px): as load increases, blur decreases
  const blurValue = scale(load, 0, 100, 10, 0)
  // Map load (0-100) → opacity (0-1): text fades in as image sharpens
  const opacityValue = scale(load, 0, 100, 0, 1)

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&auto=format)',
        filter: `blur(${blurValue}px)`,
        // transform: scale(1) is a GPU compositing hint — prevents layout shift during blur
        transform: 'scale(1.1)',
      }}
    >
      <Link href="/" className="fixed top-4 left-4 text-white/60 hover:text-white text-sm transition-colors z-10" style={{ filter: 'none' }}>
        ← Back
      </Link>

      <div
        className="text-center text-white z-10"
        style={{ opacity: opacityValue }}
      >
        <h1 className="text-5xl font-bold drop-shadow-lg">Blurry Loading</h1>
        <p className="text-xl mt-2 drop-shadow">{load}%</p>
      </div>
    </div>
  )
}

// Linear interpolation helper:
// Maps a value from one range to another.
// scale(50, 0, 100, 10, 0) → 5  (halfway between 10 and 0)
function scale(val: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  return ((val - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}