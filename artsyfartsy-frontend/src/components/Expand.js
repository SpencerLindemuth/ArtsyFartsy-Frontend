import React from 'react'
import Expandcard from './Expandcard';

class Expand extends React.Component {
  state = {}

  render() {
    return (
      <div className='explore'>
        {this.props.expand.map(card => {
          return <Expandcard card={card} key={card.id} handleClick={this.props.handleClick}/>
        })}
      </div>
    );
  }

}

export default Expand
