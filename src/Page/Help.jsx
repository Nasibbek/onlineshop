import React, { useState } from 'react'
import Container from '../components/Container'
import Reveal from '../components/Reveal'
import useDocumentTitle from '../hooks/useDocumentTitle'
import './navbarpage.css'

const FAQS = [
    {
        q: "Buyurtmani qanday rasmiylashtiraman?",
        a: 'Mahsulot sahifasidan "Savatga qo\'shish" tugmasini bosing, savatga o\'tib ma\'lumotlaringizni kiriting va tasdiqlang.',
    },
    {
        q: 'Yetkazib berish narxi qancha?',
        a: "Respublika bo'ylab yetkazib berish mutloq bepul amalga oshiriladi.",
    },
    {
        q: "Mahsulotni qanday qaytarishim mumkin?",
        a: "Mahsulot yetib kelgan kundan boshlab 14 kun ichida, original qadoqda bo'lsa, hech qanday qo'shimcha hujjatlarsiz qaytarishingiz mumkin.",
    },
    {
        q: "To'lovni qanday amalga oshiraman?",
        a: "Click, Payme yoki xalqaro Visa/Mastercard kartalari orqali to'lov qilishingiz mumkin. Naqd pul bilan ham to'lash imkoniyati mavjud.",
    },
    {
        q: "Buyurtmam holatini qanday kuzataman?",
        a: 'Profil bo\'limidagi "Buyurtmalar" tabiga o\'tib, har bir buyurtmangiz holatini (Yangi, Tayyorlanmoqda, Yetkazilmoqda va h.k.) real vaqtda ko\'rishingiz mumkin.',
    },
]

function FaqItem({ faq, isOpen, onToggle }) {
    return (
        <div className={isOpen ? 'faq_item open' : 'faq_item'}>
            <button className="faq_question" onClick={onToggle} aria-expanded={isOpen}>
                <span>❓ {faq.q}</span>
                <span className="faq_chevron">⌄</span>
            </button>
            <div className="faq_answer_wrap" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
                <div className="faq_answer_inner">
                    <p>{faq.a}</p>
                </div>
            </div>
        </div>
    )
}

function Help() {
    useDocumentTitle('Yordam markazi', "Ko'p beriladigan savollar va javoblar")
    const [openIndex, setOpenIndex] = useState(0)

    return (
        <Container>
            <div className="help_section">
                <Reveal>
                    <h1 className="product_title">Yordam markazi</h1>
                    <p style={{ color: '#666', marginBottom: '30px' }}>Ko'p beriladigan savollar va javoblar</p>
                </Reveal>

                <div className="faq_container">
                    {FAQS.map((faq, i) => (
                        <Reveal key={faq.q} delay={i * 70}>
                            <FaqItem
                                faq={faq}
                                isOpen={openIndex === i}
                                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                            />
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={FAQS.length * 70}>
                    <div className="faq_contact_box">
                        <span className="faq_contact_icon">📞</span>
                        <div>
                            <p className="faq_contact_title">Savolingizga javob topa olmadingizmi?</p>
                            <p className="faq_contact_text">
                                Biz bilan bog'laning: <b>+998 (71) 123-45-67</b> yoki Telegram orqali: <b>@shop_support</b>
                            </p>
                        </div>
                    </div>
                </Reveal>
            </div>
        </Container>
    )
}

export default Help
