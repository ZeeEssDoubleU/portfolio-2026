export interface ScrollPosition { x: number; y: number }
export interface SavedScroll extends ScrollPosition { expanded: boolean }
export interface ProjectData {
  slug: string
  title: string
  description: string
  moreInfo: string | null
  projectLink: string
  codeLink: string
  features: string[]
  tech: string[]
  image: { src: string; aspectRatio: number }
}
declare global {
  interface Window {
    __portfolioRestore?: { url: string; hash: string; saved: SavedScroll | null }
  }
}
