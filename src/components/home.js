import React, { Component } from 'react';
import _ from 'lodash';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    }
  }

  componentWillMount(){

    console.log('home.js');

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
      this.setState({
        data: json,
        clubs: _.sortBy(json.clubs, ['name']),
        bikes: _.sortBy(json.bikes, ['name']),
        city: json.city,
        following: json.follower_count,
        friends: json.follower_count,
      })
    })
  }

  render(){
    return (
      <div>
        <h1>Hello {this.state.data.firstname} {this.state.data.lastname}</h1>
      </div>
    )
  }
}

export default Home;
