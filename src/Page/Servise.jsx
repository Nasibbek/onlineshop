import React from 'react'
import Container from '../components/Container'
import Reveal from '../components/Reveal'
import useDocumentTitle from '../hooks/useDocumentTitle'
import './navbarpage.css'

const SERVICES = [
    {
        icon: '💳',
        title: "Onlayn To'lovlar va Bo'lib to'lash",
        text: "Click, Payme, Visa kartalari orqali xavfsiz onlayn to'lov tizimi. Shuningdek, halol muddatli to'lov xizmatlari ham mavjud.",
    },
    {
        icon: '🔄',
        title: 'Maxsulotni qaytarish va almashtirish',
        text: "Agar mahsulot sizga ma'qul kelmasa yoki nuqsoni bo'lsa, 14 kun ichida hech qanday ortiqcha hujjatlarsiz qaytarib berishingiz mumkin.",
    },
    {
        icon: '🏢',
        title: 'Korporativ mijozlar uchun maxsus takliflar',
        text: 'Katta hajmdagi buyurtmalar uchun ulgurji narxlar va bonus tizimlarini taklif qilamiz.',
    },
    {
        icon: '🎁',
        title: "Sovg'a sertifikatlari",
        text: "Yaqinlaringiz uchun mos sovg'ani tanlay olmayapsizmi? ShopUZ sovg'a sertifikatini taqdim eting — o'zi tanlab olsin.",
    },
]

function Servise() {
    useDocumentTitle('Xizmatlar', "ShopUZ tomonidan taqdim etiladigan xizmatlar ro'yxati")
    return (
        <Container>
            <div className="services_section">
                <Reveal>
                    <h1 className="product_title">Bizning Xizmatlar</h1>
                    <hr />
                </Reveal>

                <div className="services_grid">
                    {SERVICES.map((s, i) => (
                        <Reveal key={s.title} delay={i * 100}>
                            <div className="service_card">
                                <span className="service_number">{String(i + 1).padStart(2, '0')}</span>
                                <div className="service_card_icon">{s.icon}</div>
                                <h2>{s.title}</h2>
                                <p>{s.text}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </Container>
    )
}

export default Servise
