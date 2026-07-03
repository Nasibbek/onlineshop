import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAppContext } from '../../context/Appcontext'

function FavoritesTab() {
  const { favorites, removeFavorite } = useAppContext()

  if (!favorites || favorites.length === 0) {
    return <p className="empty_sub_text">Siz saqlab qo'ygan mahsulotlar yo'q.</p>
  }

  return (
    <div className="favorites_list">
      {favorites.map(item => (
        <div key={item.id} className="favorite_card">
          <img src={item.thumbnail} alt={item.title} className="favorite_card_img" />
          <div className="favorite_card_info">
            <NavLink to={`/products/product/${item.id}`} className="favorite_card_title">
              {item.title}
            </NavLink>
            <p className="favorite_card_price">${item.price}</p>
          </div>
          <button
            className="order_remove_btn"
            title="Tanlanganlardan olib tashlash"
            onClick={() => removeFavorite(item.id)}
          >
            🗑️
          </button>
        </div>
      ))}
    </div>
  )
}

export default FavoritesTab