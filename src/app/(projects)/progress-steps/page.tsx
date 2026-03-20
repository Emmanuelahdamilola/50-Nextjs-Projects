'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'


const TOTAL_STEPS = 5

export default function ProgressSteps() {
  // currentStep ranges from 1 to TOTAL_STEPS.
  // Step 1 = first circle active. Step 4 = all circles active.
  const [currentStep, setCurrentStep] = useState(1)

  // The progress bar width is derived — not stored in state.
  // When currentStep=1 → 0% (no bar between steps yet)
  // When currentStep=4 → 100% (bar fills all the way)
  // Formula: (currentStep - 1) / (TOTAL_STEPS - 1) * 100
  const progressPercent = ((currentStep - 1) / (TOTAL_STEPS - 1)) * 100

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f6f7fb]">

      <Link href="/" className="absolute top-4 left-4 text-gray-400 hover:text-gray-700 text-sm transition-colors">
        ← Back
      </Link>

      {/* Steps container */}
      <div className="relative flex items-center mb-[30px]">

        {/* Background track — the grey line behind the progress bar */}
        <div className="absolute top-1/2 left-0 right-0 h-[4px] bg-gray-200 -translate-y-1/2 z-0" />

        {/* Active progress bar — width animates based on currentStep */}
        <div
          className="absolute top-1/2 left-0 h-[4px] bg-[#3498db] -translate-y-1/2 z-0 transition-all duration-400"
          style={{ width: `${progressPercent}%` }}
        />

        {/* Step circles — rendered by mapping over an array */}
        {/* Array.from({ length: 4 }) creates [undefined, undefined, undefined, undefined] */}
        {/* Then we use the index to get the step number (index + 1) */}
        {Array.from({ length: TOTAL_STEPS }, (_, i) => {
          const step = i + 1
          const isActive = step <= currentStep

          return (
            <div
              key={step}
              className={cn(
                // Each circle is 30x30, white bg, grey border by default
                'relative z-10 w-[30px] h-[30px] rounded-full',
                'flex items-center justify-center',
                'text-sm font-bold border-[3px]',
                'transition-all duration-400',
                // mx-auto spaces them evenly — we'll use gap instead on the wrapper
                step < TOTAL_STEPS ? 'mr-[80px]' : '',
                isActive
                  ? 'bg-[#3498db] border-[#3498db] text-white'   // active: blue fill
                  : 'bg-white border-gray-300 text-gray-400',     // inactive: white
              )}
            >
              {step}
            </div>
          )
        })}
      </div>

      {/* Navigation buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
          // disabled when already at step 1 — no going back further
          disabled={currentStep === 1}
          className={cn(
            'px-8 py-3 rounded-full text-white font-semibold text-sm',
            'transition-all duration-300',
            currentStep === 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-[#3498db] hover:bg-[#2980b9] cursor-pointer',
          )}
        >
          Prev
        </button>

        <button
          onClick={() => setCurrentStep((s) => Math.min(TOTAL_STEPS, s + 1))}
          // disabled when already at the last step
          disabled={currentStep === TOTAL_STEPS}
          className={cn(
            'px-8 py-3 rounded-full text-white font-semibold text-sm',
            'transition-all duration-300',
            currentStep === TOTAL_STEPS
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-[#3498db] hover:bg-[#2980b9] cursor-pointer',
          )}
        >
          Next
        </button>
      </div>

      {/* Step indicator text */}
      <p className="mt-6 text-gray-400 text-sm">
        Step {currentStep} of {TOTAL_STEPS}
      </p>
    </div>
  )
}