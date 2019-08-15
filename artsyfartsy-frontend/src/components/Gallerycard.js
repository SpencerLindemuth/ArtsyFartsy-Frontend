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

  }


  render() {
    return (
      <DraggableCore grid={[1,1]} onDrag={this.setCoords} onStop={this.saveCoords}>
          <span className="gallerycard" onClick={() => this.props.handleClick(this.props.card)} className='explorecard' id={this.props.card.id}>
          <img src={this.props.card.primaryImage} alt='' draggable="false"/>
          </span>
        </DraggableCore>
    );
  }

}

export default Gallerycard