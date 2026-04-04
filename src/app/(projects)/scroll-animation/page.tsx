'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const boxes = Array.from({ length: 16 }, (_, i) => `Box ${i + 1}`)

function AnimatedBox({ label }: { label: string }) {
  return (
    <motion.div
      // initial: starts invisible and 150px to the left
      initial={{ opacity: 0, x: -150 }}
      // whileInView: animates to this when the element enters the viewport
      whileInView={{ opacity: 1, x: 0 }}
      // exit back to invisible when it leaves the viewport
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ scale: 1.02, x: 10 }}
      className="w-[400px] max-w-[90vw] h-[100px] rounded-xl flex items-center justify-center text-white font-semibold text-lg bg-gradient-to-r from-[#2980b9] to-[#6dd5fa]"
    >
      {label}
    </motion.div>
  )
}

export default function ScrollAnimation() {
  return (
    <div className="overflow-x-hidden bg-[#efedd6] min-h-screen">
      <Link href="/" className="fixed top-4 left-4 text-gray-500 hover:text-gray-800 text-sm z-10 transition-colors">← Back</Link>

      <h1 className="text-center pt-16 pb-4 text-3xl font-bold text-gray-700">Scroll to see animation</h1>

      <div className="flex flex-col items-center gap-4 py-8">
        {boxes.map((label) => <AnimatedBox key={label} label={label} />)}
      </div>
    </div>
  )
}