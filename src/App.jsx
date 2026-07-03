import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'

import Home from './Page/Home'
import About from './Page/About'
import Servise from './Page/Servise'
import Help from './Page/Help'
import PageLayout from './Layout/PageLayout'
import Products from './Page/Products'
import Product from './helper/Product'
import Detail from './helper/Detail'
import CartPage from './Page/CardPage'
import Register from './Page/Register'
import Login from './Page/Login'
import Profile from './Page/Profile'
import NotFound from './Page/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import AdminLogin from './Page/AdminLogin'
import AdminPanel from './Page/AdminPanel'
import { ErrorBoundary, RouteErrorBoundary } from './components/ErrorBoundary'
import OfflineBanner from './components/OfflineBanner'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

// Sahifalar orasidagi almashinuvga yumshoq fade-in effekti beradi
function RouteTransition({ children }) {
  const { pathname } = useLocation()
  return (
    <div key={pathname} className="route_fade_in">
      {children}
    </div>
  )
}

function AppWithScroll() {
  return (
    <>
      <ScrollToTop />
      <PageLayout />
    </>
  )
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Admin routes — Navbar/Footer yo'q */}
      <Route path='/admin/login' element={<AdminLogin />} errorElement={<RouteErrorBoundary />} />
      <Route path='/admin' element={<AdminPanel />} errorElement={<RouteErrorBoundary />} />

      {/* Asosiy sayt */}
      <Route element={<AppWithScroll />} errorElement={<RouteErrorBoundary />}>
        <Route path='/' element={<RouteTransition><Home /></RouteTransition>} />
        <Route path='/about' element={<RouteTransition><About /></RouteTransition>} />
        <Route path='/servise' element={<RouteTransition><Servise /></RouteTransition>} />
        <Route path='/help' element={<RouteTransition><Help /></RouteTransition>} />

        <Route path='/products' element={<RouteTransition><Products /></RouteTransition>}>
          <Route index element={<Product />} />
          <Route path='show_all' element={<Product />} />
          <Route path='product/:id' element={<Detail />} />
        </Route>

        <Route path='/cart' element={
          <RouteTransition><ProtectedRoute><CartPage /></ProtectedRoute></RouteTransition>
        } />
        <Route path='/login' element={<RouteTransition><Login /></RouteTransition>} />
        <Route path='/register' element={<RouteTransition><Register /></RouteTransition>} />
        <Route path='/profile' element={
          <RouteTransition><ProtectedRoute><Profile /></ProtectedRoute></RouteTransition>
        } />
        <Route path='*' element={<RouteTransition><NotFound /></RouteTransition>} />
      </Route>
    </>
  )
)

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
      <OfflineBanner />
    </ErrorBoundary>
  )
}

export default App
