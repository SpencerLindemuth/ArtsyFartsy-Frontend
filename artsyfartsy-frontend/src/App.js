import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar'
import Gallery from './components/Gallery'
import Expand from './components/Expand'
import Draggable, {DraggableCore} from 'react-draggable';


class App extends React.Component {
  state = {
    imageSrc: '',
    expand: []
  }
  
  loadImage = () => {
    fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/436535').then(res => res.json()).then(data => {
      let ten = []
      for (let index = 0; index < 8; index++) {
        const element = data;
        ten.push(element)
      }
      this.setState({
        expand: [...ten]
      })
    })
  }

  componentDidMount() {
    this.loadImage()
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <Gallery imageSrc={this.state.imageSrc}/>
        <Expand expand={this.state.expand}/>
      </div>
    )
  }
}

export default App;
