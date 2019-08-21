import React from 'react'
import Filterbar from './Filterbar'
import Expandcard from './Expandcard'

class Collection extends React.Component {

  state = {
    collection: [],
    filteredCol: [],

    highlights: false,
    artistName: ["Select an artist"],
    artistNationality: ["Select a nationality"],
    department: ["Select a department"],
    keyword: '',

    noResultsCard: [{
      "id": '0000',
      "isHighlight": false,
      "primaryImage": "Your search returned no results",
      "primaryImageSmall": "",
      "department": null,
      "objectName": null,
      "title": "Your search returned no results",
      "culture": "",
      "artistDisplayName": null,
      "objectDate": null,
      "medium": null,
      "dimensions": null,
      "classification": null,
      "repository": "Metropolitan Museum of Art, New York, NY",
      "objectURL": null,
      "tags": "[]",
      "country": null,
      "artistNationality": null
    }],
  }
  
  loadImage = () => {
    fetch('https://artsy-fartsy-backend.herokuapp.com/explore').then(res => res.json()).then(data => {
      let colImgs = []
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if (element.primaryImage !== "") {
          colImgs.push(element)
        }
      }
      this.setState({
        collection: [...colImgs],
        filteredCol: [...colImgs]
      })
    })
  }

  componentDidMount() {
    this.loadImage()
  }

  handleChangeHighlights = () => {
    let highlightsVal = !this.state.highlights
    this.setState({highlights: !this.state.highlights})
    this.updateHighlights(highlightsVal)
    this.setState({
      artistName: ["Select an artist"],
      artistNationality: ["Select a nationality"],
      department: ["Select a department"],
      keyword: ''
    })
  }

  updateHighlights = (highlightsVal) => {
    if (highlightsVal === true) {
      let filtered = this.state.collection.filter((piece) => {
        return piece.isHighlight === true
      })
      this.setState({
        filteredCol: [...filtered],
      })
    } else {
      this.setState({
        filteredCol: [...this.state.collection],
      })
    }
  }

  handleChangeArtist = (ev) => {
    let artistNameVal = ev.target.value
    this.setState({artistName: ev.target.value})
    this.updateArtist(artistNameVal)
    this.setState({
      highlights: false,
      artistNationality: ["Select a nationality"],
      department: ["Select a department"],
      keyword: ''
    })
  }

  updateArtist = (artistNameVal) => {
    if (artistNameVal === "Select an artist") {
      this.setState({
        filteredCol: [...this.state.collection]
      })
    } else {
      let filtered = this.state.collection.filter((piece) => {
        return piece.artistDisplayName === artistNameVal
      })
      this.setState({
        filteredCol: [...filtered]
      })
    }
  }

  handleChangeDepartment = (ev) => {
    let departmentVal = ev.target.value
    this.setState({department: ev.target.value})
    this.updateDepartment(departmentVal)
    this.setState({
      highlights: false,
      artistName: ["Select an artist"],
      artistNationality: ["Select a nationality"],
      keyword: ''
    })
  }

  updateDepartment = (departmentVal) => {
    if (departmentVal === "Select a department") {
      this.setState({
        filteredCol: [...this.state.collection]
      })
    } else {
      let filtered = this.state.collection.filter((piece) => {
        return piece.department === departmentVal
      })
      if (filtered.length >= 1) {
        this.setState({
          filteredCol: [...filtered]
        })
      } else {
        this.setState({
          filteredCol: [...this.state.noResultsCard]
        })
      }
    }
  }

  handleKeywordChange = (ev) => {
    let userInput = ev.target.value.toLowerCase()
    this.setState({keyword: ev.target.value})
    this.handleKeywordSearch(userInput)
    this.setState({
      highlights: false,
      artistName: ["Select an artist"],
      artistNationality: ["Select a nationality"],
      department: ["Select a department"]
    })
  }

  handleKeywordSearch = (userInput) => {
    let filtered = []
    let searchBase = this.state.collection
      for (let i = 0; i < searchBase.length; i++) {
        const piece = searchBase[i];
        if (piece.tags.toLowerCase().includes(userInput)){
          filtered.push(piece)
      }
    }
    if (filtered.length >= 1) {
      this.setState({
        filteredCol: [...filtered]
      })
    } else {
      this.setState({
        filteredCol: [...this.state.noResultsCard]
      })
    }
  }

  handleNatChange = (ev) => {
    let natVal = ev.target.value
    this.setState({ artistNationality: ev.target.value })
    this.updateNationality(natVal)
    this.setState({
      highlights: false,
      artistName: ["Select an artist"],
      department: ["Select a department"],
      keyword: ''
    })
  }

  updateNationality = (natVal) => {
    if (natVal === "Select a nationality") {
      this.setState({
        filteredCol: [...this.state.collection]
      })
    } else {
      let filtered = this.state.collection.filter((piece) => {
        return piece.artistNationality === natVal
      })
      if (filtered.length >= 1) {
        this.setState({
          filteredCol: [...filtered]
        })
      } else {
        this.setState({
          filteredCol: [...this.state.noResultsCard]
        })
      }
    }
  }

  render() {
    return (
      <div>  
        <div>
          <Filterbar 
          highlightValue={this.state.highlights}
          artistNats={this.state.artistNats}
          showArtistNat={this.handleNatChange}
          artistNatIs={this.state.artistNationality}
          showHighlights={this.handleChangeHighlights} 
          showArtist={this.handleChangeArtist} 
          artistNameIs={this.state.artistName}
          showDepartment={this.handleChangeDepartment}
          departmentIs={this.state.department}
          updateKeyword={this.handleKeywordChange}
          currentWord={this.state.keyword}
          />
          <hr></hr>
          <div className='explore'>
            {this.state.filteredCol.map(piece => {
              return <Expandcard card={piece} key={piece.id} handleClick={this.props.history.push} />
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default Collection
