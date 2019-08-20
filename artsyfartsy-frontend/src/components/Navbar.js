import React from 'react'
import {Link} from 'react-router-dom'

function Navbar(props) {
  
  return(
    <div className='navbar'>
      <Link to="/">Home</Link>
      <Link to="/gallery">Gallery</Link>
      <Link to="/explore">Explore</Link>
      <Link to="/piece/3900">Show Page</Link>
    </div>
  )
}

export default Navbar