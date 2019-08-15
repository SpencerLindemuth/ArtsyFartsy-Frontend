import React from 'react'
import Draggable, {DraggableCore} from 'react-draggable';

class Gallerycard extends React.Component {
  state = {}

  render() {
    return (
      <Draggable grid={[1,1]}>
          <span className="explorecard" onClick={() => this.props.handleClick(this.props.card)} className='explorecard'>
          <img src={this.props.card.primaryImage} alt='' />
          </span>
        </Draggable>
    );
  }

}

export default Gallerycard