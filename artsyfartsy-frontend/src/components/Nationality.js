import React from 'react'

class Nationality extends React.Component {

  render() {
    return (
      <option
        value={this.props.nation}>
      </option>
    );
  }

}

export default Nationality
