import type { Dispatch, RefObject } from 'react'
import type { StoreAction } from '../store/useStore'
import { useEffect } from "react"


export const useIntersectionObserver = (
  dispatch: Dispatch<StoreAction>,
  isDesktop: boolean,
  target: RefObject<HTMLElement | null>,
  onToggleNav: (dispatch: Dispatch<StoreAction>, visible: boolean) => void
) => {
  useEffect(() => {
    // mount
    const io = new IntersectionObserver(
      ([entry]) => {
        // function dispatches to reducer in useStore.tsx
        if (!isDesktop) {
          onToggleNav(dispatch, !entry.isIntersecting)
        }
      },
      { rootMargin: "-100px" }
    )
    if (target.current) io.observe(target.current)
    // unmount
    return () => io.disconnect()
  }, [dispatch, isDesktop, target, onToggleNav])
}
