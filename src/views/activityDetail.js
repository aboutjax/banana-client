import React, { Component } from 'react';
import { ActivityStat } from '../components/activity';
import MomentJS from 'moment'
import Moment from 'react-moment';
import _ from 'lodash';
import LoadingSpinner from '../components/loader'
import mapboxgl from 'mapbox-gl';
import polyline from '@mapbox/polyline'

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


class MapboxMap extends Component {

  componentDidMount(){

    let decodedPolyline = polyline.toGeoJSON(this.props.mapPolyline)
    let decodedPolylineArray = decodedPolyline.coordinates
    let startLatlng = this.props.startLatlng
    let endLatlng = this.props.endLatlng

    mapboxgl.accessToken = 'pk.eyJ1IjoicDBwbWFrZXIiLCJhIjoiY2lzOXliOGlrMDA2ODJ5bzJ4YjNnb29qdSJ9.hf19Sca7oYCcR8kRlx07Rw';

    const map = new mapboxgl.Map({
      container: this.container,
      style: 'mapbox://styles/mapbox/dark-v9',
      center: [startLatlng[1], startLatlng[0]],
      zoom: 8
    })

    map.on('load', function () {

        map.addLayer({
          "id": "route",
          "type": "line",
          "source": {
              "type": "geojson",
              "data": {
                  "type": "Feature",
                  "properties": {},
                  "geometry": {
                      "type": "LineString",
                      "coordinates": decodedPolylineArray
                  }
              }
          },
          "layout": {
              "line-join": "round",
              "line-cap": "round"
          },
          "paint": {
              "line-color": "#0a67f2",
              "line-width": 2
          }
        });

        map.addLayer({
          "id": "start",
          "type": "circle",
          "source": {
              "type": "geojson",
              "data": {
                  "type": "Feature",
                  "properties": {
                    "description": "Activity Start"
                  },
                  "geometry": {
                      "type": "Point",
                      "coordinates": [startLatlng[1], startLatlng[0]]
                  }
              }
          },
          "paint": {
              "circle-color": "#41c15a",
              "circle-radius": 7
          }
        });

        map.addLayer({
          "id": "end",
          "type": "circle",
          "source": {
              "type": "geojson",
              "data": {
                  "type": "Feature",
                  "properties": {
                    "description": "Activitiy End"
                  },
                  "geometry": {
                      "type": "Point",
                      "coordinates": [endLatlng[1], endLatlng[0]]
                  }
              }
          },
          "paint": {
              "circle-color": "#f03434",
              "circle-radius": 7
          }
        });

        // Geographic coordinates of the LineString
        var coordinates = decodedPolylineArray;

        // Pass the first coordinates in the LineString to `lngLatBounds` &
        // wrap each coordinate pair in `extend` to include them in the bounds
        // result. A variation of this technique could be applied to zooming
        // to the bounds of multiple Points or Polygon geomteries - it just
        // requires wrapping all the coordinates with the extend method.
        var bounds = coordinates.reduce(function(bounds, coord) {
            return bounds.extend(coord);
        }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

        map.fitBounds(bounds, {
            padding: 30
        });

        map.addControl(new mapboxgl.NavigationControl())
        map.addControl(new mapboxgl.FullscreenControl());

        // Create a popup, but don't add it to the map yet.
        let popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });

        map.on('mouseenter', 'start', function(e) {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';

            // Populate the popup and set its coordinates
            // based on the feature found.
            popup.setLngLat(e.features[0].geometry.coordinates)
                .setHTML(e.features[0].properties.description)
                .addTo(map);
        });

        map.on('mouseleave', 'start', function() {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });

        map.on('mouseenter', 'end', function(e) {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';

            // Populate the popup and set its coordinates
            // based on the feature found.
            popup.setLngLat(e.features[0].geometry.coordinates)
                .setHTML(e.features[0].properties.description)
                .addTo(map);
        });

        map.on('mouseleave', 'end', function() {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });

    });
  }

  render() {
      return (
        <div className='c-activity-interactive-map-container'>
          <div className='c-activity-interactive-map' ref={(x) => { this.container = x }}>
          </div>
        </div>
      )
  }
}


class ActivityDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      gear: [],
      athlete: {},
      map: {},
      loading: false
    }
  }

  componentWillMount(){
    console.log('componentWillMount');
    this.setState({
      loading: true
    })
  }

  componentDidMount(){
    let userAccessToken = localStorage.getItem('access_token');
    let thisActivityApiUrl = 'https://www.strava.com/api/v3/activities/' + this.props.match.params.id;

    let thisActivityStreamApiUrl = thisActivityApiUrl + '/streams/heartrate,latlng,cadence'

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
        map: json.map,
        loading: false
      })

    })

    fetch(thisActivityStreamApiUrl, {
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
        activityStream: json
      })
    })
  }

  render() {

    // Distance
    activityDistance =  _.round(this.state.data.distance/1000, 1)
    // Climb
    activityTotalElevationGain =  _.round(this.state.data.total_elevation_gain, 0)
    // Calories
    activityTotalCalories =  this.state.data.calories

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

    if(this.state.loading){
      return(
        <div className="o-flex o-flex-align--center o-flex-justify--center">
          <LoadingSpinner />
        </div>
      )
    } else {
      return(
        <div className="o-activity-detail">
          <div className="o-activity-detail-header">
            <h2>{this.state.data.name}</h2>
            <span className='c-activity__time'>
              <Moment format="MMM DD, YYYY">{this.state.data.start_date}</Moment> • <Moment format="hh:mm a">{this.state.data.start_date}</Moment>
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
              {activityAverageSpeed ? <ActivityStat label="speed" value={activityAverageSpeed} unit="km"/> : null}
              {activityAverageCadence ? <ActivityStat label="cadence" value={activityAverageCadence} unit="m"/>: null}
              {activityAverageHeartRate ? <ActivityStat label="heartrate" value={activityAverageHeartRate}/> : null}
              {activityAverageWatts ? <ActivityStat label="watts" value={activityAverageWatts}/> : null}
            </div>
          </div>
        </div>
      )
    }

  }
}

export default ActivityDetail
