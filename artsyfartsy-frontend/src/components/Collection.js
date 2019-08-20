import React from 'react'
import Filterbar from './Filterbar'
import Expandcard from './Expandcard'

class Collection extends React.Component {

  state = {
    collection: [],
    filteredCol: [],
    currentDepts: [],
    highlights: false,
    artistName: ["Select an artist"],
    artistNats: [],
    department: ["Select a department"],
    keyword: ''
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
        collection: [...colImgs],
        filteredCol: [...colImgs]
      })
    })
  }

  componentDidMount() {
    this.loadImage()
    this.getNationalities()
  }

  handleChangeHighlights = (ev) => {
    let highlightsVal = !this.state.highlights
    this.setState({highlights: !this.state.highlights})
    this.updateHighlights(highlightsVal)
  }

  updateHighlights = (highlightsVal) => {
    if (highlightsVal === true) {
      let filtered = this.state.collection.filter((piece) => {
        return piece.isHighlight === true
      })
      this.setState({
        filteredCol: [...filtered]
      })
    } else {
      this.setState({
        filteredCol: [...this.state.collection],
        artistName: ["Select an artist"],
        department: ["Select a department"],
        keyword: ''
      })
    }
  }

  handleChangeArtist = (ev) => {
    let artistNameVal = ev.target.value
    this.setState({artistName: ev.target.value})
    this.updateArtist(artistNameVal)
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
        filteredCol: [...filtered],
        department: ["Select a department"],
        keyword: ''
      })
    }
  }

  handleChangeDepartment = (ev) => {
    let departmentVal = ev.target.value
    this.setState({department: ev.target.value})
    this.updateDepartment(departmentVal)
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
      this.setState({
        filteredCol: [...filtered],
        artistName: ["Select an artist"],
        keyword: ''
      })
    }
  }

  handleKeywordChange = (ev) => {
    let userInput = ev.target.value.toLowerCase()
    this.setState({keyword: ev.target.value})
    this.handleKeywordSearch(userInput)
    
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
    this.setState({
      filteredCol: [...filtered],
      artistName: ["Select an artist"],
      department: ["Select a department"]
    })
  }

  getNationalities = () => {
    let allNats = []
    this.state.collection.forEach(piece => {
      if (piece.artistNationality !== "" && !allNats.includes(piece.artistNationality)) {
        allNats.push(piece.artistNationality)
      }
    })
    this.setState({
      artistNats: [...allNats]
    })
  }

  render() {
    return (
      <div>  
        <div>
          <Filterbar 
          artistNats={this.state.artistNats}
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
