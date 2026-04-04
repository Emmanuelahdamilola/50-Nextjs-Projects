'use client'

import { useState, useEffect } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import Link from 'next/link'

export default function BlurryLoading() {
  const [load, setLoad] = useState(0)

  // useSpring creates a physics-based spring animation for the load value
  // It smooths out the jumpy setInterval increments into fluid motion
  const springLoad = useSpring(0, { stiffness: 40, damping: 15 })

  // useTransform maps springLoad (0→100) to blur (10px→0px)
  const blur = useTransform(springLoad, [0, 100], [10, 0])
  // and to opacity (0→1)
  const opacity = useTransform(springLoad, [0, 100], [0, 1])

  useEffect(() => {
    const interval = setInterval(() => {
      setLoad((prev) => {
        const next = prev >= 100 ? 100 : prev + 1
        springLoad.set(next)   // drive the spring with the raw value
        if (next >= 100) clearInterval(interval)
        return next
      })
    }, 30)
    return () => clearInterval(interval)
  }, [springLoad])

  return (
    <motion.div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&auto=format)',
        // motion style props accept MotionValues directly — no manual state needed
        filter: useTransform(blur, (b) => `blur(${b}px)`),
        scale: 1.1,
      }}
    >
      <Link href="/" className="fixed top-4 left-4 text-white/60 hover:text-white text-sm z-10 transition-colors" style={{ filter: 'none' }}>← Back</Link>

      <motion.div className="text-center text-white z-10" style={{ opacity }}>
        <h1 className="text-5xl font-bold drop-shadow-lg">Blurry Loading</h1>
        <motion.p className="text-xl mt-2 drop-shadow">{load}%</motion.p>
      </motion.div>
    </motion.div>
  )
}