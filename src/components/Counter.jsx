import { useEffect, useState } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'

// Ekranga kirganda 0'dan berilgan songacha animatsiyali hisoblaydi
function Counter({ end, duration = 1500, suffix = '', prefix = '' }) {
  const [ref, isVisible] = useScrollReveal()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    let startTime = null
    let frameId

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // ease-out egri chizig'i — oxiriga yaqin sekinlashadi, tabiiyroq ko'rinadi
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(eased * end))
      if (progress < 1) frameId = requestAnimationFrame(step)
    }

    frameId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameId)
  }, [isVisible, end, duration])

  return (
    <span ref={ref} className="counter_value">
      {prefix}{value.toLocaleString()}{suffix}
    </span>
  )
}

export default Counter
