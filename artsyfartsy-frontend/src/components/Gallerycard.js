import React from 'react'
import Draggable, {DraggableCore} from 'react-draggable';

class Gallerycard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            elementId: props.card.id,
            xCord: localStorage.getItem(`xCord${props.card.id}`)? parseInt(localStorage.getItem(`xCord${props.card.id}`)):100,
            yCord: localStorage.getItem(`yCord${props.card.id}`)? parseInt(localStorage.getItem(`yCord${props.card.id}`)):100
        }
    }
  

  setCoords = (ev) => {
    
  }

  saveCoords = (ev) => {
    let element = ev.target
    let rect = element.getBoundingClientRect();
    let wall = document.querySelector(".galleryWall")
    let box = wall.getBoundingClientRect()
    let offLeft = box.x + window.scrollX
    let offTop = box.y + window.scrollY
    console.log(offLeft)
    this.setState=({
        xCord: rect.x + window.scrollX - offLeft,
        yCord: rect.y + window.scrollY - offTop
    })
    localStorage.setItem(`xCord${this.props.card.id}`, (rect.x + window.scrollX - offLeft))
    console.log(`xCord${this.props.card.id}`, rect.left)
    localStorage.setItem(`yCord${this.props.card.id}`, (rect.y + window.scrollY - offTop))
    console.log(`yCord${this.props.card.id}`, rect.top)
  }

  render() {
    return (
      <Draggable grid={[5,5]} onStop={this.saveCoords} defaultPosition={{x: this.state.xCord, y: this.state.yCord}}>
          <img src={this.props.card.primaryImage} alt='' draggable="false" id={this.props.card.id}/>
        </Draggable>
    );
  }

}

export default Gallerycard