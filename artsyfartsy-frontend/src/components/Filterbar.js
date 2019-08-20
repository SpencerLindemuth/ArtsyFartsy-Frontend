import React from 'react';

class Filterbar extends React.Component {

  render() {
    return (
      <div>
        <div>
          <label>Show Highlights</label>
          <input type='checkbox' onChange={this.props.showHighlights} />
        </div>
        <div>
          <label>Filter by Selected Artists</label>
          <select value={this.props.artistNameIs} onChange={this.props.showArtist}>
            <option value="Select an artist">View All</option>
            <option value="Caravaggio (Michelangelo Merisi)">Caravaggio - Michelangelo Merisi</option>
            <option value="Paul Cézanne">Paul Cézanne</option>
            <option value="Edgar Degas">Edgar Degas</option>
            <option value="Henri Fantin-Latour">Henri Fantin-Latour</option>
            <option value="Paul Gauguin">Paul Gauguin</option>
            <option value="Georges Seurat">Georges Seurat</option>
            <option value="Vincent van Gogh">Vincent van Gogh</option>
            <option value="Francisco de Zurbarán">Francisco de Zurbarán</option>
          </select>
        </div>
        <div>
          <label>Filter by Department</label>
          <select value={this.props.departmentIs} onChange={this.props.showDepartment}>
            <option value="Select a department">View All</option>
            <option value="European Paintings">European Paintings</option>
            <option value="The American Wing">The American Wing</option>
            <option value="Greek and Roman Art">Greek & Roman Art</option>
          </select>
        </div>
        <div>
          <label>Filter by Classification</label>
          <select value={this.props.classificationIs} onChange={this.props.showClassification}>
            <option value="Select a classification">View All</option>
            <option value="Paintings">Paintings</option>
          </select>
        </div>
        <div>
          <label>Keyword Search</label>
          <input type='text' onChange={this.props.updateKeyword} value={this.props.currentWord}/>
        </div>
      </div>
    )
  }
}

export default Filterbar


