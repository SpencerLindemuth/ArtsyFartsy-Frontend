import React from 'react'
import Gallerycard from './Gallerycard'

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  

  render() {
    return(
      <div id="galleryBackground">
        <div class="galleryWall">
          {this.props.myPic.map(pic => {
            return <Gallerycard card={pic} key={pic.id} handleClick={() => null} />
          })}
        </div>
      </div>
    )
  }

}

export default Gallery