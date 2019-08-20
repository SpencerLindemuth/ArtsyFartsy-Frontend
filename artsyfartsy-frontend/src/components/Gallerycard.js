import React from 'react'
import Draggable from 'react-draggable';
class Gallerycard extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            elementId: props.card.id,
            xCord: localStorage.getItem(`xCord${props.card.id}/${props.userId}`)? parseInt(localStorage.getItem(`xCord${props.card.id}/${props.userId}`)):0,
            yCord: localStorage.getItem(`yCord${props.card.id}/${props.userId}`)? parseInt(localStorage.getItem(`yCord${props.card.id}/${props.userId}`)):0
        }
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

  handleMouseEnter = (ev) => {
    let button = document.getElementById(`delete-${this.props.card.id}`)
    button.className = "deletebutton"
  }

  handleMouseLeave = (ev) => {
    let button = document.getElementById(`delete-${this.props.card.id}`)
    if(ev.target !== button){
      button.className = "hidden"
    }
  }

  handleButtonEnter = (ev) => {
    ev.target.className = "deletebutton"
    let img = document.getElementById(this.props.card.id)
    img.style.opacity = .8
  }

  handleButtonLeave = (ev) => {
    ev.target.className = "hidden"
    let img = document.getElementById(this.props.card.id)
    img.style = null
  }


  render() {
    return (
      <Draggable grid={[5,5]} onStop={this.saveCoords} defaultPosition={{x: this.state.xCord, y: this.state.yCord}}>
          <div>
            <button id={`delete-${this.props.card.id}`} className="hidden" onClick={() => this.props.removeFromGallery(this.props.card)} onMouseEnter={this.handleButtonEnter} onMouseLeave={this.handleButtonLeave}>X</button>
            <img src={this.props.card.primaryImageSmall} alt='' draggable="false" id={this.props.card.id} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}/>
          </div>
        </Draggable>
    );
  }
}

export default Gallerycard