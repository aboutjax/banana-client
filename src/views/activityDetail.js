import React, {Component} from 'react';
import {ActivityStat} from '../components/activity';
import MomentJS from 'moment'
import Moment from 'react-moment';
import _ from 'lodash';
import LoadingSpinner from '../components/loader'
import Chart from '../components/chart'
import MapboxMap from '../components/mapbox'

let activityDistance;
let activityTotalElevationGain;
let activityTotalCalories;
let activityMovingTime;
let activityMovingTimeHour;
let activityMovingTimeMinutes;
let activityMovingTimeSeconds;
let activityMovingTimeHHMMSS;

let activityAverageSpeed;
let activityAverageCadence;
let activityAverageHeartRate;
let activityAverageWatts;
let publicAccessToken = '454c1086525feaed3b71c507b939a99920ff792f'

class ActivityDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      gear: [],
      athlete: {},
      map: {},
      loading: false,
      chartData: {}
    }
  }

  componentWillMount() {
    this.setState({loading: true})
  }

  componentDidMount() {
    let userAccessToken = localStorage.getItem('access_token') || publicAccessToken
    let thisActivityApiUrl = 'https://www.strava.com/api/v3/activities/' + this.props.match.params.id;

    let thisActivityStreamApiUrl = thisActivityApiUrl + '/streams/altitude,heartrate,latlng,cadence?resolution=medium'

    fetch(thisActivityApiUrl, {
      method: 'get',
      headers: {
        "content-type": "application/json",
        "authorization": "Bearer " + userAccessToken
      }
    }).then(function(response) {
      return response.json();
    }).then(json => {
      this.setState({data: json, gear: json.gear, athlete: json.athlete, map: json.map, loading: false})

    })

    fetch(thisActivityStreamApiUrl, {
      method: 'get',
      headers: {
        "content-type": "application/json",
        "authorization": "Bearer " + userAccessToken
      }
    }).then(function(response) {
      return response.json();
    }).then(json => {
      console.log('fetched stream apis');
      function findDistance(array){
        return array.type === 'distance'
      }
      function findHeartrate(array){
        return array.type === 'heartrate'
      }
      function findAltitude(array){
        return array.type === 'altitude'
      }
      function findLatlng(array){
        return array.type === 'latlng'
      }
      function findCadence(array){
        return array.type === 'cadence'
      }

      if(json.find(findDistance)){
        this.setState(
          {
            distanceStream: json.find(findDistance).data
          }
        )
      }

      if(json.find(findAltitude)){
        this.setState(
          {
            altitudeStream: json.find(findAltitude).data
          }
        )
      }

      if(json.find(findHeartrate)){
        this.setState(
          {
            heartrateStream: json.find(findHeartrate).data
          }
        )
      }

      if(json.find(findLatlng)){
        this.setState(
          {
            latLngStream: json.find(findLatlng).data
          }
        )
      }

      if(json.find(findCadence)){
        this.setState(
          {
            cadenceStream: json.find(findCadence).data
          }
        )
      }
    })
  }

  render() {

    // Distance
    activityDistance = _.round(this.state.data.distance / 1000, 1)
    // Climb
    activityTotalElevationGain = _.round(this.state.data.total_elevation_gain, 0)
    // Calories
    activityTotalCalories = this.state.data.calories

    // Duration
    activityMovingTime = MomentJS.duration(this.state.data.moving_time, 'seconds')
    activityMovingTimeHour = activityMovingTime._data.hours
    activityMovingTimeMinutes = activityMovingTime._data.minutes
    activityMovingTimeSeconds = activityMovingTime._data.seconds
    activityMovingTimeHHMMSS = activityMovingTimeHour + ':' + activityMovingTimeMinutes + ':' + activityMovingTimeSeconds

    // Average Speed
    activityAverageSpeed = _.round((this.state.data.average_speed * 60 * 60) / 1000, 1)
    activityAverageCadence = _.round(this.state.data.average_cadence, 1)
    activityAverageHeartRate = this.state.data.average_heartrate
    activityAverageWatts = this.state.data.average_watts

    if (this.state.loading) {
      return (
        <div className="o-flex o-flex-align--center o-flex-justify--center">
          <LoadingSpinner/>
        </div>
      )
    } else {
      return (
        <div className="o-activity-detail">
          <div className="o-activity-detail-header">
            <h3 className="o-activity-detail-name">{this.state.data.name}</h3>
            <span className='c-activity__time'>
              <Moment format="MMM DD, YYYY">{this.state.data.start_date}</Moment>
               <span> • </span>
              <Moment format="hh:mm a">{this.state.data.start_date}</Moment>
            </span>
          </div>
          <div className="c-activity-summary o-flex o-flex-justify--start">
            <ActivityStat type="large" label="distance" value={activityDistance} unit="km"/>
            <ActivityStat type="large" label="climb" value={activityTotalElevationGain} unit="m"/>
            <ActivityStat type="large" label="duration" value={activityMovingTimeHHMMSS}/>
            <ActivityStat type="large" label="calories" value={activityTotalCalories}/>
          </div>
          <MapboxMap mapPolyline={this.state.map.polyline} startLatlng={this.state.data.start_latlng} endLatlng={this.state.data.end_latlng}/>
          <div className="c-activity-summary c-activity-summary--average">
            <h3 className="c-activity-summary-header">activity average</h3>
            <div className="o-flex o-flex-justify--start">
              {activityAverageSpeed
                ? <ActivityStat label="speed" value={activityAverageSpeed} unit="km"/>
                : null}
              {activityAverageCadence
                ? <ActivityStat label="cadence" value={activityAverageCadence} unit="rpm"/>
                : null}
              {activityAverageHeartRate
                ? <ActivityStat label="heartrate" value={activityAverageHeartRate} unit="bpm"/>
                : null}
              {activityAverageWatts
                ? <ActivityStat label="power" value={activityAverageWatts} unit="w"/>
                : null}
            </div>
          </div>

          <div className="c-activity-chart-container t-top-spacing--l">

            <Chart className="c-activity-chart-container" altitudeStream={this.state.altitudeStream} heartrateStream={this.state.heartrateStream} distanceStream={this.state.distanceStream}/>
          </div>
        </div>
      )
    }

  }
}

export default ActivityDetail
