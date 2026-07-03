import React from 'react'
import { NavLink } from 'react-router-dom'
import Container from '../components/Container'
import useDocumentTitle from '../hooks/useDocumentTitle'
import './navbarpage.css'

function Home() {
    useDocumentTitle('Bosh sahifa', "Sifatli va hamyonbop mahsulotlar — ShopUZ internet-do'koni")
    return (
        <Container>
            <div className="hero_section">
                <div className="hero_content">
                    <span className="hero_badge">Yangi Mavsum 2026</span>
                    <h1 className="hero_title">Sifatli va hamyonbop mahsulotlar olami</h1>
                    <p className="hero_subtitle">
                        Bizning internet-do'konimizdan o'zingizga yoqqan eng zamonaviy gadjetlar, 
                        kiyimlar va aksessuarlarni eng qulay narxlarda topishingiz mumkin.
                    </p>
                    <NavLink to="/products/show_all" className="buy-btn hero_btn">
                        Xaridni boshlash →
                    </NavLink>
                </div>
                <div className="hero_image_box">
                    <img 
                        src="https://media.istockphoto.com/id/1249219777/photo/shopping-online-concept-parcel-or-paper-cartons-with-a-shopping-cart-logo-in-a-trolley-on-a.jpg?s=612x612&w=0&k=20&c=EWKEahyVLY8iAHyirCCDESHRGW37lqUJ7In0SssNSLE=" 
                        alt="Shopping" 
                        className="hero_image"
                    />
                </div>
            </div>
        </Container>
    )
}

export default Home