import React from 'react'
import Logo from '../images/logo.png'
import { BrowserRouter as NavLink } from 'react-router-dom' 

class Homepage extends React.Component {
  state = {}



  render() {
    return(
      <div>
        <img id="logo" src={Logo} alt='brilliant logo' />
      </div>
    )
  }
}

export default Homepage

