import React from 'react'
import { useRouteError, useNavigate, isRouteErrorResponse } from 'react-router-dom'
import './component_style.css'

// Router darajasidagi xatolar uchun (createBrowserRouter errorElement)
export function RouteErrorBoundary() {
  const error = useRouteError()
  const navigate = useNavigate()

  const message = isRouteErrorResponse(error)
    ? `${error.status} — ${error.statusText}`
    : error?.message || "Noma'lum xatolik yuz berdi"

  return (
    <div className="error_boundary_screen">
      <div className="error_boundary_box">
        <span className="error_boundary_icon">⚠️</span>
        <h2>Nimadir noto'g'ri ketdi</h2>
        <p>{message}</p>
        <div className="error_boundary_actions">
          <button className="page_btn" onClick={() => navigate(-1)}>Orqaga</button>
          <button className="buy-btn" onClick={() => navigate('/')}>Bosh sahifaga</button>
        </div>
      </div>
    </div>
  )
}

// Render vaqtidagi (masalan JS exception) xatolarni ushlab qolish uchun
// class component sifatida — hooks bilan Error Boundary yasab bo'lmaydi
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error_boundary_screen">
          <div className="error_boundary_box">
            <span className="error_boundary_icon">⚠️</span>
            <h2>Nimadir noto'g'ri ketdi</h2>
            <p>Sahifani qayta yuklab ko'ring.</p>
            <div className="error_boundary_actions">
              <button className="buy-btn" onClick={() => window.location.reload()}>
                Qayta yuklash
              </button>
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
