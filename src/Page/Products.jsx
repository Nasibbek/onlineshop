import React from 'react'
import "./page.css"
import { NavLink, Outlet, useOutletContext } from 'react-router-dom'
import useDocumentTitle from '../hooks/useDocumentTitle'

function Products() {
    useDocumentTitle('Barcha mahsulotlar', "ShopUZ'dagi barcha mahsulotlarni ko'ring, qidiring va filtrlang")
    const context = useOutletContext(); 

    return (
        <div>
            <h1 className='product_title'>All products</h1>
            <hr />
            <NavLink to='show_all' className='show_hide'>Show All product</NavLink>
            <Outlet context={context}></Outlet>
        </div>
    )
}

export default Products