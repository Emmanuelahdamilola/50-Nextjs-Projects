'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type Side = 'left' | 'right' | null

export default function SplitLandingPage() {
  // hover tracks which side the user is hovering.
  // null means neither side is hovered — equal split.
  const [hover, setSide] = useState<Side>(null)

  return (
    <div
      className="relative flex h-screen w-full overflow-hidden"
      onMouseLeave={() => setSide(null)}
    >
      <Link href="/" className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 hover:text-white text-sm z-20 transition-colors">
        ← Back
      </Link>

      {/* Left side — PlayStation */}
      <div
        onMouseEnter={() => setSide('left')}
        className={cn(
          'flex items-center justify-center h-full cursor-pointer',
          'transition-all duration-1000 ease-in-out',
          'bg-[#000] relative overflow-hidden',
          hover === 'left' ? 'w-[75%]' : hover === 'right' ? 'w-[25%]' : 'w-1/2',
        )}
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1580327344181-c1163234e5a0?w=1200&auto=format)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#0072ce]/60" />
        <h2 className="relative z-10 text-white text-5xl font-black tracking-widest uppercase drop-shadow-lg">
          PlayStation
        </h2>
      </div>

      {/* Center divider line */}
      <div className="absolute top-0 left-1/2 h-full w-[5px] bg-white z-10 transition-all duration-1000" />

      {/* Right side — Xbox */}
      <div
        onMouseEnter={() => setSide('right')}
        className={cn(
          'flex items-center justify-center h-full cursor-pointer',
          'transition-all duration-1000 ease-in-out',
          'bg-[#000] relative overflow-hidden',
          hover === 'right' ? 'w-[75%]' : hover === 'left' ? 'w-[25%]' : 'w-1/2',
        )}
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=1200&auto=format)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#107c10]/60" />
        <h2 className="relative z-10 text-white text-5xl font-black tracking-widest uppercase drop-shadow-lg">
          Xbox
        </h2>
      </div>
    </div>
  )
}