import React from 'react'
import Container from '../components/Container'
import useDocumentTitle from '../hooks/useDocumentTitle'
import './navbarpage.css'

function About() {
    useDocumentTitle('Biz haqimizda', "ShopUZ jamoasi va missiyamiz haqida")
    return (
        <Container>
            <div className="about_section">
                <h1 className="product_title">Biz haqimizda</h1>
                <p className="about_text">
                    Biz 2024-yildan buyon mijozlarimizga eng sara mahsulotlarni yetkazib berish bilan shug'ullanib kelmoqdamiz. 
                    Bizning asosiy maqsadimiz — xaridorlarimizga tezkor xizmat, sifatli mahsulot va xavfsiz to'lov tizimini taqdim etishdir.
                </p>
                
                <div className="features_grid">
                    <div className="feature_card">
                        <div className="feature_icon">🚚</div>
                        <h3>Tezkor Yetkazish</h3>
                        <p>O'zbekiston bo'ylab 24 soat ichida mutloq xavfsiz yetkazib berish xizmati.</p>
                    </div>
                    <div className="feature_card">
                        <div className="feature_icon">🛡️</div>
                        <h3>Sifat Kafolati</h3>
                        <p>Barcha mahsulotlarimiz 100% original va ishlab chiqaruvchi kafolatiga ega.</p>
                    </div>
                    <div className="feature_card">
                        <div className="feature_icon">🤝</div>
                        <h3>24/7 Qo'llab-quvvatlash</h3>
                        <p>Sizga yordam berishga har soniya tayyor bo'lgan professional jamoa.</p>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default About