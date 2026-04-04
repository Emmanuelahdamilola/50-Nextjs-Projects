'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

type KeyInfo = {
  key:     string
  keyCode: number
  code:    string
}
const containerVariants = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
  exit: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
}

const cardVariants = {
  hidden:  { opacity: 0, y: 30, scale: 0.85 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 400, damping: 22 },
  },
  exit: {
    opacity: 0, y: -20, scale: 0.9,
    transition: { duration: 0.15 },
  },
}

export default function EventKeycodes() {
  const [keyInfo, setKeyInfo] = useState<KeyInfo | null>(null)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      setKeyInfo({
        key:     e.key === ' ' ? 'Space' : e.key,
        keyCode: e.keyCode,
        code:    e.code,
      })
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const cards = keyInfo
    ? [
        { label: 'Key',     value: keyInfo.key             },
        { label: 'Code',    value: keyInfo.code            },
        { label: 'KeyCode', value: String(keyInfo.keyCode) },
      ]
    : []

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#2c3e50]">
      <Link
        href="/"
        className="absolute top-4 left-4 text-white/40 hover:text-white text-sm transition-colors"
      >
        ← Back
      </Link>

      <AnimatePresence mode="wait">
        {keyInfo === null ? (
          // Prompt — shown before any key is pressed
          <motion.h2
            key="prompt"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1   }}
            exit={{    opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="text-white/70 text-2xl font-light tracking-widest uppercase"
          >
            Press any key
          </motion.h2>
        ) : (

          <motion.div
            key={keyInfo.key + keyInfo.code}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex gap-6 flex-wrap justify-center px-6"
          >
            {cards.map(({ label, value }) => (
              <motion.div
                key={label}
                variants={cardVariants}
                whileHover={{ scale: 1.05, y: -4 }}
                className="bg-white/10 backdrop-blur rounded-2xl px-12 py-8 text-center min-w-[160px]"
              >
                <div className="text-white text-4xl font-bold mb-3 font-mono">
                  {value}
                </div>
                <div className="text-white/50 uppercase tracking-widest text-xs">
                  {label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {keyInfo && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10 text-white/30 text-sm"
        >
          Press a different key to update
        </motion.p>
      )}
    </div>
  )
}