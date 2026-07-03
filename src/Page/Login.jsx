import React, { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { useAppContext } from '../context/Appcontext'
import useDocumentTitle from '../hooks/useDocumentTitle'
import './logreg.css'

function Login() {
  useDocumentTitle('Tizimga kirish')
  const { loginUser, handleLoginSuccess, showToast } = useAppContext()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [fieldErrors, setFieldErrors] = useState({})
  const navigate = useNavigate()

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
    if (fieldErrors[field]) setFieldErrors(prev => ({ ...prev, [field]: null }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const result = loginUser(formData.email, formData.password)
    if (!result.success) {
      setFieldErrors({ form: result.message })
      showToast(result.message, 'error')
      return
    }

    // parolni foydalanuvchi profilida saqlab yurmaymiz
    const { password, ...safeUser } = result.user
    handleLoginSuccess(safeUser)
    navigate('/profile')
  }

  return (
    <div className="auth_container">
      <form className="auth_form" onSubmit={handleSubmit}>
        <h2>Tizimga kirish</h2>
        <p>Email va parolingizni kiriting</p>

        {fieldErrors.form && <p className="field_error" style={{ textAlign: 'center' }}>{fieldErrors.form}</p>}

        <label className="form_label">Email</label>
        <input type="email" className="form_input" required
          value={formData.email}
          onChange={handleChange('email')} />

        <label className="form_label">Parol</label>
        <input type="password" className="form_input" required
          value={formData.password}
          onChange={handleChange('password')} />

        <button type="submit" className="auth_btn">Kirish</button>

        <p className="auth_switch">
          Akkauntingiz yo'qmi? <NavLink to="/register">Ro'yxatdan o'tish📝</NavLink>
        </p>
      </form>
    </div>
  )
}

export default Login
