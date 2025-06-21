import React, { useRef, useEffect } from 'react'

// Enables horizontal scroll on vertical wheel scroll
const HorizontalScrollWrapper = ({ children }) => {
  const scrollRef = useRef(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const onWheel = (e) => {
      if (e.deltaY === 0) return
      e.preventDefault()
      el.scrollLeft += e.deltaY // Vertical scroll becomes horizontal scroll
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  return (
    <div
      ref={scrollRef}
      className="flex overflow-x-auto scroll-hidden flex-nowrap space-x-4 px-2"
    >
      {children}
    </div>
  )
}

export default HorizontalScrollWrapper
