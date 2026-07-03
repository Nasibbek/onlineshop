import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Toast from '../components/Toast'
import TopLoadingBar from '../components/TopLoadingBar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../context/Appcontext'

function PageLayout() {
  const { cart, isLoggedIn, user, addToCart } = useAppContext()

  return (
    <div>
      <TopLoadingBar />
      <Navbar cart={cart} isLoggedIn={isLoggedIn} user={user} />
      <main>
        <Outlet context={{ addToCart }} />
      </main>
      <Footer />
      <Toast />
    </div>
  )
}

export default PageLayout
