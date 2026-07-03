import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import "./bread.css"

function BreadCrumb() {
    const location = useLocation()

    const crumbs = location.pathname.split("/").filter(val => val !== "")

    return (
        <div className="breadcrumb">
            {crumbs.map((val, index) => (
                <React.Fragment key={index}>
                    <Link 
                        className="breadcrumb_link"
                        to={`/${crumbs.slice(0,index + 1).join("/")}`}
                    >
                        {val}
                    </Link>

                    {index < crumbs.length - 1 && (
                        <span className="separator">/</span>
                    )}
                </React.Fragment>
            ))}
        </div>
    )
}

export default BreadCrumb