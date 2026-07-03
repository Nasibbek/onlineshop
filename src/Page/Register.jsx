import React, { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { useAppContext } from '../context/Appcontext'
import useDocumentTitle from '../hooks/useDocumentTitle'
import './logreg.css'

function Register() {
  useDocumentTitle("Ro'yxatdan o'tish")
  const { registerUser, handleLoginSuccess, showToast } = useAppContext()
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', cardNumber: '', password: ''
  })
  const [fieldErrors, setFieldErrors] = useState({})
  const navigate = useNavigate()

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
    if (fieldErrors[field]) setFieldErrors(prev => ({ ...prev, [field]: null }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (formData.password.length < 4) {
      setFieldErrors({ password: "Parol kamida 4 belgidan iborat bo'lishi kerak" })
      return
    }

    const userData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      cardNumber: formData.cardNumber.trim()
    }

    const result = registerUser(userData, formData.password)
    if (!result.success) {
      setFieldErrors({ email: result.message })
      showToast(result.message, 'error')
      return
    }

    // Eski bitta-foydalanuvchili sxemaga moslik uchun ham saqlaymiz
    // (masalan, "Parolni o'zgartirish" funksiyasi shu bilan ishlaydi)
    localStorage.setItem('userPassword', formData.password)

    const { password, ...safeUser } = result.user
    handleLoginSuccess(safeUser)
    navigate('/profile')
  }

  return (
    <div className="auth_container">
      <form className="auth_form" onSubmit={handleSubmit}>
        <h2>Ro'yxatdan o'tish</h2>
        <p>Ma'lumotlaringizni kiriting</p>

        <label className="form_label">Ism</label>
        <input type="text" className="form_input" required
          value={formData.firstName}
          onChange={handleChange('firstName')} />

        <label className="form_label">Familya</label>
        <input type="text" className="form_input" required
          value={formData.lastName}
          onChange={handleChange('lastName')} />

        <label className="form_label">Email</label>
        <input type="email" className={`form_input${fieldErrors.email ? ' invalid' : ''}`} required
          value={formData.email}
          onChange={handleChange('email')} />
        {fieldErrors.email && <p className="field_error">{fieldErrors.email}</p>}

        <label className="form_label">Karta raqami</label>
        <input type="text" className="form_input" placeholder="8600 ...." required
          value={formData.cardNumber}
          onChange={handleChange('cardNumber')} />

        <label className="form_label">Parol</label>
        <input type="password" className={`form_input${fieldErrors.password ? ' invalid' : ''}`} required
          value={formData.password}
          onChange={handleChange('password')} />
        {fieldErrors.password && <p className="field_error">{fieldErrors.password}</p>}

        <button type="submit" className="auth_btn">Ro'yxatdan o'tish</button>

        <p className="auth_switch">
          Akkauntingiz bormi? <NavLink to="/login">Kirish🔑</NavLink>
        </p>
      </form>
    </div>
  )
}

export default Register
