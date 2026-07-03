import React from 'react'
import Container from '../components/Container'
import useDocumentTitle from '../hooks/useDocumentTitle'
import './navbarpage.css'

function Servise() {
    useDocumentTitle('Xizmatlar', "ShopUZ tomonidan taqdim etiladigan xizmatlar ro'yxati")
    return (
        <Container>
            <div className="services_section">
                <h1 className="product_title">Bizning Xizmatlar</h1>
                <hr />
                <div className="services_list">
                    <div className="service_item">
                        <div className="service_info">
                            <h2>01. Onlayn To'lovlar va Bo'lib to'lash</h2>
                            <p>Click, Payme, Visa kartalari orqali xavfsiz onlayn to'lov tizimi. Shuningdek, halol muddatli to'lov xizmatlari ham mavjud.</p>
                        </div>
                    </div>
                    <div className="service_item">
                        <div className="service_info">
                            <h2>02. Maxsulotni qaytarish va almashtirish</h2>
                            <p>Agar mahsulot sizga ma'qul kelmasa yoki nuqsoni bo'lsa, 14 kun ichida hech qanday ortiqcha hujjatlarsiz qaytarib berishingiz mumkin.</p>
                        </div>
                    </div>
                    <div className="service_item">
                        <div className="service_info">
                            <h2>03. Korporativ mijozlar uchun maxsus takliflar</h2>
                            <p>Katta hajmdagi buyurtmalar uchun ulgurji narxlar va bonus tizimlarini taklif qilamiz.</p>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Servise