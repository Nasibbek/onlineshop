import { NavLink } from 'react-router-dom'
import useDocumentTitle from '../hooks/useDocumentTitle'
import './page.css'

function NotFound() {
  useDocumentTitle('Sahifa topilmadi')
  return (
    <div className="not_found_container">
      <div className="not_found_content">
        <h1 className="not_found_code">404</h1>
        <h2 className="not_found_title">Sahifa topilmadi</h2>
        <p className="not_found_desc">
          Siz qidirgan sahifa mavjud emas yoki o'chirib yuborilgan.
        </p>
        <NavLink to="/" className="not_found_btn">
          🏠 Bosh sahifaga qaytish
        </NavLink>
      </div>
    </div>
  )
}

export default NotFound
