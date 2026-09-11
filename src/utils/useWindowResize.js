import { useEffect } from 'react'
import { onWindowResize } from '../store/useStore'
export const useWindowResize = (dispatch, themeContext) => {
  useEffect(() => {
    const handleResize = () => onWindowResize(dispatch, themeContext)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [themeContext, dispatch])
}
