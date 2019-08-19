import React from 'react'
import Filterbar from './Filterbar'
import Expandcard from './Expandcard'

class Collection extends React.Component {

  state = {
    collection: [],
    filteredCol: [],
    highlights: false,
    artistName: ["Select an artist"],
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
      this.setState({filteredCol: [...this.state.collection]})
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
        filteredCol: [...filtered]
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
        filteredCol: [...filtered]
      })
    }
  }

  handleKeywordChange = (ev) => {
    let userInput = ev.target.value
    this.setState({keyword: ev.target.value})
    this.handleKeywordSearch(userInput)
    
  }

  handleKeywordSearch = (userInput) => {
    let filtered = []
    let searchBase = this.state.collection
      for (let i = 0; i < searchBase.length; i++) {
        const piece = searchBase[i];
        if (piece.tags.includes(userInput)){
          filtered.push(piece)
      }
    }
    this.setState({
      filteredCol: [...filtered]
    })
  }

  render() {
    return (
      <div>  
        <div>
          <Filterbar 
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
              return <Expandcard card={piece} key={piece.id} />
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default Collection
