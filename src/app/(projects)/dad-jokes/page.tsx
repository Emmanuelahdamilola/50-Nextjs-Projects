'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function DadJokes() {
  const [joke,    setJoke]    = useState<string>('')
  const [loading, setLoading] = useState(false)

  const fetchJoke = useCallback(async () => {
    setLoading(true)
    try {
      const res  = await fetch('https://icanhazdadjoke.com/', {
        headers: { Accept: 'application/json' },
      })
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json() as { joke: string }
      setJoke(data.joke)
    } catch {
      setJoke('Why did the fetch fail? Because the server had a bad day! 😅')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchJoke() }, [fetchJoke])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f7df1e] px-6">
      <Link
        href="/"
        className="absolute top-4 left-4 text-black/40 hover:text-black text-sm transition-colors"
      >
        ← Back
      </Link>

      <div className="max-w-lg w-full text-center">
        {/* Emoji bounces on mount */}
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          className="text-7xl mb-6"
        >
          😂
        </motion.div>

        {/* Joke card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-6 min-h-[140px] flex items-center justify-center"
        >
          {/* AnimatePresence mode="wait":                                   */}
          {/* When loading changes to false and joke changes, the old        */}
          {/* content exits FIRST, then the new content enters.              */}
          {/* Without mode="wait", both animations would play simultaneously.*/}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="spinner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Spinning loader — Framer Motion repeat: Infinity */}
                <motion.div
                  className="w-10 h-10 border-4 border-gray-200 border-t-yellow-400 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 0.8,
                    repeat:   Infinity,
                    ease:     'linear',   // linear so it spins at constant speed
                  }}
                />
              </motion.div>
            ) : (
              // key={joke} is CRITICAL here.
              // When the joke string changes, React sees a "new" element
              // because the key changed. AnimatePresence then:
              // 1. Plays exit on the old element (old joke slides down + fades)
              // 2. Plays enter on the new element (new joke slides up + fades in)
              <motion.p
                key={joke}
                initial={{ opacity: 0, y:  20 }}
                animate={{ opacity: 1, y:   0 }}
                exit={{    opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-gray-800 text-xl leading-relaxed font-medium"
              >
                {joke}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Fetch button */}
        <motion.button
          onClick={fetchJoke}
          disabled={loading}
          // whileHover lifts the button
          whileHover={{ scale: loading ? 1 : 1.05, y: loading ? 0 : -2 }}
          // whileTap simulates pressing the button physically
          whileTap={{ scale: loading ? 1 : 0.95, y: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="bg-black text-[#f7df1e] font-bold text-lg px-10 py-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border-none"
        >
          {loading ? 'Fetching...' : 'Get Another Joke 😂'}
        </motion.button>
      </div>
    </div>
  )
}