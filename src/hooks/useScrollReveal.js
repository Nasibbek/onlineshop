import { useEffect, useRef, useState } from 'react'

// Element ekranga (viewport'ga) kirganda "ko'rinadi" holatiga o'tkazadi —
// IntersectionObserver orqali, hech qanday qo'shimcha kutubxonasiz
function useScrollReveal(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Agar brauzer IntersectionObserver'ni qo'llamasa — darhol ko'rsatamiz
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(node) // bir marta ko'ringanidan keyin kuzatishni to'xtatamiz
        }
      },
      { threshold: 0.15, ...options }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return [ref, isVisible]
}

export default useScrollReveal
