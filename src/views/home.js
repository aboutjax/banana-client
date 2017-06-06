import React, { Component } from 'react';
import _ from 'lodash';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      totals: [],
      ytdRideTotals: {}
    }
  }

  componentWillMount(){

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
        data: json
      })
    }).then( json => {
      console.log(this.state.data.id);
      let totalsApiUrl = 'https://www.strava.com/api/v3/athletes/' +  this.state.data.id + '/stats';
      fetch(totalsApiUrl, {
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
          totals: json,
          ytdRideTotals: json.ytd_ride_totals
        })
      })
    })

  }



  render(){
    let firstname = this.state.data.firstname
    let ytdRideCount = this.state.ytdRideTotals.count
    let ytdRideDistance = _.round(this.state.ytdRideTotals.distance / 1000 , 1)
    let ytdRideElevationGain = _.round(this.state.ytdRideTotals.elevation_gain, 1)
    let ytdMovingTime = _.round(this.state.ytdRideTotals.moving_time / 60 / 60, 1)
    let heightOfEverest = 8848
    let everestUnit = _.round(ytdRideElevationGain / heightOfEverest, 1)

    return (
      <div>
        <p className="c-year-to-date-stats">This year you rode <strong>{ytdRideCount ? ytdRideCount : 0}</strong> times, clocked <strong>{ytdRideDistance ? ytdRideDistance : 0}</strong> kilometers, spent <strong>{ ytdMovingTime ? ytdMovingTime : 0}</strong> hours on the saddle, climbed <strong>{ytdRideElevationGain ? ytdRideElevationGain : 0}</strong> meters - that's <strong>{everestUnit ? everestUnit : 0}</strong> times of  Mt Everest.</p>
      </div>
    )
  }
}

export default Home;
