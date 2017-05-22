import React, { Component } from 'react';
import './App.css';
import _ from 'lodash';
import { Link, Route } from 'react-router-dom';

const Home = () => {
  return(
    <div>
    <h2>Home</h2>
    </div>
  )
}

const About = () => {
  return(
    <div>
    <h2>About</h2>
    </div>
  )
}

const Topics = () => {
  return(
    <div>
    <h2>Topics</h2>
    <li>One</li>
    <li>Two</li>
    <li>Three</li>
    <li>Four</li>
    </div>
  )
}

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      data: [],
      clubs: [{}]
    }
  }

  componentDidMount(){

    let userAccessToken;

    if(localStorage.getItem('access_token')) {
      // found localstorage access token
      console.log('found localstorage access token');
      userAccessToken = localStorage.getItem('access_token')

    } else {
      // no localstorage access token
      console.log('no localstorage access token');

      // get token from url
      const search = location.search.substring(1)
      const query = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')

      userAccessToken = query.access_token
      localStorage.setItem('access_token', userAccessToken)
    }

    fetch('https://www.strava.com/api/v3/athlete', {
      method: 'get',
      headers: {
        "content-type": "application/json",
        "authorization": "Bearer " + userAccessToken
      }
    }).then(function(response){
      return response.json();
    }).then( json => {
      this.setState({
        data: json,
        clubs: _.sortBy(json.clubs, ['name'])
       })
    })
  }


  render(){
    return(
      <div className="App">
        <div className="App-header">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/topics">Topics</Link></li>
          </ul>
          <h1>Hello, {this.state.data.firstname} {this.state.data.lastname}</h1>
          <h3>Here are a list of clubs you are in:</h3>
          <ul>
            {this.state.clubs.map((club, index) =>
              <li key={index}>
                <span>{club.name}</span>
              </li>
            )}
          </ul>

          <Route exact path="/" component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/topics" component={Topics}/>
        </div>
      </div>
    )
  }
}

export default App;
