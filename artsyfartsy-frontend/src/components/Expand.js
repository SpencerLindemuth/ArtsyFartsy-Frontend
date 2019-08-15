import React from 'react'
import Expandcard from './Expandcard';

class Expand extends React.Component {
  state = {}

  render() {
    return (
      <div className='explore'>
        {this.props.expand.map(card => {
          return <Expandcard disabled={true} card={card} />
        })}
      </div>
    );
  }

}

export default Expand