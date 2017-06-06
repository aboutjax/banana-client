import React, { Component } from 'react';
import './index.css';
import { Route } from 'react-router-dom';
import Activities from './views/activities';
import Clubs from './views/clubs';
import Sidebar from './components/sidebar';
import Home from './views/home';
import HandleRedirect from './views/handleRedirect';
import Login from './views/login';
import Streams from './views/stream';
import ActivityDetail from './views/activityDetail';

let userIsLoggedIn = localStorage.getItem("access_token")

class App extends Component {

  render(){
    if(userIsLoggedIn) {
      return(
        <div className="App o-wrapper o-app">
          <Sidebar />

          <div className='o-content'>

              <Route path="/handle_redirect" exact component={HandleRedirect}/>
              <Route path="/" exact component={Home} />
              <Route path="/activities" exact component={Activities}/>
              <Route path="/clubs" component={Clubs}/>
              <Route path="/streams" component={Streams}/>
              <Route path="/streams" component={Streams}/>
              <Route path="/activities/:id" component={ActivityDetail}/>

          </div>
        </div>
      )
    } else {
      return(
        <div className="c-login">
          <Route path="/handle_redirect" exact component={HandleRedirect}/>
          <Login />
        </div>
      )

    }

  }
}

export default App;
