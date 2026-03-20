import Link from 'next/link'
import { projects } from '@/lib/projects'
import { cn } from '@/lib/utils'
import type { Project } from '@/types'

// Color maps so each category gets its own visual identity
const categoryColors: Record<Project['category'], string> = {
  'ui-animation':  'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'interactivity': 'bg-teal-500/10   text-teal-400   border-teal-500/20',
  'apps-data':     'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'games':         'bg-amber-500/10  text-amber-400  border-amber-500/20',
}

const difficultyColors: Record<Project['difficulty'], string> = {
  beginner:     'text-green-400',
  intermediate: 'text-yellow-400',
  advanced:     'text-red-400',
}

// This is a SERVER COMPONENT by default — no 'use client' needed.
// Next.js renders this on the server, sends HTML to the browser. Faster first load.
export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-12 max-w-7xl mx-auto">

      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold tracking-tight mb-3">
          50 Projects in 50 Days
        </h1>
        <p className="text-gray-400 text-lg">
          Learning Next.js one project at a time
        </p>
        <div className="flex justify-center gap-6 mt-6 text-sm text-gray-500">
          <span>{projects.length} projects</span>
          <span>•</span>
          <span>App Router</span>
          <span>•</span>
          <span>TypeScript + Tailwind</span>
        </div>
      </div>

      {/* Project grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/${project.slug}`}
            className={cn(
              'group relative rounded-xl border border-white/5 bg-white/3',
              'p-5 hover:bg-white/8 hover:border-white/10',
              'transition-all duration-200',
            )}
          >
            {/* Project number */}
            <span className="text-xs font-mono text-gray-600 mb-3 block">
              {String(project.id).padStart(2, '0')}
            </span>

            {/* Title */}
            <h2 className="font-semibold text-white mb-1 group-hover:text-white/90">
              {project.title}
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-500 mb-4 leading-relaxed">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              {project.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Footer row */}
            <div className="flex items-center justify-between mt-auto">
              <span
                className={cn(
                  'text-xs px-2 py-0.5 rounded-full border',
                  categoryColors[project.category],
                )}
              >
                {project.category.replace('-', ' ')}
              </span>
              <span className={cn('text-xs', difficultyColors[project.difficulty])}>
                {project.difficulty}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}