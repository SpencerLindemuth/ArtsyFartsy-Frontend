import React from 'react'

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  

  render() {
    return(
      <div>
        <img src={this.props.imageSrc} alt=''/>
      </div>
    )
  }

}

export default Gallery