import React, { Component } from 'react';
import _ from 'lodash';

class Stream extends Component{
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    }
  }

  componentWillMount(){
    let userAccessToken = localStorage.getItem('access_token')

    fetch('https://www.strava.com/api/v3/activities/1011982769', {
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
        data: json
      })
    })
  }

  render(){
    return (
      <div>
        {this.state.data.length}
      </div>
    )
  }
}


export default Stream;
