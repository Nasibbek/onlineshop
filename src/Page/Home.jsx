import React from 'react'
import { NavLink } from 'react-router-dom'
import Container from '../components/Container'
import Carousel from '../components/Carousel'
import Reveal from '../components/Reveal'
import Counter from '../components/Counter'
import useDocumentTitle from '../hooks/useDocumentTitle'
import './navbarpage.css'

const HERO_SLIDES = [
  {
    badge: 'Yangi Mavsum 2026',
    title: 'Sifatli va hamyonbop mahsulotlar olami',
    subtitle: "Bizning internet-do'konimizdan o'zingizga yoqqan eng zamonaviy gadjetlar, kiyimlar va aksessuarlarni eng qulay narxlarda topishingiz mumkin.",
    cta: 'Xaridni boshlash',
    link: '/products/show_all',
    image: 'https://picsum.photos/id/26/900/600',
  },
  {
    badge: '🔥 Haftalik chegirmalar',
    title: "Ba'zi mahsulotlarga 40% gacha chegirma",
    subtitle: "Cheklangan vaqt ichida amal qiladigan chegirmalarni o'tkazib yubormang — har hafta yangi takliflar.",
    cta: 'Chegirmalarni ko\'rish',
    link: '/products/show_all',
    image: 'https://picsum.photos/id/119/900/600',
  },
  {
    badge: '🚚 Bepul yetkazib berish',
    title: "O'zbekiston bo'ylab tezkor va bepul yetkazib berish",
    subtitle: "Buyurtmangiz 24 soat ichida, hech qanday qo'shimcha to'lovsiz manzilingizga yetkaziladi.",
    cta: "Mahsulotlarni ko'rish",
    link: '/products/show_all',
    image: 'https://picsum.photos/id/180/900/600',
  },
]

const CATEGORY_LINKS = [
  { icon: '📱', label: 'Elektronika', category: 'smartphones' },
  { icon: '👗', label: 'Kiyim-kechak', category: "womens-dresses" },
  { icon: '💄', label: 'Go\'zallik', category: 'beauty' },
  { icon: '🏠', label: 'Uy-ro\'zg\'or', category: 'furniture' },
  { icon: '👟', label: 'Poyabzal', category: 'mens-shoes' },
  { icon: '⌚', label: 'Aksessuarlar', category: 'mens-watches' },
]

const STATS = [
  { end: 15000, suffix: '+', label: 'Mamnun mijozlar' },
  { end: 5000, suffix: '+', label: "Mahsulotlar turi" },
  { end: 24, suffix: '/7', label: "Qo'llab-quvvatlash" },
  { end: 98, suffix: '%', label: "Mijozlar mamnunligi" },
]

const TESTIMONIALS = [
  {
    name: 'Aziza Karimova',
    role: 'Doimiy mijoz',
    avatar: 'https://i.pravatar.cc/150?img=32',
    text: "Buyurtma bergan mahsulotim ertasiga qo'limda edi! Sifat ham, narx ham juda yoqdi. Do'stlarimga ham tavsiya qildim.",
  },
  {
    name: 'Jasur Toshmatov',
    role: "Onlayn xaridor",
    avatar: 'https://i.pravatar.cc/150?img=12',
    text: "Admin bilan bog'lanishim kerak bo'lgan edi, juda tez javob berishdi. Xizmat ko'rsatish darajasi zo'r.",
  },
  {
    name: 'Madina Yusupova',
    role: 'Blogger',
    avatar: 'https://i.pravatar.cc/150?img=45',
    text: "Saytda kerakli narsani topish juda oson — filtrlar qulay, chegirmalar esa hamyonimga judayam yoqadi.",
  },
]

function Home() {
    useDocumentTitle('Bosh sahifa', "Sifatli va hamyonbop mahsulotlar — ShopUZ internet-do'koni")

    return (
        <Container>
            {/* HERO KARUSEL */}
            <Carousel
              slides={HERO_SLIDES.map((slide, i) => (
                <div className="hero_section" key={i}>
                    <div className="hero_content">
                        <span className="hero_badge">{slide.badge}</span>
                        <h1 className="hero_title">{slide.title}</h1>
                        <p className="hero_subtitle">{slide.subtitle}</p>
                        <NavLink to={slide.link} className="buy-btn hero_btn">
                            {slide.cta} →
                        </NavLink>
                    </div>
                    <div className="hero_image_box">
                        <img src={slide.image} alt={slide.title} className="hero_image" loading={i === 0 ? 'eager' : 'lazy'} />
                    </div>
                </div>
              ))}
            />

            {/* TEZKOR KATEGORIYALAR */}
            <Reveal as="section" className="quick_categories">
                <h2 className="section_title">Kategoriyalar bo'yicha xarid qiling</h2>
                <div className="quick_cat_grid">
                    {CATEGORY_LINKS.map((cat, i) => (
                        <NavLink
                          key={cat.category}
                          to={`/products/show_all?category=${cat.category}`}
                          className="quick_cat_card"
                          style={{ transitionDelay: `${i * 60}ms` }}
                        >
                            <span className="quick_cat_icon">{cat.icon}</span>
                            <span className="quick_cat_label">{cat.label}</span>
                        </NavLink>
                    ))}
                </div>
            </Reveal>

            {/* STATISTIKA */}
            <Reveal as="section" className="stats_section">
                <div className="stats_grid">
                    {STATS.map((stat, i) => (
                        <div className="stat_box" key={stat.label}>
                            <Counter end={stat.end} suffix={stat.suffix} duration={1400 + i * 150} />
                            <p className="stat_box_label">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </Reveal>

            {/* MIJOZLAR FIKRI */}
            <Reveal as="section" className="testimonials_section">
                <h2 className="section_title">Mijozlarimiz nima deydi</h2>
                <Carousel
                  autoPlay
                  interval={6000}
                  slides={TESTIMONIALS.map((t, i) => (
                    <div className="testimonial_card" key={i}>
                        <p className="testimonial_text">"{t.text}"</p>
                        <div className="testimonial_author">
                            <img src={t.avatar} alt={t.name} className="testimonial_avatar" />
                            <div>
                                <p className="testimonial_name">{t.name}</p>
                                <p className="testimonial_role">{t.role}</p>
                            </div>
                        </div>
                    </div>
                  ))}
                />
            </Reveal>
        </Container>
    )
}

export default Home
