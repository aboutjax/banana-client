import React, { Component } from 'react';
import './App.css';
import { Route, Redirect, Link } from 'react-router-dom';
import StoreAccessToken from './components/storeAccessToken';
import Activities from './components/activities';
import Clubs from './components/clubs';

class Home extends Component {
  render(){
    return(
      <div>
        <StoreAccessToken />
        <Redirect to='/' />
      </div>
    )
  }
}

class App extends Component {

  render(){
    return(
      <div className="App">
        <ul className='c-top-nav'>
          <li className='c-top-nav__link'><Link to="/">Home</Link></li>
          <li className='c-top-nav__link'><Link to="/activities">Activities</Link></li>
          <li className='c-top-nav__link'><Link to="/clubs">Clubs</Link></li>
        </ul>

        <div className='o-section'>
          <Route path="/" exact component={Home}/>
          <Route path="/?access_token" component={StoreAccessToken}/>
          <Route path="/activities" component={Activities}/>
          <Route path="/clubs" component={Clubs}/>
        </div>
      </div>
    )
  }
}

export default App;
