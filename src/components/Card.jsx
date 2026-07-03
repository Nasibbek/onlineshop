import React from 'react'
import "./component_style.css"
function Card({children}) {
  return (
    <div className='pro_card'>
      {children}
    </div>
  )
}

export default Card
