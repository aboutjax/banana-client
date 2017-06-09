import React, { Component } from 'react';
import _ from 'lodash';

class Home extends Component {
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


    return (
      <div>
        <YearToDateStats count={ytdRideCount} distance={ytdRideDistance} movingTime={ytdRideMovingTime} elevationGain={ytdRideElevationGain} mountEverestUnit={mountEverestUnit} />
      </div>
    )
  }
}

class YearToDateStats extends Component {
  render(){

    return(
      <p className="c-year-to-date-stats">
        This year you rode <YearToDateStat value={this.props.count}/> times, clocked <YearToDateStat value={this.props.distance}/> kilometers, spent <YearToDateStat value={this.props.movingTime}/> hours in the saddle, climbed <YearToDateStat value={this.props.elevationGain}/> meters - That's climbing Mount Everest <YearToDateStat value={this.props.mountEverestUnit}/> times.
      </p>
    )
  }
}

function YearToDateStat(props){
  return(
    <strong>{props.value ? props.value : <LoadingSpinner />}</strong>
  )
}

const LoadingSpinner = () => (
  <div className='c-loading_spinner-wrap'>
    <svg className='c-loading_spinner' width='60' height='20' viewBox='0 0 60 20' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='7' cy='15' r='4' />
      <circle cx='30' cy='15' r='4' />
      <circle cx='53' cy='15' r='4' />
    </svg>
  </div>
)

export default Home;
