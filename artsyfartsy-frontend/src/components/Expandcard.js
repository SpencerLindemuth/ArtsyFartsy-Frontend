import React from 'react'
import Draggable, {DraggableCore} from 'react-draggable';

class Expandcard extends React.Component {
  state = {}

  render() {
    return (
          <div className="explorecard" onClick={() => this.props.handleClick(this.props.card)} className='explorecard'>
          <img src={this.props.card.primaryImage} alt='' />
            <p id="exploreArtist">
              {this.props.card.artistDisplayName}
            </p>
            <p id="exploreTitle">{this.props.card.title}</p>
          </div>
    );
  }

}

export default Expandcard