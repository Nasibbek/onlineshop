import React from 'react'
import Container from '../components/Container'
import Reveal from '../components/Reveal'
import Counter from '../components/Counter'
import useDocumentTitle from '../hooks/useDocumentTitle'
import './navbarpage.css'

const FEATURES = [
    { icon: '🚚', title: 'Tezkor Yetkazish', text: "O'zbekiston bo'ylab 24 soat ichida mutloq xavfsiz yetkazib berish xizmati." },
    { icon: '🛡️', title: 'Sifat Kafolati', text: 'Barcha mahsulotlarimiz 100% original va ishlab chiqaruvchi kafolatiga ega.' },
    { icon: '🤝', title: "24/7 Qo'llab-quvvatlash", text: 'Sizga yordam berishga har soniya tayyor bo\'lgan professional jamoa.' },
]

const ABOUT_STATS = [
    { end: 2024, suffix: '', label: 'Tashkil topgan yil' },
    { end: 15000, suffix: '+', label: 'Mamnun mijozlar' },
    { end: 50, suffix: '+', label: 'Hamkor brendlar' },
]

function About() {
    useDocumentTitle('Biz haqimizda', "ShopUZ jamoasi va missiyamiz haqida")
    return (
        <Container>
            <div className="about_section">
                <Reveal>
                    <h1 className="product_title">Biz haqimizda</h1>
                    <p className="about_text">
                        Biz 2024-yildan buyon mijozlarimizga eng sara mahsulotlarni yetkazib berish bilan shug'ullanib kelmoqdamiz.
                        Bizning asosiy maqsadimiz — xaridorlarimizga tezkor xizmat, sifatli mahsulot va xavfsiz to'lov tizimini taqdim etishdir.
                    </p>
                </Reveal>

                <div className="features_grid">
                    {FEATURES.map((f, i) => (
                        <Reveal key={f.title} delay={i * 120}>
                            <div className="feature_card">
                                <div className="feature_icon">{f.icon}</div>
                                <h3>{f.title}</h3>
                                <p>{f.text}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <Reveal as="section" className="stats_section" delay={100}>
                    <div className="stats_grid">
                        {ABOUT_STATS.map((stat, i) => (
                            <div className="stat_box" key={stat.label}>
                                <Counter end={stat.end} suffix={stat.suffix} duration={1400 + i * 150} />
                                <p className="stat_box_label">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </div>
        </Container>
    )
}

export default About
