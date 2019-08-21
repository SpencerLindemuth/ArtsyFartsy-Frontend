import React from 'react'

class Filterbar extends React.Component {

  render() {
    return (
      <div className='filterform'>
        <div>
          <label>Show Highlights</label>
          <br />
          <input className="filterforminput" type='checkbox' checked={this.props.highlightValue} onChange={this.props.showHighlights} />
        </div>
        <div>
          <label>Filter by Selected Artists</label>
          <br />
          <select className="filterforminput"  value={this.props.artistNameIs} onChange={this.props.showArtist} >
            <option value="Select an artist">View All</option>
            <option value="Eugène Boudin">Eugène Boudin</option>
            <option value="Caravaggio (Michelangelo Merisi)">Caravaggio - Michelangelo Merisi</option>
            <option value="Paul Cézanne">Paul Cézanne</option>
            <option value="Edgar Degas">Edgar Degas</option>
            <option value="Paul Gauguin">Paul Gauguin</option>
            <option value="Giovanni di Paolo (Giovanni di Paolo di Grazia)">Giovanni di Paolo - Giovanni di Paolo di Grazia</option>
            <option value="Georges Seurat">Georges Seurat</option>
            <option value="Henri de Toulouse-Lautrec">Henri de Toulouse-Lautrec</option>
            <option value="Vincent van Gogh">Vincent van Gogh</option>
            <option value="Francisco de Zurbarán">Francisco de Zurbarán</option>
          </select>
        </div>
        <div>
          <label>Filter by Department</label>
          <br />
          <select className="filterforminput"  value={this.props.departmentIs} onChange={this.props.showDepartment} >
            <option value="Select a department">View All</option>
            <option value="European Paintings">European Paintings</option>
            <option value="Greek and Roman Art">Greek & Roman Art</option>
            <option value="Robert Lehman Collection">The Robert Lehman Collection</option>
          </select>
        </div>
        <div>
          <label>Filter by Artist Nationality</label>
          <br />
          <select className="filterforminput"  value={this.props.artistNatIs} onChange={this.props.showArtistNat}>
            <option value="Select a nationality">View All</option>
            <option value="British">British</option>            
            <option value="Dutch">Dutch</option>            
            <option value="French">French</option>
            <option value="German">German</option>            
            <option value="Italian">Italian</option>
            <option value="Russian">Russian</option>
            <option value="">Nationality not given</option>
          </select>
        </div>
        <div>
          <label>Keyword Search</label>
          <br/>
          <input className="filterforminput" id="keywordsearch" type='text' onChange={this.props.updateKeyword} value={this.props.currentWord}/>
        </div>
      </div>
    )
  }
}

export default Filterbar
