import React, {Component} from 'react';
import {ActivityStat} from '../components/activity';
import MomentJS from 'moment'
import Moment from 'react-moment';
import _ from 'lodash';
import LoadingSpinner from '../components/loader'
import ActivityChart from '../components/chart'
import FavouriteButton from '../components/favouriteButton'
import PublishButton from '../components/publishButton'
import MapboxMap from '../components/mapbox'
import {getCookie} from '../components/cookieHelper'
import {getUserStatus} from '../components/firebase'
import domtoimage from 'dom-to-image';
import fileSaver from 'file-saver';
import {IconDownload} from '../components/icons/icons'
import ActivityFoodCard from '../components/foodCard'

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

let foodBurnedBanana;
let foodBurnedApples;
let foodBurnedBeers;
let foodBurnedCookies;
let foodBurnedCheeseburgers;

let publicAccessToken = '011c89ee01402ab591de0240d59ee84455fd4d42'

class ActivityDetailFullscreen extends Component {
  constructor(props) {
    super(props);
    getUserStatus().then( uid => {
      this.setState({
        userUid: uid
      })
    })
    this.state = {
      data: [],
      gear: [],
      athlete: {},
      map: {},
      chartData: {},
      loading: true,
      isFavourite: false,
    }
  }

  componentDidMount() {
    let userAccessToken = getCookie('access_token') || publicAccessToken
    let thisActivityApiUrl = 'https://www.strava.com/api/v3/activities/' + this.props.match.params.id;

    let thisActivityStreamApiUrl = thisActivityApiUrl + '/streams/altitude,heartrate,latlng,cadence,velocity_smooth?resolution=medium'

    this.setState({loading: true})

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
        map: json.map
      })

    }).catch(error => {console.log(error);})

    if(userAccessToken){
      fetch(thisActivityStreamApiUrl, {
        method: 'get',
        headers: {
          "content-type": "application/json",
          "authorization": "Bearer " + userAccessToken
        }
      }).then(function(response) {
        return response.json();
      }).then(json => {
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

        this.setState({loading: false})
      }).catch(function(error){
        console.log('error fetching stream');
      })
    } else {
      // do nothing
    }

  }

  downloadSpeedChart = () => {

    let copyNode = document.getElementById("activityCard--speed")

    domtoimage.toBlob(copyNode)
    .then(function (blob) {
        fileSaver.saveAs(blob, 'speed_chart.png');
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
  }

  downloadHeartrateChart = () => {

    let copyNode = document.getElementById("activityCard--heartrate")

    domtoimage.toBlob(copyNode)
    .then(function (blob) {
        fileSaver.saveAs(blob, 'heartrate_chart.png');
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
  }

  downloadCadenceChart = () => {

    let copyNode = document.getElementById("activityCard--cadence")

    domtoimage.toBlob(copyNode)
    .then(function (blob) {
        fileSaver.saveAs(blob, 'cadence_chart.png');
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
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

    // Food Burned
    foodBurnedBanana = _.round(activityTotalCalories / 90, 1)
    foodBurnedApples = _.round(activityTotalCalories / 52, 1)
    foodBurnedBeers = _.round(activityTotalCalories / 208, 1)
    foodBurnedCookies = _.round(activityTotalCalories / 50, 1)
    foodBurnedCheeseburgers = _.round(activityTotalCalories / 303, 1)

    if (this.state.loading) {
      return (
        <div className="o-flex o-flex-align--center o-flex-justify--center">
          <LoadingSpinner/>
        </div>
      )
    } else {
      return (
        <div className="o-activity-detail">
          <div className="c-page-header">
            <h3 className="o-activity-detail-name">{this.state.data.name}</h3>
            <span className='o-activity-detail-time'>
              <Moment format="MMM DD, YYYY">{this.state.data.start_date}</Moment>
               <span> • </span>
              <Moment format="hh:mm a">{this.state.data.start_date}</Moment>
              <span> • </span>
              <a target="_blank" className="c-link" href={"https://strava.com/activities/" + this.state.data.id}>View on Strava</a>
            </span>
            <div className="t-top-spacing--l o-flex">
              <div className="t-right-spacing">
                <FavouriteButton userUid={this.props.userUid} activityId={this.props.match.params.id} data={this.state.data}/>
              </div>
              <div>
                <PublishButton userUid={this.props.userUid} activityId={this.props.match.params.id} data={this.state.data} altitudeStream={this.state.altitudeStream} cadenceStream={this.state.cadenceStream} distanceStream={this.state.distanceStream} heartrateStream={this.state.heartrateStream} latLngStream={this.state.latLngStream}  velocityStream={this.state.velocityStream}/>
              </div>
            </div>
          </div>
          <div className="o-activity-detail-fullscreen__summary">
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
            {this.state.map.summary_polyline &&
              <MapboxMap mapPolyline={this.state.map.polyline || this.state.map.summary_polyline} startLatlng={this.state.data.start_latlng} endLatlng={this.state.data.end_latlng}/>
            }
          </div>

          <div>

            {/* Cadence Summary Card */}
            {
              activityAverageCadence ?
                <div id="activityCard--cadence" className="c-activity-graph c-activity-graph--cadence t-top-spacing--l">
                  <div className="c-activity-graph-container">
                    <div className="o-flex o-flex-align--start">
                      { this.state.cadenceStream && this.state.altitudeStream ?
                        <h3 className="t-bottom-spacing--xl">Cadence
                          <span className="c-activity-graph__header--supplementary "> & Elevation</span>
                        </h3>
                        :
                        <h3 className="t-bottom-spacing--xl">Cadence</h3>
                      }

                    </div>
                    <div className="t-bottom-spacing--xl o-flex o-flex-justify--start">
                      <ActivityStat type="large" label="average" value={activityAverageCadence} unit="rpm"/>
                    </div>
                    { this.state.cadenceStream ?
                    <ActivityChart
                      altitudeStream={this.state.altitudeStream}
                      distanceStream={this.state.distanceStream}
                      cadenceStreamDataStream={this.state.cadenceStream}
                      heartrateDataStream={this.state.heartrateStream}
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

export default ActivityDetailFullscreen
