'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function RotatingNavigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    // overflow-hidden on the outer wrapper prevents the rotated container
    // from creating scrollbars as it rotates off screen
    <div className="overflow-hidden min-h-screen relative bg-[#fafafa]">

      {/* Nav menu — sits behind the page, revealed when page rotates */}
      <nav className="fixed top-0 left-0 h-full z-0">
        <ul className="mt-[80px] ml-[16px] list-none">
          {[
            { icon: '🏠', label: 'Home', href: '/' },
            { icon: 'ℹ️', label: 'About' },
            { icon: '✉️', label: 'Contact' },
          ].map(({ icon, label, href }) => (
            <li key={label} className="mb-6">
              
                <a href={href ?? '#'}
                className="flex items-center gap-3 text-gray-700 font-semibold text-lg hover:text-gray-900 transition-colors no-underline"
              >
                <span className="text-xl">{icon}</span>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Page container — this is what rotates */}
      {/* transform-origin: top left means it pivots from the top-left corner */}
      <div
        className={cn(
          'relative z-10 bg-[#fafafa] min-h-screen',
          'transition-transform duration-500 ease-in-out',
          // origin-top-left sets the pivot point to the top-left corner
          'origin-top-left',
        )}
        style={{
          // We use inline style here because Tailwind doesn't support
          // arbitrary rotate values as cleanly as inline styles do.
          // rotate(20deg) tilts the page, translateX(40%) + translateY(10%)
          // shifts it right and down to reveal the nav underneath.
          transform: isOpen
            ? 'rotate(20deg) translateX(40%) translateY(10%)'
            : 'rotate(0deg) translateX(0) translateY(0)',
        }}
      >
        {/* Hamburger / Close button */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          className={cn(
            'fixed top-4 left-4 z-20',
            'w-[45px] h-[45px] rounded-full',
            'flex flex-col items-center justify-center gap-[5px]',
            'cursor-pointer border-none',
            'transition-colors duration-300',
            isOpen ? 'bg-white' : 'bg-[#2c3e50]',
          )}
        >
          {/* Three bars — classic hamburger icon built with divs */}
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cn(
                'block w-[22px] h-[2.5px] rounded transition-colors duration-300',
                isOpen ? 'bg-[#2c3e50]' : 'bg-white',
              )}
            />
          ))}
        </button>

        {/* Page content */}
        <div className="max-w-[600px] mx-auto px-8 pt-24 pb-16">
          <h1 className="text-4xl font-bold text-[#2c3e50] mb-4">
            Amazing Article
          </h1>
          <small className="text-gray-400 block mb-6">Posted on March 20, 2025</small>

          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format"
            alt="article"
            className="w-full rounded-lg mb-6 object-cover h-[220px]"
          />

          <p className="text-gray-600 leading-relaxed mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            quia in ratione dolores cupiditate, maxime aliquid impedit dolorum
            eum ipsum odio, praesentium natus error iusto.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Incidunt facere, repellendus ipsam dolorem ipsum fugit delectus sed
            deserunt voluptatem alias officia possimus deleniti corporis.
          </p>

          <Link
            href="/"
            className="inline-block mt-8 text-sm text-gray-400 hover:text-gray-700 transition-colors"
          >
            ← Back to all projects
          </Link>
        </div>
      </div>
    </div>
  )
}