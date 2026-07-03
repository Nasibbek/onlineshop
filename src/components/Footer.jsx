import React from 'react'
import { NavLink } from 'react-router-dom'
import './component_style.css'

function Footer() {
    return (
        <footer className="footer_section">
            <div className="footer_container">
                
               
                <div className="footer_block">
                    <h3 className="footer_logo">🛒 OnlineShop</h3>
                    <p className="footer_desc">
                        Eng zamonaviy mahsulotlar va qulay onlayn xarid tizimi. Biz bilan hayotingizni osonlashtiring.
                    </p>
                </div>

                
                <div className="footer_block">
                    <h4>Sahifalar</h4>
                    <ul className="footer_links">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/about">About</NavLink></li>
                        <li><NavLink to="/servise">Servise</NavLink></li>
                        <li><NavLink to="/products/show_all">Products</NavLink></li>
                    </ul>
                </div>

                
                <div className="footer_block">
                    <h4>Aloqa</h4>
                    <ul className="footer_info">
                        <li>📞 +998 (71) 123-45-67</li>
                        <li>📍 Toshkent shahar, Chilonzor</li>
                        <li>✉️ info@onlineshop.uz</li>
                    </ul>
                </div>

               
                <div className="footer_block">
                    <h4>Bizni kuzating</h4>
                    <div className="footer_socials">
                        <a href="#" className="social_link">Telegram</a>
                        <a href="#" className="social_link">Instagram</a>
                        <a href="#" className="social_link">Facebook</a>
                    </div>
                </div>

            </div>

            
            
        </footer>
    )
}

export default Footer