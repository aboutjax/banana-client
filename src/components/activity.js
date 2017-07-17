import React, { Component } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import MomentJS from 'moment'
import _ from 'lodash';

const googleApiKey = 'AIzaSyAsyxYCjxLqi49yGUuqUJRa4cYN8V4VyLE'

// Google map style wizard: https://mapstyle.withgoogle.com/


function ActivityMap(props) {
  let pathWeight = 1;
  let pathColor = '0x3B8BFFff';
  let mapDimension = props.mapDimension || '400x400';
  let mapStyle = "&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0x212121%7Cvisibility:simplified&style=element:labels.icon%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0x131313&style=element:labels.text.stroke%7Ccolor:0x212121&style=feature:administrative%7Celement:geometry%7Ccolor:0x757575&style=feature:administrative.country%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:administrative.land_parcel%7Cvisibility:off&style=feature:administrative.land_parcel%7Celement:geometry%7Ccolor:0xe1e1e1%7Cvisibility:off&style=feature:administrative.locality%7Celement:labels.text.fill%7Ccolor:0x666666&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:poi.park%7Celement:geometry%7Ccolor:0x181818&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:poi.park%7Celement:labels.text.stroke%7Ccolor:0x1b1b1b&style=feature:road%7Celement:geometry.fill%7Ccolor:0x808080&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x8a8a8a&style=feature:road.arterial%7Celement:geometry%7Ccolor:0x373737&style=feature:road.highway%7Celement:geometry%7Ccolor:0x3c3c3c&style=feature:road.highway.controlled_access%7Celement:geometry%7Ccolor:0x4e4e4e&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:transit%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:water%7Celement:geometry%7Ccolor:0x191919&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x3d3d3d&size=";

  let imageUrl = "https://maps.googleapis.com/maps/api/staticmap?key="+ googleApiKey + "&path=weight:"+ pathWeight +"%7Ccolor:"+ pathColor + "%7Cenc:" + props.mapPolyline +  mapStyle + mapDimension;

  if(props.mapPolyline) {
    return(
      <div className="c-activity-map">
        <img className="c-activity-map__image" src={ imageUrl } alt=""/>
      </div>
    )
  } else {
    return(
      <div className="c-activity-map">
        <span className="c-activity-map__message">No Location Information</span>
      </div>
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

class Activity extends Component {

  render(){
    let activityDistance = Math.floor(this.props.data.distance/1000)
    let activityAverageSpeed = _.round((this.props.data.average_speed * 60 * 60) / 1000, 1)
    let activityTotalElevationGain = Math.floor(this.props.data.total_elevation_gain)
    let activityMovingTime = MomentJS.duration(this.props.data.moving_time, 'seconds')
    let activityMovingTimeHour = activityMovingTime._data.hours
    let activityMovingTimeMinutes = activityMovingTime._data.minutes
    let activityMovingTimeSeconds = activityMovingTime._data.seconds
    let activityMovingTimeHHMMSS = activityMovingTimeHour + ':' + activityMovingTimeMinutes + ':' + activityMovingTimeSeconds

    return(
      <div className="c-activity">
        <ActivityMap className="c-activity__map" mapPolyline={this.props.data.map.summary_polyline}/>
        <div className="c-activity__meta">
          <ActivityName favourite={this.props.favourite} data={this.props.data}/>
          <div className="c-activity__stats">
            <ActivityStat label="distance" value={activityDistance} unit="km"/>
            <ActivityStat label="climb" value={activityTotalElevationGain} unit="m"/>
            <ActivityStat label="duration" value={activityMovingTimeHHMMSS}/>
            <ActivityStat label="average speed" value={activityAverageSpeed} unit="km/h"/>
          </div>
          <div className="o-flex o-flex-justify--end">
            {this.props.data.has_heartrate && <div className="c-activity__has-chart-icon c-activity__has-chart-icon--heartrate"> <div className="c-tooltip">has heartrate</div></div>}
            {this.props.data.average_cadence && <div className="c-activity__has-chart-icon c-activity__has-chart-icon--cadence"> <div className="c-tooltip">has cadence</div></div>}
          </div>

        </div>
      </div>
    )
  }
}

export default Activity
export {ActivityMap, ActivityStat}
