import React from 'react';
import Filterbar from './Filterbar'
import Filterresults from './Filterrestults'
import Collectioncard from './Expandcard';

class Collection extends React.Component {

  state = {
    collection: [],
    highlights: [],
    departments: [],
    keywords: [],
    artistname: [],
    filtervalue: []
  }
  
  loadImage = () => {
    fetch('http://localhost:3000/pieces').then(res => res.json()).then(data => {
      let colImgs = []
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if (element.primaryImage !== "") {
          colImgs.push(element)
        }
      }
      this.setState({
        collection: [...colImgs]
      })
    })
  }

  componentDidMount() {
    this.loadImage()
  }

  getArtistName = () => {
    let filtered = this.state.collection.filter((piece => {
      return piece.artistDisplayName === this.filtervalue
    }))
    this.setState({
      artistname: [...filtered]
    })
  }

  isColHighlight = () => {
    let filtered = this.state.collection.map((piece) => {
      return piece.isHighlight !== true
    })
    this.setState({
      highlights: [...filtered]
    })
  }


  render() {
    return (
      <div>  
        <div>
          <Filterbar />
          <hr></hr>
          <Filterresults />
        </div>
      </div>
    )
  }
}

export default Collection
