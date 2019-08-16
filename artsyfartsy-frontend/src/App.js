import React from 'react';
import './App.css';
import Homepage from './components/Homepage'
import Navbar from './components/Navbar'
import Gallery from './components/Gallery'
import Expand from './components/Expand'
import Collection from './components/Collection'
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom'


class App extends React.Component {
  state = {
    imageSrc: '',
    expand: [],
    top: []
  }


  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <Route exact path='/' component={Homepage} />
          <Route exact path="/gallery" component={Gallery} />
          <Route exact path='/explore' component={Collection} />
        </Router>
      </div>
    )
  }
}

export default App;
