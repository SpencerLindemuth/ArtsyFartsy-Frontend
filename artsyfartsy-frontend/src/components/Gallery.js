import React from 'react';
import Gallerycard from './Gallerycard'
import Expand from './Expand'


class Gallery extends React.Component {
  state = {
    imageSrc: '',
    expand: [],
    top: []
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
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
          if (element.primaryImage !== "" && ten.length < 8 ) {
            ten.push(element)
          } 
      }
      this.setState({
        expand: [...ten]
      })
    })
  }

  addToGallery = (card) => {
    //filter this bitch
    if(this.state.top.includes(card)){
      console.log('This piece already in your gallery')
    }else{
      if (this.state.top.length <6) {
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
            top: [...this.state.top, card],
            expand: [...pieces]
          })
        })
      } else {
        console.log('You have enough Old Masters.')
      }
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