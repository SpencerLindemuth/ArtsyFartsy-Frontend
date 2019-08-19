import React from 'react';
import Gallerycard from './Gallerycard'
import Expand from './Expand'


class Gallery extends React.Component {
  state = {
    imageSrc: '',
    expand: [],
    top: [],
    full50: []
  }

  getGallery(){
    fetch(`http://localhost:3000/users/${3}/gallery`)
    .then(res => res.json())
    .then(data => {
      this.setState({
        top: [...data]
      })
    })
  }
  
  loadImage = () => {
    fetch('http://localhost:3000/pieces').then(res => res.json()).then(data => {
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
          if (element.primaryImage !== "" && ten.length < 8 ) {
            ten.push(element)
          } 
          data.shift()
      }
      this.setState({
        full50: [...data],
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
      fetch("http://localhost:3000/users/add", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({user_id: 3, piece: card})
      })
      .then(res => {
        this.setState({
          top: [...temp],
          expand: [...pieces]
        })
      })
    } else {
      console.log('You have enough Old Masters.')
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
  

  render() {
    if(this.state.expand.length < 8){
      this.loadImage()
    }
    return(
      <div className="page">
        <div id="galleryBackground">
          <div className="galleryWall">
            {this.state.top.map(pic => {
              return <Gallerycard card={pic} key={pic.id} userId={3} handleClick={() => null} />
            })}
          </div>
        </div>
        <hr></hr>
        <Expand handleClick={this.addToGallery} expand={this.state.expand} />
      </div>
    )
  }

  componentDidMount() {
    this.getGallery()
    this.loadImage()
  }

}

export default Gallery