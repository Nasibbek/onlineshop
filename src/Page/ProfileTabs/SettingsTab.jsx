import React, { useState } from 'react'
import { useAppContext } from '../../context/Appcontext'

function SettingsTab() {
  const { user, updateProfile, changePassword, showToast, theme, toggleTheme } = useAppContext()

  const [profileForm, setProfileForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    cardNumber: user?.cardNumber || ''
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '', newPassword: '', confirmPassword: ''
  })

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileForm(prev => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordForm(prev => ({ ...prev, [name]: value }))
  }

  const handleProfileSubmit = (e) => {
    e.preventDefault()
    if (!profileForm.firstName || !profileForm.email) {
      showToast("Ism va email maydonlari to'ldirilishi shart!", 'error')
      return
    }
    updateProfile(profileForm)
    showToast("Profil ma'lumotlari yangilandi!", 'success')
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      showToast("Joriy va yangi parolni kiriting!", 'error')
      return
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast("Yangi parol va tasdiqlash mos kelmadi!", 'error')
      return
    }
    const result = changePassword(passwordForm.currentPassword, passwordForm.newPassword)
    showToast(result.message, result.success ? 'success' : 'error')
    if (result.success) {
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    }
  }

  return (
    <div className="settings_wrapper">
      {/* --- Ko'rinish: Qorong'i / Kunduzgi rejim --- */}
      <div className="settings_form">
        <h4 className="settings_form_title">🎨 Ko'rinish</h4>
        <div className="theme_switch_row">
          <div className="theme_switch_label">
            <span className="theme_switch_icon">{theme === 'dark' ? '🌙' : '☀️'}</span>
            <div>
              <p className="theme_switch_title">{theme === 'dark' ? "Qorong'i rejim" : 'Kunduzgi rejim'}</p>
              <p className="theme_switch_sub">Ilova ko'rinishini almashtiring</p>
            </div>
          </div>
          <button
            type="button"
            className={theme === 'dark' ? 'theme_toggle active' : 'theme_toggle'}
            onClick={toggleTheme}
            aria-label="Mavzuni almashtirish"
          >
            <span className="theme_toggle_knob" />
          </button>
        </div>
      </div>

      <form className="settings_form" onSubmit={handleProfileSubmit}>
        <h4 className="settings_form_title">👤 Profil ma'lumotlari</h4>

        <label className="form_label">Ism</label>
        <input type="text" name="firstName" className="form_input"
          value={profileForm.firstName} onChange={handleProfileChange} required />

        <label className="form_label">Familya</label>
        <input type="text" name="lastName" className="form_input"
          value={profileForm.lastName} onChange={handleProfileChange} />

        <label className="form_label">Email</label>
        <input type="email" name="email" className="form_input"
          value={profileForm.email} onChange={handleProfileChange} required />

        <label className="form_label">Karta raqami</label>
        <input type="text" name="cardNumber" className="form_input"
          value={profileForm.cardNumber} onChange={handleProfileChange} />

        <button type="submit" className="settings_save_btn">Saqlash</button>
      </form>

      <form className="settings_form" onSubmit={handlePasswordSubmit}>
        <h4 className="settings_form_title">🔒 Parolni o'zgartirish</h4>

        <label className="form_label">Joriy parol</label>
        <input type="password" name="currentPassword" className="form_input"
          value={passwordForm.currentPassword} onChange={handlePasswordChange} required />

        <label className="form_label">Yangi parol</label>
        <input type="password" name="newPassword" className="form_input"
          value={passwordForm.newPassword} onChange={handlePasswordChange} required />

        <label className="form_label">Yangi parolni tasdiqlang</label>
        <input type="password" name="confirmPassword" className="form_input"
          value={passwordForm.confirmPassword} onChange={handlePasswordChange} required />

        <button type="submit" className="settings_save_btn">Parolni o'zgartirish</button>
      </form>
    </div>
  )
}

export default SettingsTab