import React from 'react'
import Draggable, {DraggableCore} from 'react-draggable';
import FreeTransform from 'react-free-transform'

class Gallerycard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            elementId: props.card.id,
            xCord: localStorage.getItem(`xCord${props.card.id}/${props.userId}`)? parseInt(localStorage.getItem(`xCord${props.card.id}/${props.userId}`)):0,
            yCord: localStorage.getItem(`yCord${props.card.id}/${props.userId}`)? parseInt(localStorage.getItem(`yCord${props.card.id}/${props.userId}`)):0
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
    localStorage.setItem(`xCord${this.props.card.id}/${this.props.userId}`, (rect.x + window.scrollX - offLeft))
    localStorage.setItem(`yCord${this.props.card.id}/${this.props.userId}`, (rect.y + window.scrollY - offTop))
  }

  render() {
    let wall = document.querySelector("#galleryBackground")
    let rect = wall.getBoundingClientRect()
    return (
      <Draggable grid={[5,5]} onStop={this.saveCoords} defaultPosition={{x: this.state.xCord, y: this.state.yCord}} bounds={{left: rect.left, top: 0, right: 1119, bottom: 174}}>
            <img src={this.props.card.primaryImage} alt='' draggable="false" id={this.props.card.id}/>
        </Draggable>
    );
  }
}

export default Gallerycard