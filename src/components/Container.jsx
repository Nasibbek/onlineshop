import React from 'react'
import "./component_style.css"
function Container({children}) {
  return (
    <div className='container1'>
      {children}
    </div>
  )
}

export default Container
