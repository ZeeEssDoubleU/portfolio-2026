import { createContext } from 'react'
export const ProjectDismissContext = createContext<((hash?: string | null) => void) | null>(null)
