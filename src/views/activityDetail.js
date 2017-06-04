import React, { Component } from 'react';

class ActivityDetail extends Component {
  constructor() {
    super();
    this.state = {
      data: {}
    }
  }

  componentWillMount(){
    let userAccessToken = localStorage.getItem('access_token');
    let thisActivityApiUrl = 'https://www.strava.com/api/v3/activities/' + this.props.match.params.id;

    console.log(thisActivityApiUrl);


    fetch(thisActivityApiUrl, {
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

  render() {
    return(
      <div>
        <h2>{this.state.data.name}</h2>
      </div>
    )
  }
}

export default ActivityDetail
