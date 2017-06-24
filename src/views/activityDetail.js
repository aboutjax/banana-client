import React, {Component} from 'react';
import {ActivityStat} from '../components/activity';
import MomentJS from 'moment'
import Moment from 'react-moment';
import _ from 'lodash';
import LoadingSpinner from '../components/loader'
import ActivityChart from '../components/chart'
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
let activityMaxSpeed;
let activityAverageCadence;
let activityAverageHeartRate;
let activityMaxHeartRate;
let activityAverageWatts;
let publicAccessToken = '454c1086525feaed3b71c507b939a99920ff792f'

let userIsLoggedIn = localStorage.getItem("access_token")

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

    let thisActivityStreamApiUrl = thisActivityApiUrl + '/streams/altitude,heartrate,latlng,cadence,velocity_smooth?resolution=medium'

    fetch(thisActivityApiUrl, {
      method: 'get',
      headers: {
        "content-type": "application/json",
        "authorization": "Bearer " + userAccessToken
      }
    }).then(function(response) {
      return response.json();
    }).then(json => {
      console.log(json);
      this.setState({
        data: json,
        gear: json.gear,
        athlete: json.athlete,
        map: json.map,
        loading: false
      })

    })

    if(userIsLoggedIn){
      fetch(thisActivityStreamApiUrl, {
        method: 'get',
        headers: {
          "content-type": "application/json",
          "authorization": "Bearer " + userAccessToken
        }
      }).then(function(response) {
        return response.json();
      }).then(json => {
        console.log(json);
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
        function findVelocity(array){
          return array.type === 'velocity_smooth'
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

        if(json.find(findVelocity)){

          function toKPH(m) {
            let toKM = m / 1000
            let toKPH = toKM * 60 * 60

            return _.round(toKPH, 2);
          }

          let velocityStreamArray = json.find(findVelocity).data
          let velocityKPH = _.map(velocityStreamArray, toKPH)

          this.setState(
            {
              velocityStream: velocityKPH
            }
          )
        }
      }).catch(function(error){
        console.log('error fetching stream');
      })
    } else {
      // do nothing
    }
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
    activityMaxSpeed = _.round((this.state.data.max_speed * 60 * 60) / 1000, 1)

    // Cadence
    activityAverageCadence = _.round(this.state.data.average_cadence, 1)

    // Heart Rate
    activityAverageHeartRate = this.state.data.average_heartrate
    activityMaxHeartRate = this.state.data.max_heartrate

    // Power
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
          <div className="o-activity-detail__summary">
            <div className="c-activity-summary o-flex o-flex-justify--start">
              {activityDistance ?
                <ActivityStat type="large" label="distance" value={activityDistance} unit="km"/>
                 : null}
              {activityTotalElevationGain ?
                <ActivityStat type="large" label="climb" value={activityTotalElevationGain} unit="m"/>
                 : null}
              {activityMovingTimeHHMMSS ?
                <ActivityStat type="large" label="duration" value={activityMovingTimeHHMMSS}/>
                 : null}
              {activityTotalCalories ?
                <ActivityStat type="large" label="calories" value={activityTotalCalories}/>
                 : null}
            </div>
            <MapboxMap mapPolyline={this.state.map.polyline || this.state.map.summary_polyline} startLatlng={this.state.data.start_latlng} endLatlng={this.state.data.end_latlng}/>
            {/* <div className="c-activity-summary c-activity-summary--average">
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
            </div> */}
          </div>

          <div>
            {/* Speed Summary Card */}
            {
              activityAverageSpeed ?
                <div className="c-activity-graph c-activity-graph--velocity t-top-spacing--l">
                  <div className="c-activity-graph-container">
                    <h3 className="t-bottom-spacing--xl">Speed
                      { this.state.velocityStream ?
                      <span className="c-activity-graph__header--supplementary "> & Elevation</span>
                      : null }
                    </h3>
                    <div className="t-bottom-spacing--xl o-flex o-flex-justify--start">
                      <ActivityStat type="large" label="average" value={activityAverageSpeed} unit="km"/>
                      <ActivityStat type="large" label="max" value={activityMaxSpeed} unit="km"/>
                    </div>
                    {this.state.velocityStream
                      ?
                      <ActivityChart
                        altitudeStream={this.state.altitudeStream}
                        distanceStream={this.state.distanceStream}
                        mainDataStream={this.state.velocityStream}
                        dataType="velocity"
                        dataTypeLegendLabel="Speed"
                        dataTypeUnit="KM/H"
                      />
                      : null
                    }
                  </div>
                </div>
              : null
            }
            {/* Heart Rate Summary Card */}
            {
              activityAverageHeartRate ?
                <div className="c-activity-graph c-activity-graph--heartrate t-top-spacing--l">
                  <div className="c-activity-graph-container">
                    <h3 className="t-bottom-spacing--xl">Heart Rate
                      { this.state.velocityStream ?
                        <span className="c-activity-graph__header--supplementary "> & Elevation</span>
                      : null }
                    </h3>
                    <div className="t-bottom-spacing--xl o-flex o-flex-justify--start">
                      <ActivityStat type="large" label="average" value={activityAverageHeartRate} unit="bpm"/>
                      <ActivityStat type="large" label="max" value={activityMaxHeartRate} unit="bpm"/>
                    </div>
                    { this.state.velocityStream ?
                    <ActivityChart
                      altitudeStream={this.state.altitudeStream}
                      distanceStream={this.state.distanceStream}
                      mainDataStream={this.state.heartrateStream}
                      dataType="heartrate"
                      dataTypeLegendLabel="Heart Rate"
                      dataTypeUnit="BPM"
                    />
                      : null
                    }
                  </div>
                </div>
              : null
            }
            {/* Cadence Summary Card */}
            {
              activityAverageCadence ?
                <div className="c-activity-graph c-activity-graph--cadence t-top-spacing--l">
                  <div className="c-activity-graph-container">
                    <h3 className="t-bottom-spacing--xl">Cadence
                      { this.state.cadenceStream ?
                        <span className="c-activity-graph__header--supplementary "> & Elevation</span>
                      : null }
                    </h3>
                    <div className="t-bottom-spacing--xl o-flex o-flex-justify--start">
                      <ActivityStat type="large" label="average" value={activityAverageCadence} unit="rpm"/>
                    </div>
                    { this.state.cadenceStream ?
                    <ActivityChart
                      altitudeStream={this.state.altitudeStream}
                      distanceStream={this.state.distanceStream}
                      mainDataStream={this.state.cadenceStream}
                      dataType="cadence"
                      dataTypeLegendLabel="Cadence"
                      dataTypeUnit="RPM"
                    />
                      : null
                    }
                  </div>
                </div>
              : null
            }

          </div>
        </div>
      )
    }
  }
}

export default ActivityDetail
