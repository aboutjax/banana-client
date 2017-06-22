import React, { Component } from 'react';
import './index.css';
import { Route } from 'react-router-dom';

// Views
import Activities from './views/activities';
import Nav from './components/nav';
import HandleRedirect from './views/handleRedirect';
import ActivityDetail from './views/activityDetail';

let userIsLoggedIn = localStorage.getItem("access_token")

class App extends Component {

  render(){
    if(userIsLoggedIn) {
      return(
        <div className="App o-wrapper o-app">
          <Nav type="private"/>

          <div className='o-content'>

              <Route path="/handle_redirect" exact component={HandleRedirect}/>
              <Route path="/" exact component={Activities} />
              <Route path="/activities/page/:page" component={Activities}/>
              <Route path="/activities/:id" exact component={ActivityDetail}/>

          </div>
        </div>
      )
    } else {
      return(
        <div className="App o-wrapper o-app">
          <Nav type="public"/>

          <div className='o-content'>
            <Route path="/activities/:id" exact component={ActivityDetail}/>
            <Route path="/handle_redirect" exact component={HandleRedirect}/>
          </div>
        </div>
      )

    }

  }
}

export default App;
