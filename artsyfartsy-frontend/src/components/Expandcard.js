import React from 'react'

class Expandcard extends React.Component {
  state = {}

  render() {
    return (
      <div className='explorecard'>
        <img src={this.props.card.primaryImage} alt='' />
        <p>
          {this.props.card.artistDisplayName}
        </p>
      </div>
    );
  }

}

export default Expandcard