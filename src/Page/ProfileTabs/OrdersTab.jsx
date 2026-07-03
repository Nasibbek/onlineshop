import React from 'react'
import { useAppContext } from '../../context/Appcontext'

function formatDate(isoString) {
  try {
    const d = new Date(isoString)
    return d.toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' })
  } catch {
    return ''
  }
}

function OrdersTab() {
  const { orders, removeOrder } = useAppContext()

  if (!orders || orders.length === 0) {
    return <p className="empty_sub_text">Hozircha faol buyurtmalar mavjud emas.</p>
  }

  return (
    <div className="orders_list">
      {orders.map(order => (
        <div key={order.id} className="order_card">
          <div className="order_card_header">
            <div>
              <strong>Buyurtma #{order.id}</strong>
              <p className="order_date">{formatDate(order.date)}</p>
            </div>
            <span className="order_status">{order.status}</span>
          </div>

          <div className="order_items_preview">
            {order.items.map(item => (
              <img
                key={item.id}
                src={item.thumbnail}
                alt={item.title}
                title={`${item.title} x${item.quantity}`}
                className="order_item_thumb"
              />
            ))}
          </div>

          <div className="order_card_footer">
            <span>{order.items.reduce((sum, i) => sum + i.quantity, 0)} ta mahsulot</span>
            <strong>${order.totalPrice}</strong>
          </div>

          <div className="order_card_footer" style={{ marginTop: '8px' }}>
            <span className="empty_sub_text">{order.address}</span>
            <button
              className="order_remove_btn"
              onClick={() => {
                if (window.confirm('Buyurtmani o\'chirishni tasdiqlaysizmi?')) {
                  removeOrder(order.id)
                }
              }}
            >
              🗑️ O'chirish
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default OrdersTab