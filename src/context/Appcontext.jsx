import { createContext, useContext, useState, useEffect } from 'react'

export const AppContext = createContext(null)
export const useAppContext = () => useContext(AppContext)

function loadFromStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : fallback
  } catch {
    return fallback
  }
}

// Admin credentials (mock)
const ADMIN_EMAIL = 'admin@shop.uz'
const ADMIN_PASSWORD = 'admin123'

export function AppProvider({ children }) {
  const [cart, setCart] = useState(() => loadFromStorage('cart', []))
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true')
  const [user, setUser] = useState(() => loadFromStorage('user', null))
  const [orders, setOrders] = useState(() => loadFromStorage('orders', []))
  const [favorites, setFavorites] = useState(() => loadFromStorage('favorites', []))
  const [users, setUsers] = useState(() => loadFromStorage('users', []))
  const [reviews, setReviews] = useState(() => loadFromStorage('reviews', {}))
  const [toasts, setToasts] = useState([])
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  // Admin mahsulotlari: null = hali yuklanmagan, [] = bo'sh, [...] = bor
  const [adminProducts, setAdminProducts] = useState(() => loadFromStorage('adminProducts', null))
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('isAdmin') === 'true')
  const [isLoadingAdminProducts, setIsLoadingAdminProducts] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light')

  useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)) }, [cart])
  useEffect(() => { localStorage.setItem('isLoggedIn', String(isLoggedIn)) }, [isLoggedIn])
  useEffect(() => { localStorage.setItem('orders', JSON.stringify(orders)) }, [orders])
  useEffect(() => { localStorage.setItem('favorites', JSON.stringify(favorites)) }, [favorites])
  useEffect(() => { localStorage.setItem('users', JSON.stringify(users)) }, [users])
  useEffect(() => { localStorage.setItem('reviews', JSON.stringify(reviews)) }, [reviews])
  useEffect(() => {
    if (adminProducts !== null) localStorage.setItem('adminProducts', JSON.stringify(adminProducts))
  }, [adminProducts])

  const TOAST_DURATION = 3000
  const TOAST_EXIT_ANIM = 250 // toast_slide_out CSS animatsiyasi davomiyligi bilan mos

  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, message, type, closing: false }])
    // Avval "closing" holatiga o'tkazamiz — bu chiqish animatsiyasini ishga tushiradi,
    // so'ng animatsiya tugagach ro'yxatdan butunlay olib tashlaymiz
    setTimeout(() => {
      setToasts(prev => prev.map(t => t.id === id ? { ...t, closing: true } : t))
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), TOAST_EXIT_ANIM)
    }, TOAST_DURATION - TOAST_EXIT_ANIM)
  }

  const removeToast = (id) => {
    setToasts(prev => prev.map(t => t.id === id ? { ...t, closing: true } : t))
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), TOAST_EXIT_ANIM)
  }

  // ===== Ko'p foydalanuvchili ro'yxatdan o'tish / kirish =====
  // ESLATMA: parol shu yerda localStorage'da oddiy matn sifatida saqlanadi.
  // Bu faqat frontend-demo uchun yetarli; ishlab chiqarish (production) muhitida
  // parol albatta serverda (masalan, bcrypt bilan) hash qilinishi SHART.
  const registerUser = (userData, password) => {
    const emailNorm = userData.email.trim().toLowerCase()
    const exists = users.find(u => u.email.toLowerCase() === emailNorm)
    if (exists) {
      return { success: false, message: "Bu email bilan foydalanuvchi allaqachon ro'yxatdan o'tgan" }
    }
    const newUser = { ...userData, email: emailNorm, password }
    setUsers(prev => [...prev, newUser])
    return { success: true, user: newUser }
  }

  const loginUser = (email, password) => {
    const emailNorm = email.trim().toLowerCase()
    const found = users.find(u => u.email.toLowerCase() === emailNorm)
    if (!found) return { success: false, message: "Bunday foydalanuvchi topilmadi" }
    if (found.password !== password) return { success: false, message: "Parol noto'g'ri" }
    return { success: true, user: found }
  }

  const handleLoginSuccess = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('isLoggedIn', 'true')
    setUser(userData)
    setIsLoggedIn(true)
  }

  const handleAdminLogin = (email, password) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem('isAdmin', 'true')
      setIsAdmin(true)
      return true
    }
    return false
  }

  const handleAdminLogout = () => {
    localStorage.removeItem('isAdmin')
    setIsAdmin(false)
  }

  const handleLogoutSuccess = () => {
    localStorage.removeItem('user')
    localStorage.setItem('isLoggedIn', 'false')
    setUser(null)
    setIsLoggedIn(false)
    handleAdminLogout()
  }

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id)
      if (exists) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      return [...prev, { ...product, quantity: 1 }]
    })
    showToast(`${product.title} savatga qo'shildi!`, 'success')
  }

  const addOrder = (orderData) => {
    const newOrder = { id: Date.now(), date: new Date().toISOString(), status: 'Yangi', ...orderData }
    setOrders(prev => [newOrder, ...prev])
    return newOrder
  }

  const removeOrder = (orderId) => setOrders(prev => prev.filter(o => o.id !== orderId))

  const updateOrderStatus = (orderId, status) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o))
    showToast('Buyurtma holati yangilandi', 'success')
  }

  // ===== Mahsulot sharhlari =====
  const addReview = (productId, reviewData) => {
    const newReview = { id: Date.now(), date: new Date().toISOString(), ...reviewData }
    setReviews(prev => ({
      ...prev,
      [productId]: [newReview, ...(prev[productId] || [])]
    }))
    showToast("Sharhingiz uchun rahmat!", 'success')
  }

  const getReviews = (productId) => reviews[String(productId)] || reviews[productId] || []

  const toggleFavorite = (product) => {
    setFavorites(prev => {
      const exists = prev.find(item => item.id === product.id)
      return exists ? prev.filter(item => item.id !== product.id) : [...prev, product]
    })
  }
  const isFavorite = (productId) => favorites.some(item => item.id === productId)
  const removeFavorite = (productId) => setFavorites(prev => prev.filter(item => item.id !== productId))

  const updateProfile = (updatedFields) => {
    setUser(prev => {
      const updatedUser = { ...prev, ...updatedFields }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      return updatedUser
    })
  }

  const changePassword = (currentPassword, newPassword) => {
    const savedPassword = localStorage.getItem('userPassword')
    if (savedPassword && savedPassword !== currentPassword) {
      return { success: false, message: "Joriy parol noto'g'ri" }
    }
    localStorage.setItem('userPassword', newPassword)
    return { success: true, message: "Parol muvaffaqiyatli o'zgartirildi" }
  }

  // ===== ADMIN: Mahsulot CRUD =====
  const adminAddProduct = (product) => {
    const newProduct = { ...product, id: Date.now(), isCustom: true }
    setAdminProducts(prev => (prev ? [newProduct, ...prev] : [newProduct]))
    showToast(`"${product.title}" mahsulot qo'shildi!`, 'success')
    return newProduct
  }

  const adminUpdateProduct = (id, updatedFields) => {
    setAdminProducts(prev => (prev || []).map(p => p.id === id ? { ...p, ...updatedFields } : p))
    showToast('Mahsulot yangilandi!', 'success')
  }

  const adminDeleteProduct = (id) => {
    setAdminProducts(prev => (prev || []).filter(p => p.id !== id))
    showToast("Mahsulot o'chirildi!", 'info')
  }

  const adminDeleteProducts = (ids) => {
    setAdminProducts(prev => (prev || []).filter(p => !ids.includes(p.id)))
    showToast(`${ids.length} ta mahsulot o'chirildi!`, 'info')
  }

  // DummyJSON mahsulotlarini admin panelga yuklash
  const loadProductsToAdmin = async () => {
    if (adminProducts && adminProducts.length > 0) return
    if (isLoadingAdminProducts) return // tugma bir necha marta bosilishining oldini olish
    setIsLoadingAdminProducts(true)
    try {
      const res = await fetch('https://dummyjson.com/products?limit=100')
      if (!res.ok) throw new Error()
      const data = await res.json()
      setAdminProducts(data.products || [])
    } catch {
      showToast("Mahsulotlarni yuklashda xatolik", 'error')
    } finally {
      setIsLoadingAdminProducts(false)
    }
  }

  return (
    <AppContext.Provider value={{
      cart, setCart,
      isLoggedIn, user,
      isAdmin,
      orders, addOrder, removeOrder, updateOrderStatus,
      favorites, toggleFavorite, isFavorite, removeFavorite,
      handleLoginSuccess, handleLogoutSuccess,
      handleAdminLogin, handleAdminLogout,
      registerUser, loginUser,
      addToCart,
      updateProfile, changePassword,
      toasts, showToast, removeToast,
      theme, toggleTheme,
      adminProducts, setAdminProducts,
      adminAddProduct, adminUpdateProduct, adminDeleteProduct, adminDeleteProducts,
      loadProductsToAdmin, isLoadingAdminProducts,
      addReview, getReviews,
    }}>
      {children}
    </AppContext.Provider>
  )
}
