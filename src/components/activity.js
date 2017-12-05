import React, { Component } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import MomentJS from 'moment'
import _ from 'lodash';

const googleApiKey = 'AIzaSyAsyxYCjxLqi49yGUuqUJRa4cYN8V4VyLE'

// Google map style wizard: https://mapstyle.withgoogle.com/


function ActivityMap(props) {
  let pathWeight = 4;
  let pathColor = '0x3B8BFFff';
  let mapDimension = props.mapDimension || '400x400';
  let mapStyle = "&format=png&maptype=roadmap&style=feature:water%7Celement:geometry.fill%7Ccolor:0x75cff0&size=";

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
      <Link to={'/activities/'+ this.props.data.id}>
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
              {this.props.data.has_heartrate && <div className="c-activity__has-chart-icon c-activity__has-chart-icon--heartrate"> <div className="c-tooltip">Heartrate</div></div>}
              {this.props.data.average_cadence && <div className="c-activity__has-chart-icon c-activity__has-chart-icon--cadence"> <div className="c-tooltip">Cadence</div></div>}
              {this.props.data.device_watts && <div className="c-activity__has-chart-icon c-activity__has-chart-icon--power"> <div className="c-tooltip">Power</div></div>}
            </div>

          </div>
        </div>
      </Link>
    )
  }
}

export default Activity
export {ActivityMap, ActivityStat}
