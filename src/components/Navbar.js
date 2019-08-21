import React from 'react'
import {Link} from 'react-router-dom'
import frameLogo from '../images/frameLogo.png'

function Navbar(props) {
  return(
    <div className='navbar'>
      {/* <img src={frameLogo} id="framelogo" alt="logo"/> */}
      <Link to="/gallery">Gallery</Link>
      <Link to="/explore">Explore</Link>
      <Link to="/" onClick={() => {
        localStorage.setItem("jwt", null)
        localStorage.setItem("user", null)
      }}>Log Out</Link>
    </div>
  )
}

export default Navbar