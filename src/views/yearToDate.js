import React, { Component } from 'react';
import _ from 'lodash';
import LoadingSpinner from '../components/loader'
import {getCookie} from '../components/cookieHelper'
import {
  Route
} from 'react-router-dom';

class YearToDate extends Component {

  render(){
    return (
      <Route path={this.props.match.url + '/ride'} component={YearToDateRidingStats} />
    )
  }
}

class YearToDateRidingStats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      totals: [],
      ytdRideTotals: {},
      ytdRunTotals: {},
      ytdSwimTotals: {}
    }
  }

  componentWillMount(){

    let userAccessToken = getCookie('access_token');

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
        data: json
      })
    }).then( json => {

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

        this.setState({
          totals: json,
          ytdRideTotals: json.ytd_ride_totals,
          ytdRunTotals: json.ytd_run_totals,
          ytdSwimTotals: json.ytd_swim_totals
        })
      })
    })

  }

  render(){

    let ytdRideCount = this.state.ytdRideTotals.count
    let ytdRideDistance = _.round(this.state.ytdRideTotals.distance / 1000 , 1)
    let ytdRideElevationGain = _.round(this.state.ytdRideTotals.elevation_gain, 1)
    let ytdRideMovingTime = _.round(this.state.ytdRideTotals.moving_time / 60 / 60, 1)

    // let ytdRunCount = this.state.ytdRunTotals.count
    // let ytdRunDistance = _.round(this.state.ytdRunTotals.distance / 1000 , 1)
    // let ytdRunElevationGain = _.round(this.state.ytdRunTotals.elevation_gain, 1)
    // let ytdRunMovingTime = _.round(this.state.ytdRunTotals.moving_time / 60 / 60, 1)

    let mountEverestUnit = _.round(this.state.ytdRideTotals.elevation_gain / 8848, 2)

    return(
      <div>
        <div className="c-page-header">
          <h1>My Year To Date</h1>
        </div>
        <p className="c-year-to-date-stats">
          This year you rode <YearToDateStat value={ytdRideCount}/> times, clocked <YearToDateStat value={ytdRideDistance}/> kilometers, spent <YearToDateStat value={ytdRideMovingTime}/> hours in the saddle, climbed <YearToDateStat value={ytdRideElevationGain}/> meters - That's climbing Mount Everest <YearToDateStat value={mountEverestUnit}/> times.
        </p>
      </div>
    )
  }
}

function YearToDateStat(props){
  return(
    <strong>{props.value ? props.value : <LoadingSpinner />}</strong>
  )
}

export default YearToDate;
