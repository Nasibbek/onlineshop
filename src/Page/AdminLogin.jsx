import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/Appcontext'
import './logreg.css'

function AdminLogin() {
  const { handleAdminLogin, showToast } = useAppContext()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const ok = handleAdminLogin(form.email, form.password)
    if (ok) {
      showToast("Admin paneliga xush kelibsiz!", 'success')
      navigate('/admin')
    } else {
      setError("Email yoki parol noto'g'ri!")
    }
  }

  return (
    <div className="auth_container">
      <form className="auth_form" onSubmit={handleSubmit}>
        <div style={{ textAlign: 'center', marginBottom: '4px' }}>
          <span style={{ fontSize: '48px' }}>🛡️</span>
        </div>
        <h2>Admin Kirish</h2>
        <p>Faqat administratorlar uchun</p>

        {error && (
          <div style={{
            background: '#fff1f2', border: '1px solid #fda4af',
            color: '#e11d48', borderRadius: '10px', padding: '10px 14px',
            fontSize: '14px', textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <label className="form_label">Admin Email</label>
        <input type="email" className="form_input" required
          placeholder="admin@shop.uz"
          value={form.email}
          onChange={e => { setForm({ ...form, email: e.target.value }); setError('') }} />

        <label className="form_label">Parol</label>
        <input type="password" className="form_input" required
          placeholder="••••••••"
          value={form.password}
          onChange={e => { setForm({ ...form, password: e.target.value }); setError('') }} />

        <button type="submit" className="auth_btn" style={{ background: '#6200ff' }}>
          🔐 Kirish
        </button>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="auth_btn"
          style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', marginTop: '8px' }}
        >
          ← Bosh sahifaga qaytish
        </button>


        <p className="auth_switch" style={{ fontSize: '12px', color: '#94a3b8' }}>
          admin@shop.uz / admin123
        </p>
      </form>
    </div>
  )
}

export default AdminLogin
