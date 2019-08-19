import React from 'react'
import ShowImage from './ShowImage'

class Expandcard extends React.Component {
  state = {}

  clickHandler = () => {
    this.props.handleClick(`/piece/${this.props.card.id}`)
  }
  render() {
    return (
          <div className="explorecard" onClick={() => <ShowImage handleAdd={this.handleAdd} piece={this.props.card}/>} className='explorecard'>
          <img src={this.props.card.primaryImageSmall} alt='' />
            <p id="exploreArtist">
              {this.props.card.artistDisplayName}
            </p>
            <p id="exploreTitle">{this.props.card.title}</p>
          </div>
    );
  }

}

export default Expandcard