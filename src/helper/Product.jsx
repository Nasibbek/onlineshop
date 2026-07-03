import React, { useState, useMemo } from 'react'
import Container from '../components/Containerk'
import Card from '../components/Card'
import useFetch from '../hooks/useFetch'
import './product.css'
import { NavLink } from 'react-router-dom'
import { useAppContext } from '../context/Appcontext'

function SkeletonCard() {
  return (
    <div className="card skeleton_card">
      <div className="skeleton skeleton_img"></div>
      <div className="card_info">
        <div className="skeleton skeleton_title"></div>
        <div className="skeleton skeleton_price"></div>
        <div className="skeleton skeleton_btn"></div>
      </div>
    </div>
  )
}

function Product() {
  const { data, loading, error, refetch } = useFetch("https://dummyjson.com/products?limit=100")
  const { toggleFavorite, isFavorite, adminProducts } = useAppContext()

  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortOrder, setSortOrder] = useState('default')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const cardsPerPage = 8

  // API mahsulotlari + admin qo'shgan/o'zgartirgan mahsulotlarni birlashtirish
  const mergedProducts = useMemo(() => {
    const apiProducts = data?.products || []
    if (!adminProducts || adminProducts.length === 0) return apiProducts

    // adminProducts ichida API mahsulotlari ham bor (loadProductsToAdmin orqali yuklangan)
    // Agar adminProducts API mahsulotlarini ham o'z ichiga olsa — faqat adminProductsni ishlatamiz
    const hasApiProducts = adminProducts.some(p => !p.isCustom)
    if (hasApiProducts) {
      return adminProducts
    }

    // Faqat custom mahsulotlar bor — API mahsulotlari oldiga qo'shamiz
    return [...adminProducts, ...apiProducts]
  }, [data, adminProducts])

  const categories = useMemo(() => {
    const cats = [...new Set(mergedProducts.map(p => p.category).filter(Boolean))]
    return cats.sort()
  }, [mergedProducts])

  const filteredProducts = useMemo(() => {
    let result = [...mergedProducts]

    if (searchQuery.trim()) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory)
    }

    const min = parseFloat(minPrice)
    const max = parseFloat(maxPrice)
    if (!isNaN(min)) result = result.filter(p => p.price >= min)
    if (!isNaN(max)) result = result.filter(p => p.price <= max)

    if (sortOrder === 'price_asc') result.sort((a, b) => a.price - b.price)
    else if (sortOrder === 'price_desc') result.sort((a, b) => b.price - a.price)
    else if (sortOrder === 'rating_desc') result.sort((a, b) => (b.rating || 0) - (a.rating || 0))

    return result
  }, [mergedProducts, searchQuery, selectedCategory, sortOrder, minPrice, maxPrice])

  const handleSearch = (e) => { setSearchQuery(e.target.value); setCurrentPage(1) }
  const handleCategory = (cat) => { setSelectedCategory(cat); setCurrentPage(1) }
  const handleSort = (e) => { setSortOrder(e.target.value); setCurrentPage(1) }
  const handleMinPrice = (e) => { setMinPrice(e.target.value); setCurrentPage(1) }
  const handleMaxPrice = (e) => { setMaxPrice(e.target.value); setCurrentPage(1) }
  const clearPriceFilter = () => { setMinPrice(''); setMaxPrice(''); setCurrentPage(1) }

  if (error) return (
    <div className="status_error_box">
      <h1 className="status_text error">Xatolik: {error}</h1>
      <button className="page_btn" onClick={refetch}>🔄 Qayta urinish</button>
    </div>
  )

  const indexOfLastCard = currentPage * cardsPerPage
  const indexOfFirstCard = indexOfLastCard - cardsPerPage
  const currentCards = filteredProducts.slice(indexOfFirstCard, indexOfLastCard)
  const totalPages = Math.ceil(filteredProducts.length / cardsPerPage)

  return (
    <div>
      <div className="filter_panel">
        <input
          type="text"
          placeholder="🔍 Mahsulot qidirish..."
          value={searchQuery}
          onChange={handleSearch}
          className="search_input"
        />
        <select value={sortOrder} onChange={handleSort} className="sort_select">
          <option value="default">Saralash: Default</option>
          <option value="price_asc">Narx: Arzondan qimmatga</option>
          <option value="price_desc">Narx: Qimmatdan arzoniga</option>
          <option value="rating_desc">Reyting bo'yicha</option>
        </select>
        <div className="price_range_filter">
          <input
            type="number"
            min="0"
            placeholder="Min $"
            value={minPrice}
            onChange={handleMinPrice}
            className="price_input"
          />
          <span>—</span>
          <input
            type="number"
            min="0"
            placeholder="Max $"
            value={maxPrice}
            onChange={handleMaxPrice}
            className="price_input"
          />
          {(minPrice || maxPrice) && (
            <button className="price_clear_btn" onClick={clearPriceFilter} title="Tozalash">✕</button>
          )}
        </div>
      </div>

      {!loading && (
        <div className="category_filter">
          <button
            className={selectedCategory === 'all' ? 'cat_btn active' : 'cat_btn'}
            onClick={() => handleCategory('all')}
          >
            Barchasi
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              className={selectedCategory === cat ? 'cat_btn active' : 'cat_btn'}
              onClick={() => handleCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="cards_grid">
          {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <>
          {filteredProducts.length === 0 ? (
            <p className="status_text">Hech narsa topilmadi 😕</p>
          ) : (
            <Container>
              {currentCards.map((element) => (
                <Card key={element.id}>
                  <div className="card_img_box">
                    <img src={element.thumbnail} alt={element.title} className="card_img" />
                    <button
                      className={isFavorite(element.id) ? 'favorite_btn active' : 'favorite_btn'}
                      onClick={() => toggleFavorite(element)}
                      title={isFavorite(element.id) ? "Tanlangandan olib tashlash" : "Tanlanganlarga saqlash"}
                    >
                      {isFavorite(element.id) ? '❤️' : '🤍'}
                    </button>
                  </div>
                  <div className="card_info">
                    <h3 className="card_title">{element.title}</h3>
                    <p className="card_price">${element.price}</p>
                    <NavLink to={`/products/product/${element.id}`} className='btn_card'>Batafsil</NavLink>
                  </div>
                </Card>
              ))}
            </Container>
          )}

          {totalPages > 1 && (
            <div className="pagination_container">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                <button
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  className={currentPage === number ? 'page_btn active' : 'page_btn'}
                >
                  {number}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Product
