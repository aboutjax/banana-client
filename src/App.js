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
import { CSSTransitionGroup } from 'react-transition-group';

let userIsLoggedIn = localStorage.getItem("access_token")

class App extends Component {

  constructor() {
    super();
    this.state = {
      data: {},
      city: {},
      following: {},
      friends: {}
    }
  }

  componentWillMount() {

    let userAccessToken = localStorage.getItem('access_token')

    fetch('https://www.strava.com/api/v3/athlete', {
      method: 'get',
      headers: {
        "content-type": "application/json",
        "authorization": "Bearer " + userAccessToken
      }
    }).then(function(response){
      return response.json();
    }).then( json => {
      console.log(json);
      this.setState({
        data: json,
        city: json.city,
        following: json.follower_count,
        friends: json.follower_count,
      })
    })
  }

  render(){
    if(userIsLoggedIn) {
      return(
        <div className="App o-wrapper o-app">
          <Sidebar data={this.state.data}/>

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
        <div>
          <Route path="/handle_redirect" exact component={HandleRedirect}/>
          <Login />
        </div>
      )

    }

  }
}

export default App;
