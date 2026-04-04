'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const navLinks = [
  { icon: '🏠', label: 'Home',    href: '/'  },
  { icon: 'ℹ️', label: 'About',   href: '#'  },
  { icon: '✉️', label: 'Contact', href: '#'  },
]

export default function RotatingNavigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="overflow-hidden min-h-screen relative bg-[#fafafa]">
      <nav className="fixed top-0 left-0 h-full z-0">
        <ul className="mt-[80px] ml-[16px] list-none">
          {navLinks.map(({ icon, label, href }, i) => (
            // Each nav link staggers in using custom delay
            <motion.li
              key={label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
              transition={{ delay: isOpen ? i * 0.1 : 0, duration: 0.3 }}
              className="mb-6"
            >
              <a href={href} className="flex items-center gap-3 text-gray-700 font-semibold text-lg hover:text-gray-900 transition-colors no-underline">
                <span>{icon}</span>{label}
              </a>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Page rotates using Framer Motion animate */}
      <motion.div
        animate={{
          rotate:     isOpen ? 20  : 0,
          translateX: isOpen ? '40%' : '0%',
          translateY: isOpen ? '10%' : '0%',
        }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 bg-[#fafafa] min-h-screen origin-top-left"
      >
        <motion.button
          onClick={() => setIsOpen((v) => !v)}
          whileTap={{ scale: 0.9 }}
          className="fixed top-4 left-4 z-20 w-[45px] h-[45px] rounded-full flex flex-col items-center justify-center gap-[5px] cursor-pointer border-none"
          animate={{ backgroundColor: isOpen ? '#ffffff' : '#2c3e50' }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ backgroundColor: isOpen ? '#2c3e50' : '#ffffff' }}
              className="block w-[22px] h-[2.5px] rounded"
            />
          ))}
        </motion.button>

        <div className="max-w-[600px] mx-auto px-8 pt-24 pb-16">
          <h1 className="text-4xl font-bold text-[#2c3e50] mb-4">Amazing Article</h1>
          <small className="text-gray-400 block mb-6">Posted on January 1, 2025</small>
          <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format" alt="article" className="w-full rounded-lg mb-6 object-cover h-[220px]" />
          <p className="text-gray-600 leading-relaxed mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium quia in ratione dolores cupiditate, maxime aliquid impedit dolorum eum.</p>
          <Link href="/" className="inline-block mt-8 text-sm text-gray-400 hover:text-gray-700 transition-colors">← Back to all projects</Link>
        </div>
      </motion.div>
    </div>
  )
}