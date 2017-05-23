import React, { Component } from 'react';
import _ from 'lodash';

class StoreAccessToken extends Component {
  constructor(props){
    super(props);

    this.state = {
      data: [],
      clubs: [{}],
      bikes: [{}],
      followers: [{}],
      friends: [{}],
      city: 'somewhere',
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
      console.log(json);
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

  render() {
    return(
      <div>
        <h2>Hello {this.state.data.firstname} {this.state.data.lastname}, You are from {this.state.data.city}. You have {this.state.data.follower_count} followers. You are following {this.state.data.friend_count} people. You have {this.state.bikes.length} bikes.</h2>
      </div>
    )
  }
}

export default StoreAccessToken;
