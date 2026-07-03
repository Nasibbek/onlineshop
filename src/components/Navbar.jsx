// src/components/Navbar.jsx
import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/Appcontext";
import "./component_style.css";

function Navbar({ cart = [], isLoggedIn, user }) {
  const { isAdmin } = useAppContext();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="nav">
      <ul className="menu">
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
