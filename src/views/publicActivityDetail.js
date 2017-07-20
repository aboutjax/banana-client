import React, {Component} from 'react';
import {ActivityStat} from '../components/activity';
import MomentJS from 'moment'
import Moment from 'react-moment';
import _ from 'lodash';
import LoadingSpinner from '../components/loader'
import ActivityChart from '../components/chart'
import MapboxMap from '../components/mapbox'
import fire from '../components/firebase'

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
let publicAccessToken = '011c89ee01402ab591de0240d59ee84455fd4d42'

class PublicActivityDetail extends Component {
  constructor(props){
    super(props);

    this.state = {
      data: [],
      loading: true,
      athleteId: props.match.params.athlete,
      activityId: props.match.params.activity,
      activityFound: false,
      athleteData: {}
    }
  }

  componentDidMount() {

    let athleteUID = this.props.match.params.athleteUID
    let activityId = this.props.match.params.activity
    let publicActivitiesRef = fire.database().ref('users/' + athleteUID + '/publicActivities');

    publicActivitiesRef.once('value', snap => {
      snap.forEach(child => {
        let publicActivityId = child.child('activityId').val()
        let publicActivityData = child.child('activityData').val()
        let publicActivityAltitudeStream = child.child('altitudeStream').val() || null
        let publicActivityCadenceStream = child.child('cadenceStream').val() || null
        let publicActivityDistanceStream = child.child('distanceStream').val() || null
        let publicActivityHeartrateStream = child.child('heartrateStream').val() || null
        let publicActivityLatLngStream = child.child('latLngStream').val() || null
        let publicActivityVelocityStream = child.child('velocityStream').val() || null

        if(publicActivityId === activityId) {
          this.fetchAthleteData(publicActivityData.athlete.id)
          this.setState({
            data: publicActivityData,
            altitudeStream: publicActivityAltitudeStream,
            cadenceStream: publicActivityCadenceStream,
            distanceStream: publicActivityDistanceStream,
            heartrateStream: publicActivityHeartrateStream,
            latLngStream: publicActivityLatLngStream,
            velocityStream: publicActivityVelocityStream,
            loading: false,
            activityFound: true
           })
        } else {
          this.setState({
            activityFound: false,
            loading: false
          })
        }
      })
    })
  }

  fetchAthleteData = (id) => {
    let athleteApiUrl = 'https://www.strava.com/api/v3/athletes/' + id

    fetch(athleteApiUrl, {
      method: 'get',
      headers: {
        "content-type": "application/json",
        "authorization": "Bearer " + publicAccessToken
      }
    }).then(res => {
      return(res.json())
    }).then(json => {
      this.setState({
        athleteData: json
      })
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
    activityMaxSpeed = _.round((this.state.data.max_speed * 60 * 60) / 1000, 1)

    // Cadence
    activityAverageCadence = _.round(this.state.data.average_cadence, 1)

    // Heart Rate
    activityAverageHeartRate = this.state.data.average_heartrate
    activityMaxHeartRate = this.state.data.max_heartrate

    if (this.state.loading) {
      return (
        <div className="o-flex o-flex-align--center o-flex-justify--center">
          <LoadingSpinner/>
        </div>
      )
    } else if(!this.state.loading && this.state.activityFound) {
      return (
        <div className="o-activity-detail">
          <div className="c-page-header">
            <div className="o-flex">
              <AthleteProfile athleteData={this.state.athleteData} />
              <div>
                <h3 className="o-activity-detail-name">{this.state.data.name}</h3>
                <span className='o-activity-detail-time'>
                  <Moment format="MMM DD, YYYY">{this.state.data.start_date}</Moment>
                  <span> • </span>
                  <Moment format="hh:mm a">{this.state.data.start_date}</Moment>
                  <span> • </span>
                  <a target="_blank" className="c-link" href={"https://strava.com/activities/" + this.state.data.id}>View on Strava</a>
                </span>
              </div>
            </div>
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
            {this.state.data.map.summary_polyline &&
              <MapboxMap mapPolyline={this.state.data.map.polyline || this.state.data.map.summary_polyline} startLatlng={this.state.data.start_latlng} endLatlng={this.state.data.end_latlng}/>
            }
          </div>

          <div>
            {/* Speed Summary Card */}
            {
              activityAverageSpeed ?
                <div className="c-activity-graph c-activity-graph--velocity t-top-spacing--l">
                  <div className="c-activity-graph-container">
                    { this.state.velocityStream && this.state.altitudeStream ?
                      <h3 className="t-bottom-spacing--xl">Speed
                        <span className="c-activity-graph__header--supplementary "> & Elevation</span>
                      </h3>
                      :
                      <h3 className="t-bottom-spacing--xl">Speed</h3>
                    }
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
                    { this.state.heartrateStream && this.state.altitudeStream ?
                      <h3 className="t-bottom-spacing--xl">Heart Rate
                        <span className="c-activity-graph__header--supplementary "> & Elevation</span>
                      </h3>
                      :
                      <h3 className="t-bottom-spacing--xl">Heart Rate</h3>
                    }
                    <div className="t-bottom-spacing--xl o-flex o-flex-justify--start">
                      <ActivityStat type="large" label="average" value={activityAverageHeartRate} unit="bpm"/>
                      <ActivityStat type="large" label="max" value={activityMaxHeartRate} unit="bpm"/>
                    </div>
                    { this.state.heartrateStream ?
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
                    { this.state.cadenceStream && this.state.altitudeStream ?
                      <h3 className="t-bottom-spacing--xl">Cadence
                        <span className="c-activity-graph__header--supplementary "> & Elevation</span>
                      </h3>
                      :
                      <h3 className="t-bottom-spacing--xl">Cadence</h3>
                    }
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
    } else {
      return(
        <h1>Activity not found</h1>
      )
    }
  }
}

function AthleteProfile(props) {
  return(
    <div className="c-athlete-profile">
      <img src={props.athleteData.profile} className="c-athlete-profile__image"/>
    </div>
  )
}

export default PublicActivityDetail
