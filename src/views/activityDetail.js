import React, { Component } from 'react';
import { ActivityMap } from '../components/activity';

class ActivityDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      gear: [],
      athlete: {},
      map: {}
    }
  }

  componentWillMount(){
    console.log('activity detail');
    let userAccessToken = localStorage.getItem('access_token');
    let thisActivityApiUrl = 'https://www.strava.com/api/v3/activities/' + this.props.match.params.id;

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
        data: json,
        gear: json.gear,
        athlete: json.athlete,
        map: json.map
      })
    })
  }

  componentDidMount() {
    console.log(this.state.data.location_state);
  }

  render() {
    return(
      <div>
        <h1>{this.state.data.name}</h1>
        <ActivityMap mapPolyline={this.state.map.summary_polyline} mapDimension="1200x1200"/>
      </div>
    )
  }
}

export default ActivityDetail
