import React, { useState } from "react"
import useFetch from "../hooks/useFetch"
import useDocumentTitle from "../hooks/useDocumentTitle"
import { useParams, useOutletContext } from "react-router-dom"
import Container from "../components/Container"
import { useAppContext } from "../context/Appcontext"
import "./detail.css"

function StarRatingInput({ value, onChange }) {
  return (
    <div className="star_rating_input">
      {[1, 2, 3, 4, 5].map(n => (
        <span
          key={n}
          className={n <= value ? 'star filled' : 'star'}
          onClick={() => onChange(n)}
        >★</span>
      ))}
    </div>
  )
}

function ReviewsSection({ productId }) {
  const { getReviews, addReview, isLoggedIn, user } = useAppContext()
  const reviews = getReviews(productId)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (rating === 0 || !comment.trim()) return
    addReview(productId, {
      rating,
      comment: comment.trim(),
      author: `${user?.firstName || 'Foydalanuvchi'} ${user?.lastName || ''}`.trim()
    })
    setRating(0)
    setComment('')
  }

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null

  return (
    <div className="reviews_section">
      <h2>Sharhlar {avgRating && <span className="reviews_avg">⭐ {avgRating} ({reviews.length})</span>}</h2>

      {isLoggedIn ? (
        <form className="review_form" onSubmit={handleSubmit}>
          <StarRatingInput value={rating} onChange={setRating} />
          <textarea
            className="review_textarea"
            placeholder="Mahsulot haqida fikringiz..."
            value={comment}
            onChange={e => setComment(e.target.value)}
            rows={3}
          />
          <button type="submit" className="page_btn" disabled={rating === 0 || !comment.trim()}>
            Sharh qoldirish
          </button>
        </form>
      ) : (
        <p className="review_login_hint">Sharh qoldirish uchun tizimga kiring.</p>
      )}

      {reviews.length === 0 ? (
        <p className="no_reviews">Hali sharhlar yo'q. Birinchi bo'lib fikr bildiring!</p>
      ) : (
        <div className="review_list">
          {reviews.map(r => (
            <div key={r.id} className="review_item">
              <div className="review_item_header">
                <span className="review_author">{r.author || 'Foydalanuvchi'}</span>
                <span className="review_stars">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
              </div>
              <p className="review_comment">{r.comment}</p>
              <span className="review_date">{new Date(r.date).toLocaleDateString('uz-UZ')}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Detail() {
  const { id } = useParams()
  const { addToCart } = useOutletContext()
  const { toggleFavorite, isFavorite, adminProducts } = useAppContext()
  const [activeImg, setActiveImg] = useState(0)

  // Avval admin qo'shgan/tahrirlagan mahsulotlar ichidan qidiramiz —
  // topilsa API'ga umuman murojaat qilmaymiz (custom mahsulotlar DummyJSON'da yo'q)
  const localProduct = adminProducts?.find(p => String(p.id) === String(id)) || null

  const { data: fetchedData, loading, error, refetch } = useFetch(
    localProduct ? null : `https://dummyjson.com/products/${id}`
  )

  const data = localProduct || fetchedData
  useDocumentTitle(data?.title, data?.description)

  if (!localProduct && loading) return (
    <Container>
      <div className="detail_skeleton">
        <div className="skeleton detail_sk_img"></div>
        <div className="detail_sk_info">
          <div className="skeleton detail_sk_title"></div>
          <div className="skeleton detail_sk_desc"></div>
          <div className="skeleton detail_sk_price"></div>
          <div className="skeleton detail_sk_btn"></div>
        </div>
      </div>
    </Container>
  )

  if (!localProduct && error) return (
    <Container>
      <div className="status_error_box">
        <h1 className="status">{error}</h1>
        <button className="page_btn" onClick={refetch}>🔄 Qayta urinish</button>
      </div>
    </Container>
  )

  if (!data) return <h1 className="status">Mahsulot topilmadi</h1>

  const images = data.images?.length ? data.images : [data.thumbnail]
  const discountedPrice = data.discountPercentage
    ? (data.price * (1 - data.discountPercentage / 100)).toFixed(2)
    : null

  return (
    <Container>
      <div className="product_detail">
        {/* Rasm slider */}
        <div className="product-image">
          <div className="main_img_box">
            <img src={images[activeImg]} alt={data.title} className="main_img" />
          </div>
          {images.length > 1 && (
            <div className="thumbnails">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${data.title} ${i + 1}`}
                  className={activeImg === i ? 'thumb active_thumb' : 'thumb'}
                  onClick={() => setActiveImg(i)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="product-info">
          <span className="category">{data.category}</span>
          <h1 className="title">{data.title}</h1>
          <p className="description">{data.description}</p>
          <div className="rating">⭐ {data.rating} / 5</div>

          <div className="price-box">
            {discountedPrice ? (
              <>
                <span className="price">${discountedPrice}</span>
                <span className="old_price">${data.price}</span>
                <span className="discount">-{data.discountPercentage}%</span>
              </>
            ) : (
              <span className="price">${data.price}</span>
            )}
          </div>

          <div className="stock">Stock: {data.stock}</div>

          <div className="extra-info">
            <p><b>Brand:</b> {data.brand}</p>
            <p><b>SKU:</b> {data.sku}</p>
            <p><b>Weight:</b> {data.weight}g</p>
            <p><b>Status:</b> {data.availabilityStatus}</p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="buy-btn" onClick={() => addToCart(data)}>
              Savatga qo'shish
            </button>
            <button
              className={isFavorite(data.id) ? 'favorite_detail_btn active' : 'favorite_detail_btn'}
              onClick={() => toggleFavorite(data)}
            >
              {isFavorite(data.id) ? '❤️ Tanlangan' : '🤍 Saqlash'}
            </button>
          </div>
        </div>
      </div>

      <ReviewsSection productId={data.id} />
    </Container>
  )
}

export default Detail
