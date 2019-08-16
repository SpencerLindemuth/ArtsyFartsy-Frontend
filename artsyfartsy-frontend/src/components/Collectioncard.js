import React from 'react'
import Draggable, { DraggableCore } from 'react-draggable';

class Collectioncard extends React.Component {
  state = {}

  render() {
    return (
      <div className="explorecard" onClick={() => this.props.handleClick(this.props.card)} >
        <img src={this.props.card.primaryImage} alt='' />
        <p>
          {this.props.card.artistDisplayName}
        </p>
      </div>
    );
  }

}

export default Collectioncard