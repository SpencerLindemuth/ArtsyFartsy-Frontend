import React from 'react'
import Logo from '../images/logo.png'
import { BrowserRouter as NavLink } from 'react-router-dom' 

class Homepage extends React.Component {
  state = {}



  render() {
    return(
      <div>
        <h1>Welcome to Artsy-Fartsy!</h1>
        <img id="logo" src={Logo} alt='brilliant logo' />
        <NavLink
          to="/gallery"
          exact
        >Go to your gallery</NavLink>
        <NavLink
          to="/explore"
          exact
        >Explore our collection</NavLink>
      </div>
    )
  }
}

export default Homepage

