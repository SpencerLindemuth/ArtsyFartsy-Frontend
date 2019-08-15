import React from 'react'
import Expandcard from './Expandcard'

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  

  render() {
    return(
      <div>
        {this.props.myPic.map(pic => {
          return <Expandcard card={pic} key={pic.id} handleClick={this.props.handleClick} />
        })}
      </div>
    )
  }

}

export default Gallery