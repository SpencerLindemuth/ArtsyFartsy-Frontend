import React from 'react';
import Gallerycard from './Gallerycard'
import Expand from './Expand'


class Gallery extends React.Component {
  
  state = {
    imageSrc: '',
    expand: [],
    top: [],
    scrollPosition: 0,
    userId: null
  }

  getUser = () => {
    let user = localStorage.getItem("user")
    if(user !== null){
      this.setState({
        userId: user
      })
    }
    else{
      this.props.history.push('/')
    }
  }

  getGallery(){
    let user = localStorage.getItem("user")
    fetch(`https://artsy-fartsy-backend.herokuapp.com/users/${user}/gallery`)
    .then(res => res.json())
    .then(data => {
      if(data.status){
        this.props.history.push('/')
      }else{
      this.setState({
        top: [...data]
      })
    }
    })
  }
  
  loadImage = () => {
    fetch('https://artsy-fartsy-backend.herokuapp.com/pieces').then(res => res.json()).then(data => {
      let ten = []
      let temp = data.filter(piece => {
        let dupe = false
        for(let i = 0; i < this.state.top.length; i++){
          if(this.state.top[i].id === piece.id){
            dupe = true
          }
        }
        return dupe ? false : piece
      })
      for (let index = 0; index < temp.length; index++) {
        const element = temp[index];
          if (element.primaryImage !== "") {
            ten.push(element)
          } 
          data.shift()
      }
      this.setState({
        expand: [...ten]
      })
    })
  }

  isEquals = (a, b) => {
    if(a === b){
      return true
    }
    else{
      return false
    }
  }

  addToGallery = (card) => {
    let dupe = false
    let temp = this.state.top.filter(piece => piece.id !== card.id? piece : dupe=true)
    temp.push(card)
    if (this.state.top.length < 12 && dupe === false) {
      let pieces = this.state.expand.filter((piece) => {
        return piece !== card
      })
      fetch("https://artsy-fartsy-backend.herokuapp.com/users/add", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({user_id: this.state.userId, piece: card})
      })
      .then(res => {
        this.setState({
          top: [...temp],
          expand: [...pieces]
        })
      })
    }
  }

  removeFromGallery = (card) => {
    let pieces = this.state.top.filter((piece) => {
      return piece !== card
    })
    this.setState({
      expand: [...this.state.expand, card],
      top: [...pieces]
    })
  }

  removeFromGallery = (piece) => {
    fetch("https://artsy-fartsy-backend.herokuapp.com/users", {
        method: "DELETE",
        headers: {"content-type" : "application/json"},
        body: JSON.stringify({
            user_id: this.state.userId,
            piece_id: piece.id
        })
    }).then(res => {
      let temp = this.state.top.filter(item => item.id !== piece.id)
      this.setState({
        top: [...temp]
      })
    })
  }

  

  render() {
    // if(this.state.expand.length < 8){
    //   this.loadImage()
    // }
    return(
      <div className="page">
        <div id="galleryBackground">
          <div className="galleryWall">
            {this.state.top.map(pic => {
              return <Gallerycard card={pic} key={pic.id} userId={this.state.userId} handleClick={() => null} removeFromGallery={this.removeFromGallery} />
            })}
          </div>
        </div>
        <hr></hr>
        <Expand handleClick={this.props.history.push} handleAddToGallery={this.addToGallery} expand={this.state.expand} />
      </div>
    )
  }

  componentDidMount() {
    this.getUser()
    this.getGallery()
    this.loadImage()
  }

}

export default Gallery