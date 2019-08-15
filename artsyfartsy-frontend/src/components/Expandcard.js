import React from 'react'
import Draggable, {DraggableCore} from 'react-draggable';

class Expandcard extends React.Component {
  state = {}

  render() {
    return (
      <Draggable>
          <span className="explorecard" onClick={() => this.props.handleClick(this.props.card)} className='explorecard'>
          <img src={this.props.card.primaryImage} alt='' />
            <p>
              {this.props.card.artistDisplayName}
            </p>
          </span>
        </Draggable>
    );
  }

}

export default Expandcard