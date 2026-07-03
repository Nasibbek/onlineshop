import React from 'react'
import { useAppContext } from '../context/Appcontext'
import './toast.css'

const ICONS = {
  success: '✅',
  error: '⚠️',
  info: 'ℹ️'
}

function Toast() {
  const { toasts, removeToast } = useAppContext()

  if (!toasts || toasts.length === 0) return null

  return (
    <div className="toast_container">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`toast_item toast_${toast.type}${toast.closing ? ' toast_closing' : ''}`}
        >
          <span className="toast_icon">{ICONS[toast.type] || ICONS.info}</span>
          <span className="toast_message">{toast.message}</span>
          <button className="toast_close" onClick={() => removeToast(toast.id)}>✕</button>
        </div>
      ))}
    </div>
  )
}

export default Toast