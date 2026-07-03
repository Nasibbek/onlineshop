import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/Appcontext'
import OrdersTab from './ProfileTabs/OrdersTab'
import FavoritesTab from './ProfileTabs/FavoritesTab'
import SettingsTab from './ProfileTabs/SettingsTab'
import useDocumentTitle from '../hooks/useDocumentTitle'
import './logreg.css'

function Profile() {
  useDocumentTitle('Profil')
  const { user, handleLogoutSuccess } = useAppContext()
  const navigate = useNavigate()

  // Qaysi bo'lim ochiq turishini saqlaymiz: null | 'orders' | 'favorites' | 'settings'
  const [activeTab, setActiveTab] = useState(null)

  const handleLogout = () => {
    handleLogoutSuccess()
    navigate('/')
  }

  const toggleTab = (tab) => {
    setActiveTab(prev => (prev === tab ? null : tab))
  }

  if (!user || typeof user !== 'object') {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <p>Siz tizimga kirmagansiz.</p>
        <button onClick={() => navigate('/login')}>Kirish sahifasiga o'tish</button>
      </div>
    )
  }

  return (
    <div className="profile_container1">
      <div className="profile_card_main">
        <div className="profile_header">
          <div className="profile_avatar">👤</div>
          <h2>{user.firstName} {user.lastName}</h2>
          <p className="profile_email">{user.email}</p>
        </div>

        <div className="profile_info_body">
          <div className="info_row">
            <span>💳 Karta raqami:</span>
            <strong>{user.cardNumber}</strong>
          </div>
        </div>

        <div className="profile_sections">
          <div className="section_tab" onClick={() => toggleTab('orders')}>
            <h3>📦 Meni buyurtmalarim</h3>
            {activeTab === 'orders' && (
              <div className="section_tab_content" onClick={(e) => e.stopPropagation()}>
                <OrdersTab />
              </div>
            )}
          </div>

          <div className="section_tab" onClick={() => toggleTab('favorites')}>
            <h3>❤️ Tanlangan mahsulotlar</h3>
            {activeTab === 'favorites' && (
              <div className="section_tab_content" onClick={(e) => e.stopPropagation()}>
                <FavoritesTab />
              </div>
            )}
          </div>

          <div className="section_tab" onClick={() => toggleTab('settings')}>
            <h3>⚙️ Sozlamalar va Xavfsizlik</h3>
            {activeTab === 'settings' && (
              <div className="section_tab_content" onClick={(e) => e.stopPropagation()}>
                <SettingsTab />
              </div>
            )}
          </div>
        </div>

        <button className="profile_logout_btn" onClick={handleLogout}>
          Tizimdan chiqish 🚪
        </button>
      </div>
    </div>
  )
}

export default Profile