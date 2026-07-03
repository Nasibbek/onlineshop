import React from 'react'
import Container from '../components/Container'
import useDocumentTitle from '../hooks/useDocumentTitle'
import './navbarpage.css'

function Help() {
    useDocumentTitle('Yordam markazi', "Ko'p beriladigan savollar va javoblar")
    return (
        <Container>
            <div className="help_section">
                <h1 className="product_title">Yordam markazi</h1>
                <p style={{ color: '#666', marginBottom: '30px' }}>Ko'p beriladigan savollar va javoblar</p>
                
                <div className="faq_container">
                    <div className="faq_item">
                        <h3>❓ Buyurtmani qanday rasmiylashtiraman?</h3>
                        <p>Mahsulot sahifasidan "Add to Cart" tugmasini bosing, savatga o'tib ma'lumotlaringizni kiriting va tasdiqlang.</p>
                    </div>
                    <div className="faq_item">
                        <h3>❓ Yetkazib berish narxi qancha?</h3>
                        <p>Respublika bo'ylab yetkazib berish mutloq bepul amalga oshiriladi.</p>
                    </div>
                    <div className="faq_item">
                        <h3>📞 Savollaringiz bormi?</h3>
                        <p>Biz bilan bog'laning: <b>+998 (71) 123-45-67</b> yoki Telegram orqali: <b>@shop_support</b></p>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Help