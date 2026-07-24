import { useState, useEffect, useRef, useCallback } from 'react'
import './carousel.css'

// Universal karusel — slaydlar sifatida istalgan React elementini qabul qiladi.
// Avtomatik aylanish, nuqtali navigatsiya, chap/o'ng strelkalar va
// telefonda barmoq bilan surish (swipe) qo'llab-quvvatlanadi.
function Carousel({ slides, autoPlay = true, interval = 5000, showArrows = true, showDots = true, startIndex = 0 }) {
  const [current, setCurrent] = useState(startIndex)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef(null)
  const total = slides.length

  useEffect(() => {
    setCurrent(startIndex)
  }, [startIndex])

  const goTo = useCallback((index) => {
    setCurrent(((index % total) + total) % total)
  }, [total])

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  useEffect(() => {
    if (!autoPlay || isPaused || total <= 1) return
    const timer = setInterval(next, interval)
    return () => clearInterval(timer)
  }, [autoPlay, isPaused, interval, next, total])

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) { diff > 0 ? next() : prev() }
    touchStartX.current = null
  }

  return (
    <div
      className="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="carousel_track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map((slide, i) => (
          <div className="carousel_slide" key={i} aria-hidden={current !== i}>
            {slide}
          </div>
        ))}
      </div>

      {showArrows && total > 1 && (
        <>
          <button className="carousel_arrow carousel_arrow_left" onClick={prev} aria-label="Oldingi">‹</button>
          <button className="carousel_arrow carousel_arrow_right" onClick={next} aria-label="Keyingi">›</button>
        </>
      )}

      {showDots && total > 1 && (
        <div className="carousel_dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={i === current ? 'carousel_dot active' : 'carousel_dot'}
              onClick={() => goTo(i)}
              aria-label={`${i + 1}-slayd`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Carousel
