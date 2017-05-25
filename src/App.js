import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Activities from './components/activities';
import Clubs from './components/clubs';
import Sidebar from './components/sidebar';
import Home from './components/home';
import HandleRedirect from './components/handleRedirect';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userIsLoggedIn: false,
    }
  }

  render(){
    return(
      <div className="App o-app">
        <Sidebar />

        <div className='o-content'>
          <Route path="/handle_redirect" component={HandleRedirect}/>
          <Route path="/" exact component={Home}/>
          <Route path="/activities" component={Activities}/>
          <Route path="/clubs" component={Clubs}/>
        </div>
      </div>
    )
  }
}

export default App;
