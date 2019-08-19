import React from 'react'
import Expandcard from './Expandcard';

class Expand extends React.Component {
  state = {}

  render() {
    return (
      <div>
        <p id="recommended">Pieces you might like...</p>
        <div className='explore'>
          {this.props.expand.map(card => {
            return <Expandcard card={card} key={card.id} handleClick={this.props.handleClick} handleAddToGallery={this.props.handleAddToGallery}/>
          })}
        </div>
      </div>
    );
  }

}

export default Expand
