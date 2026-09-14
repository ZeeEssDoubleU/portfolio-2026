import 'styled-components'
import type { theme } from '../styles/theme'
type PortfolioTheme = typeof theme
declare module 'styled-components' { export interface DefaultTheme extends PortfolioTheme {} }
