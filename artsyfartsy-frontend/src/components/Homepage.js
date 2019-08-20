import React from 'react'
import Logo from '../images/logo.png'
import { BrowserRouter as NavLink } from 'react-router-dom' 

class Homepage extends React.Component {
  state = {
    username: "",
    password: ""
  }

  handleUsernameChange = (ev) => {
    this.setState({
      username: ev.target.value
    })
  }

  handlePasswordChange = (ev) => {
    this.setState({
      password: ev.target.value
    })
  }


  handleSumbit = (ev) => {
    ev.preventDefault()
    this.setState({
      username: "",
      password: ""
    })
    fetch("http://localhost:3000/tokens", {
      method: "POST",
      headers: {"content-type" : "application/json"},
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    }).then(res => res.json())
    .then(data => {
      if(data.status){
        console.log("error", data)
      }else{
        console.log("logged in", data)
      }
    })
  }


  render() {
    return(
      <div>
        <form onSubmit={this.handleSumbit}>
          <input type="text" value={this.state.username} placeholder="Username" onChange={this.handleUsernameChange} />
          <input type="password" value={this.state.password} placeholder="Password" onChange={this.handlePasswordChange}/>
          <input type="submit" value="Log In" />
        </form>
        <img id="logo" src={Logo} alt='brilliant logo' />
      </div>
    )
  }
}

export default Homepage

