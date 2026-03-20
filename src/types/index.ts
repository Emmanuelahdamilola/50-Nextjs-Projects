export type Project = {
  id: number
  title: string
  slug: string
  description: string
  category: 'ui-animation' | 'interactivity' | 'apps-data' | 'games'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tags: string[]
}