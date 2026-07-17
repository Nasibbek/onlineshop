import { useState, useEffect, useMemo } from 'react'
import { useAppContext } from '../context/Appcontext'
import { useNavigate } from 'react-router-dom'
import useDocumentTitle from '../hooks/useDocumentTitle'
import './admin.css'

// ─── Yangi / tahrirlash formi ─────────────────────────────────────────────
function ProductForm({ initial, onSave, onCancel }) {
  const empty = {
    title: '', price: '', description: '', category: '',
    stock: '', brand: '', rating: '', thumbnail: '', images: ''
  }
  const [form, setForm] = useState(initial ? {
    ...initial,
    images: Array.isArray(initial.images) ? initial.images.join(', ') : (initial.images || '')
  } : empty)

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleSave = (e) => {
    e.preventDefault()
    if (!form.title || !form.price) return
    const product = {
      ...form,
      price: parseFloat(form.price) || 0,
      stock: parseInt(form.stock) || 0,
      rating: parseFloat(form.rating) || 0,
      images: form.images ? form.images.split(',').map(s => s.trim()).filter(Boolean) : [],
      thumbnail: form.thumbnail || form.images?.split(',')[0]?.trim() || 'https://via.placeholder.com/300'
    }
    onSave(product)
  }

  return (
    <div className="admin_modal_overlay">
      <div className="admin_modal">
        <div className="admin_modal_header">
          <h3>{initial ? '✏️ Mahsulotni tahrirlash' : '➕ Yangi mahsulot'}</h3>
          <button className="admin_modal_close" onClick={onCancel}>✕</button>
        </div>
        <form onSubmit={handleSave} className="admin_product_form">
          <div className="admin_form_grid">
            <div className="admin_form_group span2">
              <label>Nomi *</label>
              <input required value={form.title} onChange={set('title')} placeholder="MacBook Pro 14" />
            </div>
            <div className="admin_form_group">
              <label>Narxi ($) *</label>
              <input required type="number" min="0" step="0.01" value={form.price} onChange={set('price')} placeholder="999" />
            </div>
            <div className="admin_form_group">
              <label>Stok (dona)</label>
              <input type="number" min="0" value={form.stock} onChange={set('stock')} placeholder="50" />
            </div>
            <div className="admin_form_group">
              <label>Kategoriya</label>
              <input value={form.category} onChange={set('category')} placeholder="laptops" />
            </div>
            <div className="admin_form_group">
              <label>Brend</label>
              <input value={form.brand} onChange={set('brand')} placeholder="Apple" />
            </div>
            <div className="admin_form_group">
              <label>Reyting (0-5)</label>
              <input type="number" min="0" max="5" step="0.1" value={form.rating} onChange={set('rating')} placeholder="4.5" />
            </div>
            <div className="admin_form_group span2">
              <label>Thumbnail URL</label>
              <input value={form.thumbnail} onChange={set('thumbnail')} placeholder="https://..." />
            </div>
            <div className="admin_form_group span2">
              <label>Rasmlar (vergul bilan ajrating)</label>
              <input value={form.images} onChange={set('images')} placeholder="https://img1.jpg, https://img2.jpg" />
            </div>
            <div className="admin_form_group span2">
              <label>Tavsif</label>
              <textarea rows={3} value={form.description} onChange={set('description')} placeholder="Mahsulot haqida..." />
            </div>
          </div>
          <div className="admin_form_actions">
            <button type="button" className="admin_btn secondary" onClick={onCancel}>Bekor qilish</button>
            <button type="submit" className="admin_btn primary">
              {initial ? '💾 Saqlash' : '➕ Qo\'shish'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── O'chirish tasdiqi ────────────────────────────────────────────────────
function DeleteConfirm({ product, onConfirm, onCancel }) {
  return (
    <div className="admin_modal_overlay">
      <div className="admin_modal" style={{ maxWidth: '380px' }}>
        <div style={{ textAlign: 'center', padding: '8px 0 20px' }}>
          <span style={{ fontSize: '48px' }}>🗑️</span>
          <h3 style={{ margin: '12px 0 8px' }}>O'chirishni tasdiqlang</h3>
          <p style={{ color: '#64748b', margin: '0 0 24px' }}>
            <b>"{product.title}"</b> mahsulotini o'chirmoqchimisiz? Bu amalni qaytarib bo'lmaydi.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="admin_btn secondary" style={{ flex: 1 }} onClick={onCancel}>Bekor</button>
            <button className="admin_btn danger" style={{ flex: 1 }} onClick={onConfirm}>Ha, o'chirish</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Buyurtmalar boshqaruvi ───────────────────────────────────────────────
const ORDER_STATUSES = ['Yangi', 'Tayyorlanmoqda', 'Yetkazilmoqda', 'Yetkazildi', 'Bekor qilindi']

function AdminOrders({ orders, updateOrderStatus }) {
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredOrders = statusFilter === 'all'
    ? orders
    : orders.filter(o => o.status === statusFilter)

  return (
    <>
      <div className="admin_topbar">
        <div>
          <h1 className="admin_page_title">Buyurtmalar boshqaruvi</h1>
          <p className="admin_page_sub">Jami {orders.length} ta buyurtma</p>
        </div>
      </div>

      <div className="admin_cats">
        <button className={statusFilter === 'all' ? 'admin_cat active' : 'admin_cat'} onClick={() => setStatusFilter('all')}>
          Barchasi ({orders.length})
        </button>
        {ORDER_STATUSES.map(s => (
          <button key={s} className={statusFilter === s ? 'admin_cat active' : 'admin_cat'} onClick={() => setStatusFilter(s)}>
            {s} ({orders.filter(o => o.status === s).length})
          </button>
        ))}
      </div>

      <div className="admin_table_wrap">
        <table className="admin_table">
          <thead>
            <tr>
              <th>Mijoz</th>
              <th>Telefon</th>
              <th>Mahsulotlar</th>
              <th>Summa</th>
              <th>Sana</th>
              <th>Holat</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                  Buyurtmalar topilmadi 😕
                </td>
              </tr>
            ) : filteredOrders.map(order => (
              <tr key={order.id} className="admin_row">
                <td>
                  <span className="admin_product_name">{order.fullName}</span>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>{order.address}</div>
                </td>
                <td>{order.phone}</td>
                <td>{order.items?.length || 0} ta mahsulot</td>
                <td className="admin_price">${order.totalPrice}</td>
                <td style={{ fontSize: '13px', color: '#64748b' }}>
                  {new Date(order.date).toLocaleDateString('uz-UZ')}
                </td>
                <td>
                  <select
                    className="admin_select order_status_select"
                    value={order.status}
                    onChange={e => updateOrderStatus(order.id, e.target.value)}
                    data-status={order.status}
                  >
                    {ORDER_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

// ─── Statistika dashboard ─────────────────────────────────────────────────
function AdminStats({ products, orders, categories }) {
  const totalRevenue = orders
    .filter(o => o.status !== 'Bekor qilindi')
    .reduce((sum, o) => sum + (o.totalPrice || 0), 0)

  const avgOrderValue = orders.length ? (totalRevenue / orders.length).toFixed(2) : 0

  const categoryBreakdown = categories.map(cat => ({
    name: cat,
    count: products.filter(p => p.category === cat).length
  })).sort((a, b) => b.count - a.count).slice(0, 8)

  const maxCatCount = Math.max(1, ...categoryBreakdown.map(c => c.count))

  const statusBreakdown = ORDER_STATUSES.map(s => ({
    status: s,
    count: orders.filter(o => o.status === s).length
  }))
  const maxStatusCount = Math.max(1, ...statusBreakdown.map(s => s.count))

  return (
    <>
      <div className="admin_topbar">
        <div>
          <h1 className="admin_page_title">Statistika</h1>
          <p className="admin_page_sub">Do'kon faoliyati bo'yicha umumiy ko'rinish</p>
        </div>
      </div>

      <div className="admin_stats">
        <div className="admin_stat_card">
          <span className="stat_icon">💰</span>
          <div>
            <p className="stat_label">Umumiy tushum</p>
            <p className="stat_value">${totalRevenue.toLocaleString()}</p>
          </div>
        </div>
        <div className="admin_stat_card">
          <span className="stat_icon">🧾</span>
          <div>
            <p className="stat_label">Jami buyurtmalar</p>
            <p className="stat_value">{orders.length}</p>
          </div>
        </div>
        <div className="admin_stat_card">
          <span className="stat_icon">📐</span>
          <div>
            <p className="stat_label">O'rtacha buyurtma</p>
            <p className="stat_value">${avgOrderValue}</p>
          </div>
        </div>
        <div className="admin_stat_card">
          <span className="stat_icon">📦</span>
          <div>
            <p className="stat_label">Jami mahsulot</p>
            <p className="stat_value">{products.length}</p>
          </div>
        </div>
      </div>

      <div className="admin_charts_grid">
        <div className="admin_chart_box">
          <h3>Kategoriya bo'yicha mahsulotlar</h3>
          {categoryBreakdown.length === 0 ? (
            <p className="no_reviews">Ma'lumot yo'q</p>
          ) : categoryBreakdown.map(c => (
            <div key={c.name} className="bar_chart_row">
              <span className="bar_chart_label">{c.name}</span>
              <div className="bar_chart_track">
                <div className="bar_chart_fill" style={{ width: `${(c.count / maxCatCount) * 100}%` }} />
              </div>
              <span className="bar_chart_value">{c.count}</span>
            </div>
          ))}
        </div>

        <div className="admin_chart_box">
          <h3>Buyurtmalar holati bo'yicha</h3>
          {statusBreakdown.map(s => (
            <div key={s.status} className="bar_chart_row">
              <span className="bar_chart_label">{s.status}</span>
              <div className="bar_chart_track">
                <div className="bar_chart_fill status_fill" style={{ width: `${(s.count / maxStatusCount) * 100}%` }} />
              </div>
              <span className="bar_chart_value">{s.count}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

// ─── Asosiy Admin Panel ───────────────────────────────────────────────────
function AdminPanel() {
  const {
    isAdmin, handleAdminLogout,
    adminProducts, loadProductsToAdmin,
    adminAddProduct, adminUpdateProduct, adminDeleteProduct, adminDeleteProducts,
    orders, updateOrderStatus,
  } = useAppContext()
  const navigate = useNavigate()
  useDocumentTitle('Admin Panel')

  const [section, setSection] = useState('products') // 'products' | 'orders' | 'stats'

  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('all')
  const [sortBy, setSortBy] = useState('default')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const [showForm, setShowForm] = useState(false)
  const [editProduct, setEditProduct] = useState(null)   // null = yangi qo'shish
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [selectedIds, setSelectedIds] = useState([])
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false)

  const PER_PAGE = 10

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) navigate('/admin/login')
  }, [isAdmin, navigate])

  // Mahsulotlarni bir marta yuklaymiz
  useEffect(() => {
    if (!adminProducts) {
      setLoading(true)
      loadProductsToAdmin().finally(() => setLoading(false))
    }
  }, [])

  const products = adminProducts || []

  // Kategoriyalar
  const categories = useMemo(() => {
    const cats = [...new Set(products.map(p => p.category).filter(Boolean))]
    return cats.sort()
  }, [products])

  // Filtered + sorted list
  const filtered = useMemo(() => {
    let list = [...products]
    if (search.trim()) list = list.filter(p => p.title?.toLowerCase().includes(search.toLowerCase()))
    if (catFilter !== 'all') list = list.filter(p => p.category === catFilter)
    if (sortBy === 'price_asc') list.sort((a, b) => a.price - b.price)
    else if (sortBy === 'price_desc') list.sort((a, b) => b.price - a.price)
    else if (sortBy === 'stock_asc') list.sort((a, b) => a.stock - b.stock)
    else if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating)
    return list
  }, [products, search, catFilter, sortBy])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleSearch = (e) => { setSearch(e.target.value); setPage(1) }
  const handleCat = (c) => { setCatFilter(c); setPage(1) }
  const handleSort = (e) => { setSortBy(e.target.value); setPage(1) }

  const openAdd = () => { setEditProduct(null); setShowForm(true) }
  const openEdit = (p) => { setEditProduct(p); setShowForm(true) }

  const handleSave = (data) => {
    if (editProduct) adminUpdateProduct(editProduct.id, data)
    else adminAddProduct(data)
    setShowForm(false)
    setEditProduct(null)
  }

  const handleDelete = () => {
    if (deleteTarget) { adminDeleteProduct(deleteTarget.id); setDeleteTarget(null) }
  }

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }
  const toggleSelectAllOnPage = () => {
    const pageIds = pageItems.map(p => p.id)
    const allSelected = pageIds.every(id => selectedIds.includes(id))
    setSelectedIds(prev => allSelected
      ? prev.filter(id => !pageIds.includes(id))
      : [...new Set([...prev, ...pageIds])])
  }
  const handleBulkDelete = () => {
    adminDeleteProducts(selectedIds)
    setSelectedIds([])
    setBulkDeleteConfirm(false)
  }

  const handleLogout = () => {
    handleAdminLogout()
    navigate('/admin/login')
  }

  // Statistika
  const totalStock = products.reduce((s, p) => s + (p.stock || 0), 0)
  const avgPrice = products.length ? (products.reduce((s, p) => s + (p.price || 0), 0) / products.length).toFixed(2) : 0
  const customCount = products.filter(p => p.isCustom).length

  return (
    <div className="admin_layout">
      {/* Sidebar */}
      <aside className="admin_sidebar">
        <div className="admin_logo">
          <span className="admin_logo_icon">🛡️</span>
          <span className="admin_logo_text">Admin Panel</span>
        </div>
        <nav className="admin_nav">
          <span
            className={section === 'products' ? 'admin_nav_item active' : 'admin_nav_item'}
            onClick={() => setSection('products')}
          >
            <span className="nav_icon">📦</span>
            <span className="nav_label">Mahsulotlar</span>
          </span>
          <span
            className={section === 'orders' ? 'admin_nav_item active' : 'admin_nav_item'}
            onClick={() => setSection('orders')}
          >
            <span className="nav_icon">🧾</span>
            <span className="nav_label">Buyurtmalar</span>
            {orders.length > 0 && <span className="admin_nav_badge">{orders.length}</span>}
          </span>
          <span
            className={section === 'stats' ? 'admin_nav_item active' : 'admin_nav_item'}
            onClick={() => setSection('stats')}
          >
            <span className="nav_icon">📈</span>
            <span className="nav_label">Statistika</span>
          </span>
        </nav>
        <nav className="admin_bosh">
          <button
          type="button"
          onClick={() => navigate('/')}
          className="auth_btn"
          style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', marginTop: '8px' }}
        >
          <span className="nav_icon">←</span>
          <span className="nav_label">Bosh sahifaga qaytish</span>
        </button>
        </nav>
        <button className="admin_logout_btn" onClick={handleLogout}>
          <span className="nav_icon">🚪</span>
          <span className="nav_label">Chiqish</span>
        </button>
      </aside>

      {/* Main content */}
      <main className="admin_main">
        {section === 'products' && (
          <>
            {/* Header */}
            <div className="admin_topbar">
              <div>
                <h1 className="admin_page_title">Mahsulotlar boshqaruvi</h1>
                <p className="admin_page_sub">Jami {products.length} ta mahsulot</p>
              </div>
              <button className="admin_btn primary admin_add_btn" onClick={openAdd}>
                ➕ Yangi mahsulot
              </button>
            </div>

            {/* Stats */}
            <div className="admin_stats">
              <div className="admin_stat_card">
                <span className="stat_icon">📦</span>
                <div>
                  <p className="stat_label">Jami mahsulot</p>
                  <p className="stat_value">{products.length}</p>
                </div>
              </div>
              <div className="admin_stat_card">
                <span className="stat_icon">🏷️</span>
                <div>
                  <p className="stat_label">Kategoriyalar</p>
                  <p className="stat_value">{categories.length}</p>
                </div>
              </div>
              <div className="admin_stat_card">
                <span className="stat_icon">📊</span>
                <div>
                  <p className="stat_label">Umumiy stok</p>
                  <p className="stat_value">{totalStock.toLocaleString()}</p>
                </div>
              </div>
              <div className="admin_stat_card">
                <span className="stat_icon">💵</span>
                <div>
                  <p className="stat_label">O'rtacha narx</p>
                  <p className="stat_value">${avgPrice}</p>
                </div>
              </div>
              <div className="admin_stat_card">
                <span className="stat_icon">✨</span>
                <div>
                  <p className="stat_label">Qo'shilgan</p>
                  <p className="stat_value">{customCount}</p>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="admin_filters">
              <input
                className="admin_search"
                type="text"
                placeholder="🔍 Mahsulot qidirish..."
                value={search}
                onChange={handleSearch}
              />
              <select className="admin_select" value={sortBy} onChange={handleSort}>
                <option value="default">Saralash</option>
                <option value="price_asc">Narx ↑</option>
                <option value="price_desc">Narx ↓</option>
                <option value="stock_asc">Stok ↑</option>
                <option value="rating">Reyting ↓</option>
              </select>
            </div>

            {/* Category tabs */}
            <div className="admin_cats">
              <button className={catFilter === 'all' ? 'admin_cat active' : 'admin_cat'} onClick={() => handleCat('all')}>
                Barchasi ({products.length})
              </button>
              {categories.map(c => (
                <button key={c} className={catFilter === c ? 'admin_cat active' : 'admin_cat'} onClick={() => handleCat(c)}>
                  {c} ({products.filter(p => p.category === c).length})
                </button>
              ))}
            </div>

            {/* Bulk actions bar */}
            {selectedIds.length > 0 && (
              <div className="admin_bulk_bar">
                <span>{selectedIds.length} ta mahsulot belgilandi</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="admin_btn secondary" onClick={() => setSelectedIds([])}>Bekor qilish</button>
                  <button className="admin_btn danger" onClick={() => setBulkDeleteConfirm(true)}>🗑️ Belgilanganlarni o'chirish</button>
                </div>
              </div>
            )}

            {/* Table */}
            {loading ? (
              <div className="admin_loading">
                <div className="admin_spinner"></div>
                <p>Mahsulotlar yuklanmoqda...</p>
              </div>
            ) : (
              <>
                <div className="admin_table_wrap">
                  <table className="admin_table">
                    <thead>
                      <tr>
                        <th>
                          <input
                            type="checkbox"
                            checked={pageItems.length > 0 && pageItems.every(p => selectedIds.includes(p.id))}
                            onChange={toggleSelectAllOnPage}
                          />
                        </th>
                        <th>Rasm</th>
                        <th>Nomi</th>
                        <th>Kategoriya</th>
                        <th>Narx</th>
                        <th>Stok</th>
                        <th>Reyting</th>
                        <th>Amallar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pageItems.length === 0 ? (
                        <tr>
                          <td colSpan={8} style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                            Hech narsa topilmadi 😕
                          </td>
                        </tr>
                      ) : pageItems.map(product => (
                        <tr key={product.id} className={product.isCustom ? 'admin_row custom_row' : 'admin_row'}>
                          <td>
                            <input
                              type="checkbox"
                              checked={selectedIds.includes(product.id)}
                              onChange={() => toggleSelect(product.id)}
                            />
                          </td>
                          <td>
                            <img
                              src={product.thumbnail}
                              alt={product.title}
                              className="admin_product_img"
                              onError={e => { e.target.src = 'https://via.placeholder.com/60' }}
                            />
                          </td>
                          <td>
                            <span className="admin_product_name">{product.title}</span>
                            {product.isCustom && <span className="admin_custom_badge">Yangi</span>}
                          </td>
                          <td>
                            <span className="admin_cat_pill">{product.category || '—'}</span>
                          </td>
                          <td className="admin_price">${product.price}</td>
                          <td>
                            <span className={`admin_stock ${product.stock < 10 ? 'low' : ''}`}>
                              {product.stock ?? '—'}
                            </span>
                          </td>
                          <td>
                            <span className="admin_rating">⭐ {product.rating ?? '—'}</span>
                          </td>
                          <td>
                            <div className="admin_actions">
                              <button className="admin_action_btn edit" onClick={() => openEdit(product)} title="Tahrirlash">
                                ✏️
                              </button>
                              <button className="admin_action_btn delete" onClick={() => setDeleteTarget(product)} title="O'chirish">
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="admin_pagination">
                    <button className="admin_page_btn" disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹</button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                      <button
                        key={n}
                        className={`admin_page_btn ${page === n ? 'active' : ''}`}
                        onClick={() => setPage(n)}
                      >
                        {n}
                      </button>
                    ))}
                    <button className="admin_page_btn" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>›</button>
                    <span className="admin_page_info">
                      {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} / {filtered.length}
                    </span>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {section === 'orders' && <AdminOrders orders={orders} updateOrderStatus={updateOrderStatus} />}
        {section === 'stats' && <AdminStats products={products} orders={orders} categories={categories} />}
      </main>

      {/* Modals */}
      {showForm && (
        <ProductForm
          initial={editProduct}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditProduct(null) }}
        />
      )}
      {deleteTarget && (
        <DeleteConfirm
          product={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
      {bulkDeleteConfirm && (
        <DeleteConfirm
          product={{ title: `${selectedIds.length} ta belgilangan mahsulot` }}
          onConfirm={handleBulkDelete}
          onCancel={() => setBulkDeleteConfirm(false)}
        />
      )}
    </div>
  )
}

export default AdminPanel
