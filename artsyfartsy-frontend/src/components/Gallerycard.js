import React from 'react'
import Draggable, {DraggableCore} from 'react-draggable';

class Gallerycard extends React.Component {
  state = {
      elementId: 0,
      xCord: 0,
      yCord: 0
  }

  setCoords = (ev) => {
    
  }

  saveCoords = (ev) => {
    let element = ev.target
    let rect = element.getBoundingClientRect();
    this.setState=({
        xCord: rect.left,
        yCord: rect.top
    })
    localStorage.setItem(`xCord${this.props.card.id}`, rect.left)
    localStorage.setItem(`yCord${this.props.card.id}`, rect.top)
  }

  componentWillMount = () => {
      if(localStorage.getItem(`xCord${this.props.card.id}`) && localStorage.getItem(`yCord${this.props.card.id}`)){
       this.setState({xCord: localStorage.getItem('xCord'), yCord: localStorage.getItem('yCord')})
      }else{
          this.setState({xCord: 100, yCord: 100})
      }
  }

  render() {
    return (
      <Draggable grid={[1,1]} onStop={this.saveCoords} defaultPosition={{x: this.state.xCord, y: this.state.yCord}} bounds={"parent"}>
          <img src={this.props.card.primaryImage} alt='' draggable="false"/>
        </Draggable>
    );
  }

}

export default Gallerycard