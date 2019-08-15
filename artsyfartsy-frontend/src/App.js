import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Gallery from './components/Gallery'
import Expand from './components/Expand'
import Draggable, {DraggableCore} from 'react-draggable';


class App extends React.Component {
  state = {
    imageSrc: '',
    expand: [],
    top: []
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

  componentDidMount() {
    this.loadImage()
  }

  addToGallery = (card) => {

    if (this.state.top.length <6) {
      let pieces = this.state.expand.filter((piece) => {
        return piece !== card
      })
      this.setState({
        top: [...this.state.top, card],
        expand: [...pieces]
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
    return (
      <div className="App">
        <Navbar />
        <Gallery handleClick={this.removeFromGallery} myPic={this.state.top}/>
        <hr></hr>
        <Expand handleClick={this.addToGallery} expand={this.state.expand} />
      </div>
    )
  }
}

export default App;
