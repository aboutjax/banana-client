import React, { Component } from 'react';
import _ from 'lodash';

class Clubs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    }
  }

  componentWillMount(){
    let userAccessToken = localStorage.getItem('access_token')

    fetch('https://www.strava.com/api/v3/athlete/clubs', {
      method: 'get',
      headers: {
        "content-type": "application/json",
        "authorization": "Bearer " + userAccessToken
      }
    }).then(function(response){
      return response.json();
    }).then( json => {
      this.setState({
        data: json
      })
    })
  }

  render(){
    return (
      <div>
        <h1>Clubs</h1>
      {this.state.data.map((club, index) =>
        <li key={index}>
          <span>{club.name}</span>
        </li>
      )}
      </div>
    )
  }
}

export default Clubs;
