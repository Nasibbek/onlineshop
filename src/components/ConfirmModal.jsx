import { useEffect, useRef } from 'react'
import './component_style.css'

function ConfirmModal({ message, onConfirm, onCancel }) {
  const cancelBtnRef = useRef(null)
  const boxRef = useRef(null)

  // Esc bilan yopish + ochilganda fokusni modal ichiga qo'yish (focus trap boshlanishi)
  useEffect(() => {
    cancelBtnRef.current?.focus()

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onCancel()
        return
      }
      if (e.key === 'Tab' && boxRef.current) {
        const focusable = boxRef.current.querySelectorAll('button, [href], input, select, textarea')
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onCancel])

  return (
    <div className="modal_overlay" onClick={onCancel}>
      <div
        className="modal_box"
        ref={boxRef}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="modal_message">{message}</p>
        <div className="modal_actions">
          <button ref={cancelBtnRef} className="modal_btn cancel" onClick={onCancel}>
            Bekor qilish
          </button>
          <button className="modal_btn confirm" onClick={onConfirm}>
            Ha, o'chirish
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
