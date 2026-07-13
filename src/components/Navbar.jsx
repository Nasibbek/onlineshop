// src/components/Navbar.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/Appcontext";
import "./component_style.css";

function Navbar({ cart = [], isLoggedIn, user }) {
  const { isAdmin } = useAppContext();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="nav">
      <div className="nav_top_row">
        <NavLink to="/" className="nav_brand" onClick={closeMenu}>🛍️ ShopUZ</NavLink>

        {/* Mobil menyu tugmasi — faqat kichik ekranlarda ko'rinadi */}
        <button
          className={menuOpen ? "hamburger_btn open" : "hamburger_btn"}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Menyuni ochish"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Fon (overlay) — menyu ochiq bo'lganda tashqarisini bosib yopish uchun */}
      {menuOpen && <div className="menu_overlay" onClick={closeMenu}></div>}

      <ul className={menuOpen ? "menu menu_open" : "menu"} onClick={closeMenu}>
        <li className="menu_item"><NavLink to="/" className="menu_link">Home</NavLink></li>
        <li className="menu_item"><NavLink to="/servise" className="menu_link">Servise</NavLink></li>
        <li className="menu_item"><NavLink to="/help" className="menu_link">Help</NavLink></li>
        <li className="menu_item"><NavLink to="/products" className="menu_link">Products</NavLink></li>
        <li className="menu_item">
          <NavLink to="/cart" className="menu_link cart_link">
            🛒 Savat
            {totalItems > 0 && <span className="cart_badge">{totalItems}</span>}
          </NavLink>
        </li>

        {isAdmin ? (
          <li className="menu_item">
            <NavLink to="/admin" className="nav_auth_btn admin_nav_btn">
              🛡️ Admin Panel
            </NavLink>
          </li>
        ) : (
          <li className="menu_item">
            <NavLink to="/admin/login" className="nav_auth_btn admin_nav_btn">
              🛡️ Admin
            </NavLink>
          </li>
        )}

        {isLoggedIn && user ? (
          <li className="menu_item">
            <NavLink to="/profile" className="nav_auth_btn profile_btn">
              👤 {user.firstName} {user.lastName}
            </NavLink>
          </li>
        ) : (
          <>
            <li className="menu_item"><NavLink to="/login" className="nav_auth_btn login_btn">Kirish 🔑</NavLink></li>
            <li className="menu_item"><NavLink to="/register" className="nav_auth_btn register_btn">Ro'yxatdan o'tish 📝</NavLink></li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
