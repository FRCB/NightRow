import React, { Component } from 'react';
import route from './route';
import { withRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import './App.css';

class App extends Component {


  render() {

    return (
      <div className="App">
        <Header />
        {route}
      </div>

    );
  }
}

export default withRouter(App);
