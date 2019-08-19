import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Gallery from './components/Gallery'
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom'


class App extends React.Component {
  state = {
    imageSrc: '',
    explore: []
  }


  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <Route exact path="/gallery" component={Gallery} />
        </Router>
      </div>
    )
  }
  componentDidMount() {

  }
}

export default App;
