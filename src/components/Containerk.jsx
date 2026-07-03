import React from 'react'

import "./component_style.css"
function Containerk({children}) {
  return (
    <div className='container'>
      {children}
    </div>
  )
}

export default Containerk
