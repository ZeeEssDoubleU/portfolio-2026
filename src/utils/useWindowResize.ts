import type { Dispatch } from 'react'
import type { DefaultTheme } from 'styled-components'
import type { StoreAction } from '../store/useStore'
import { useEffect } from 'react'
import { onWindowResize } from '../store/useStore'
export const useWindowResize = (dispatch: Dispatch<StoreAction>, themeContext: DefaultTheme) => {
  useEffect(() => {
    const handleResize = () => onWindowResize(dispatch, themeContext)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [themeContext, dispatch])
}
