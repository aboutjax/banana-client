import React, { Component } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import MomentJS from 'moment'
import _ from 'lodash';

const googleApiKey = 'AIzaSyAsyxYCjxLqi49yGUuqUJRa4cYN8V4VyLE'


function ActivityMap(props) {
  let pathWeight = 2;
  let pathColor = '0x3B8BFFff';
  let mapDimension = props.mapDimension || '400x400';
  let mapStyle = "&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0x212121&style=element:labels.icon%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0x757575&style=element:labels.text.stroke%7Ccolor:0x212121&style=feature:administrative%7Celement:geometry%7Ccolor:0x757575%7Cvisibility:off&style=feature:administrative.country%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:administrative.land_parcel%7Cvisibility:off&style=feature:administrative.locality%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&style=feature:administrative.neighborhood%7Cvisibility:off&style=feature:poi%7Cvisibility:off&style=feature:poi%7Celement:labels.text%7Cvisibility:off&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:poi.park%7Celement:geometry%7Ccolor:0x181818&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:poi.park%7Celement:labels.text.stroke%7Ccolor:0x1b1b1b&style=feature:road%7Celement:geometry.fill%7Ccolor:0x2c2c2c&style=feature:road%7Celement:labels%7Cvisibility:off&style=feature:road%7Celement:labels.icon%7Cvisibility:off&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x8a8a8a&style=feature:road.arterial%7Cvisibility:off&style=feature:road.arterial%7Celement:geometry%7Ccolor:0x373737&style=feature:road.highway%7Celement:geometry%7Ccolor:0x3c3c3c&style=feature:road.highway%7Celement:labels%7Cvisibility:off&style=feature:road.highway.controlled_access%7Celement:geometry%7Ccolor:0x4e4e4e&style=feature:road.local%7Cvisibility:off&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:transit%7Cvisibility:off&style=feature:transit%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:water%7Celement:geometry%7Ccolor:0x000000&style=feature:water%7Celement:labels.text%7Cvisibility:off&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x3d3d3d&size=";

  let imageUrl = "https://maps.googleapis.com/maps/api/staticmap?key="+ googleApiKey + "&path=weight:"+ pathWeight +"%7Ccolor:"+ pathColor + "%7Cenc:" + props.mapPolyline +  mapStyle + mapDimension;

  if(props.mapPolyline) {
    return(
      <div className="c-activity-map">
        <img className="c-activity-map__image" src={ imageUrl } alt=""/>
      </div>
    )
  } else {
    return(
      <div className="c-activity-map"></div>
    )
  }

}

function ActivityIsCommute(props){
  if(props.commute){
    return(
        <span className="c-label c-label--sm">commute</span>
    )
  } else {
    return(
      null
    )
  }
}

function ActivityStat(props){
  return(
    <div className="c-activity__stat">
      <label className="c-activity__stat-label">{props.label}</label>
      <span className={`
        c-activity__stat-value
        ${props.type ? 'c-activity__stat-value--' + props.type: ''}
        `}
        >
        {props.value}
      <span className="c-activity__stat-unit">{props.unit}</span></span>
    </div>
  )
}

function ActivityName(props){
  return(
    <div>
      <div className="c-activity__header">
        <div>
          <h3 className="c-activity__title">
            <Link to={'/activities/'+ props.data.id}>
              {props.data.name}
            </Link>
          </h3>
          <span className='c-activity__time'>
            <Moment format="MMM DD, YYYY">{props.data.start_date}</Moment> • <Moment format="hh:mm a">{props.data.start_date}</Moment>
          </span>
        </div>
        <ActivityIsCommute commute={props.data.commute} />
      </div>
    </div>
  )
}

let activityDistance;
let activityAverageSpeed;
let activityTotalElevationGain;
let activityMovingTime;
let activityMovingTimeHour;
let activityMovingTimeMinutes;
let activityMovingTimeSeconds;
let activityMovingTimeHHMMSS;

class Activity extends Component {

  componentWillMount(){
    activityDistance = Math.floor(this.props.data.distance/1000)
    activityAverageSpeed = _.round((this.props.data.average_speed * 60 * 60) / 1000, 1)
    activityTotalElevationGain = Math.floor(this.props.data.total_elevation_gain)

    activityMovingTime = MomentJS.duration(this.props.data.moving_time, 'seconds')

    activityMovingTimeHour = activityMovingTime._data.hours
    activityMovingTimeMinutes = activityMovingTime._data.minutes
    activityMovingTimeSeconds = activityMovingTime._data.seconds

    activityMovingTimeHHMMSS = activityMovingTimeHour + ':' + activityMovingTimeMinutes + ':' + activityMovingTimeSeconds
  }

  render(){

    return(
      <div className="c-activity">
        <ActivityMap className="c-activity__map" mapPolyline={this.props.data.map.summary_polyline}/>
        <div className="c-activity__meta">
          <ActivityName data={this.props.data}/>
          <div className="c-activity__stats">
            <ActivityStat label="distance" value={activityDistance} unit="km"/>
            <ActivityStat label="climb" value={activityTotalElevationGain} unit="m"/>
            <ActivityStat label="duration" value={activityMovingTimeHHMMSS}/>
            <ActivityStat label="average speed" value={activityAverageSpeed} unit="km/h"/>
          </div>
        </div>
      </div>
    )
  }
}

export default Activity
exports.ActivityMap = ActivityMap
exports.ActivityStat = ActivityStat
