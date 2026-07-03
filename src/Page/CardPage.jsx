import React, { useState } from 'react'
import Container from '../components/Container'
import { useAppContext } from '../context/Appcontext'
import ConfirmModal from '../components/ConfirmModal'
import useDocumentTitle from '../hooks/useDocumentTitle'
import './page.css'

function CartPage() {
  useDocumentTitle('Savat')
  const { cart, setCart, addOrder, showToast } = useAppContext()
  const [showForm, setShowForm] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [formData, setFormData] = useState({
    fullName: '', phone: '', address: '',
    paymentMethod: 'card', cardNumber: '', cardExpiry: ''
  })
  const [fieldErrors, setFieldErrors] = useState({})

  const updateQuantity = (id, amount) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + amount
        return newQty > 0 ? { ...item, quantity: newQty } : item
      }
      return item
    }))
  }

  const confirmRemove = (id) => setDeleteTarget(id)

  const handleConfirmDelete = () => {
    setCart(prev => prev.filter(item => item.id !== deleteTarget))
    setDeleteTarget(null)
    showToast("Mahsulot savatdan o'chirildi", 'info')
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (fieldErrors[name]) setFieldErrors(prev => ({ ...prev, [name]: null }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const errors = {}
    if (!formData.fullName.trim()) errors.fullName = "F.I.Sh kiritilishi shart"
    if (!formData.phone.trim()) errors.phone = "Telefon raqami kiritilishi shart"
    if (!formData.address.trim()) errors.address = "Manzil kiritilishi shart"
    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) errors.cardNumber = "Karta raqami kiritilishi shart"
      if (!formData.cardExpiry.trim()) errors.cardExpiry = "Amal qilish muddati kiritilishi shart"
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      showToast("Iltimos, belgilangan maydonlarni to'ldiring!", 'error')
      return
    }

    addOrder({
      items: cart,
      totalPrice,
      fullName: formData.fullName,
      phone: formData.phone,
      address: formData.address,
      paymentMethod: formData.paymentMethod
    })

    showToast(`Rahmat, ${formData.fullName}! Buyurtmangiz qabul qilindi. Jami: $${totalPrice}`, 'success')
    setCart([])
    setShowForm(false)
  }

  if (cart.length === 0) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <h2>🛒 Savatingiz hozircha bo'sh</h2>
          <p style={{ color: '#777' }}>Mahsulotlar bo'limidan o'zingizga yoqqanini qo'shing.</p>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      {deleteTarget && (
        <ConfirmModal
          message="Rostdan ham bu mahsulotni savatdan o'chirmoqchimisiz?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      <h1 className="product_title">Savatdagi mahsulotlar</h1>
      <hr />
      <div className="cart_wrapper">
        <div className="cart_items_list">
          {cart.map(item => (
            <div key={item.id} className="cart_item">
              <img src={item.thumbnail} alt={item.title} className="cart_item_img" />
              <div className="cart_item_info">
                <h3 className="cart_item_title">{item.title}</h3>
                <p className="cart_item_price">${item.price} x {item.quantity}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button className="page_btn" style={{ padding: '5px 12px' }} onClick={() => updateQuantity(item.id, -1)}>-</button>
                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{item.quantity}</span>
                <button className="page_btn" style={{ padding: '5px 12px' }} onClick={() => updateQuantity(item.id, 1)}>+</button>
              </div>
              <p className="cart_item_total">${item.price * item.quantity}</p>
              <button onClick={() => confirmRemove(item.id)} className="cart_remove_btn">🗑️</button>
            </div>
          ))}
        </div>

        <div className="cart_summary">
          {!showForm ? (
            <>
              <h3 style={{ margin: '0 0 15px 0' }}>Buyurtma hisobi</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span>Jami mahsulotlar:</span>
                <strong>{cart.reduce((sum, item) => sum + item.quantity, 0)} ta</strong>
              </div>
              <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '15px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', marginBottom: '20px' }}>
                <span>Umumiy summa:</span>
                <strong style={{ color: '#6200ff' }}>${totalPrice}</strong>
              </div>
              <button className="buy-btn" style={{ width: '100%', padding: '12px', borderRadius: '8px' }}
                onClick={() => setShowForm(true)}>
                Xaridni rasmiylashtirish
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="checkout_form" autoComplete="off">
              <h3 style={{ margin: '0 0 5px 0' }}>Rasmiylashtirish</h3>
              <p style={{ fontSize: '14px', color: '#555', margin: '0 0 10px 0' }}>Jami to'lov: <b>${totalPrice}</b></p>

              <label className="form_label">F.I.Sh: *</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange}
                placeholder="Ism Familya" className={`form_input${fieldErrors.fullName ? ' invalid' : ''}`} autoComplete="off" required />
              {fieldErrors.fullName && <p className="field_error">{fieldErrors.fullName}</p>}

              <label className="form_label">Telefon: *</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                placeholder="+998 90 123 45 67" className={`form_input${fieldErrors.phone ? ' invalid' : ''}`} autoComplete="off" required />
              {fieldErrors.phone && <p className="field_error">{fieldErrors.phone}</p>}

              <label className="form_label">Manzil: *</label>
              <input type="text" name="address" value={formData.address} onChange={handleInputChange}
                placeholder="Toshkent sh., Chilonzor" className={`form_input${fieldErrors.address ? ' invalid' : ''}`} autoComplete="off" required />
              {fieldErrors.address && <p className="field_error">{fieldErrors.address}</p>}

              <label className="form_label">To'lov usuli:</label>
              <select name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange} className="form_input">
                <option value="card">💳 Plastik karta</option>
                <option value="cash">💵 Naqd pul</option>
              </select>

              {formData.paymentMethod === 'card' && (
                <div className="card_details_box">
                  <label style={{ fontSize: '13px' }}>Karta raqami:</label>
                  <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange}
                    maxLength="16" placeholder="8600 0000 0000 0000" className={`form_input${fieldErrors.cardNumber ? ' invalid' : ''}`} autoComplete="off" />
                  {fieldErrors.cardNumber && <p className="field_error">{fieldErrors.cardNumber}</p>}

                  <label style={{ fontSize: '13px' }}>Muddati (AA/YY):</label>
                  <input type="text" name="cardExpiry" value={formData.cardExpiry} onChange={handleInputChange}
                    maxLength="5" placeholder="12/28" className={`form_input${fieldErrors.cardExpiry ? ' invalid' : ''}`} autoComplete="off" style={{ width: '90px' }} />
                  {fieldErrors.cardExpiry && <p className="field_error">{fieldErrors.cardExpiry}</p>}
                </div>
              )}

              <div className="form_actions">
                <button type="button" className="page_btn" style={{ flex: '1', padding: '10px' }}
                  onClick={() => setShowForm(false)}>Orqaga</button>
                <button type="submit" className="buy-btn" style={{ flex: '2', margin: '0', padding: '10px', borderRadius: '6px' }}>
                  Tasdiqlash
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Container>
  )
}

export default CartPage
