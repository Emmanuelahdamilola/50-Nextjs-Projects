'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

// Static content — defined outside component so it's not recreated on renders
const boxes = Array.from({ length: 16 }, (_, i) => `Box ${i + 1}`)

export default function ScrollAnimation() {
  // We store refs to all the box elements so IntersectionObserver can watch them.
  // useRef<HTMLDivElement[]>([]) gives us a mutable array of DOM refs.
  const boxRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // IntersectionObserver fires a callback whenever a watched element
    // enters or leaves the viewport. Much better than scroll event listeners
    // because it doesn't fire on every pixel scrolled.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Element is visible — add the 'show' class
            entry.target.classList.add('opacity-100', 'translate-x-0')
            entry.target.classList.remove('opacity-0', 'translate-x-[-150px]')
          } else {
            // Element left the viewport — remove 'show' so it animates again on re-entry
            entry.target.classList.add('opacity-0', 'translate-x-[-150px]')
            entry.target.classList.remove('opacity-100', 'translate-x-0')
          }
        })
      },
      { threshold: 0.1 }, // Fire when 10% of the element is visible
    )

    // Observe every box element
    boxRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    // Cleanup: disconnect the observer when the component unmounts
    return () => observer.disconnect()
  }, [])

  return (
    <div className="overflow-x-hidden bg-[#efedd6] min-h-screen">
      <Link href="/" className="fixed top-4 left-4 text-gray-500 hover:text-gray-800 text-sm transition-colors z-10">
        ← Back
      </Link>

      <h1 className="text-center pt-16 pb-4 text-3xl font-bold text-gray-700">
        Scroll to see animation
      </h1>

      <div className="flex flex-col items-center gap-4 py-8">
        {boxes.map((label, i) => (
          <div
            key={label}
            // Store a ref to this element at index i.
            // This pattern (ref callback) is how you collect refs for a list.
            ref={(el) => { boxRefs.current[i] = el }}
            className={cn(
              'w-[400px] max-w-[90vw] h-[100px]',
              'rounded-xl flex items-center justify-center',
              'text-white font-semibold text-lg',
              'bg-gradient-to-r from-[#2980b9] to-[#6dd5fa]',
              // Initial state: invisible and shifted left
              // IntersectionObserver will add the classes to animate it in
              'opacity-0 -translate-x-[150px]',
              'transition-all duration-500 ease-in-out',
            )}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}