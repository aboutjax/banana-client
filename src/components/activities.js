import React, { Component } from 'react';
import _ from 'lodash';

class Activities extends Component{
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    }
  }

  componentWillMount(){
    console.log('activities.js');
    let userAccessToken = localStorage.getItem('access_token')

    fetch('https://www.strava.com/api/v3/athlete/activities', {
      method: 'get',
      headers: {
        "content-type": "application/json",
        "authorization": "Bearer " + userAccessToken
      }
    }).then(function(response){
      return response.json();
    }).then( json => {
      // console.log(json);
      this.setState({
        data: json
      })
    })
  }

  render(){
    return (
      <div>
      {this.state.data.map((activity, index) =>
        <li key={index}>
          <span>{activity.name}</span>
        </li>
      )}
      </div>
    )
  }
}

export default Activities;
