import React, { Component } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const googleApiKey = 'AIzaSyAsyxYCjxLqi49yGUuqUJRa4cYN8V4VyLE'
let pathWeight = 4;
let pathColor = '0x3B8BFFff';
let mapDimension = '400x400';
let mapStyle = "&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0xf5f5f5&style=element:labels.icon%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0x616161&style=element:labels.text.stroke%7Ccolor:0xf5f5f5&style=feature:administrative%7Celement:geometry%7Cvisibility:off&style=feature:administrative.land_parcel%7Cvisibility:off&style=feature:administrative.land_parcel%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&style=feature:administrative.neighborhood%7Cvisibility:off&style=feature:poi%7Cvisibility:off&style=feature:poi%7Celement:geometry%7Ccolor:0xeeeeee&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:poi.park%7Celement:geometry%7Ccolor:0xe5e5e5&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:road%7Celement:geometry%7Ccolor:0xffffff&style=feature:road%7Celement:labels%7Cvisibility:off&style=feature:road%7Celement:labels.icon%7Cvisibility:off&style=feature:road.arterial%7Cvisibility:off&style=feature:road.arterial%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:road.highway%7Celement:geometry%7Ccolor:0xdadada&style=feature:road.highway%7Celement:labels%7Cvisibility:off&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:road.local%7Cvisibility:off&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:transit%7Cvisibility:off&style=feature:transit.line%7Celement:geometry%7Ccolor:0xe5e5e5&style=feature:transit.station%7Celement:geometry%7Ccolor:0xeeeeee&style=feature:water%7Celement:geometry%7Ccolor:0xc9c9c9&style=feature:water%7Celement:labels.text%7Cvisibility:off&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&size=";



class ActivityMap extends Component {

  render(){

    let imageUrl = "https://maps.googleapis.com/maps/api/staticmap?key="+ googleApiKey + "&path=weight:"+ pathWeight +"%7Ccolor:"+ pathColor + "%7Cenc:" + this.props.mapPolyline +  mapStyle + mapDimension;

    if(this.props.mapPolyline) {
      return(
        <div className="c-activity-map">
          <img className="c-activity-map__image" src={ imageUrl } alt=""/>
        </div>
      )
    } else {
      return(
        <div className="c-activity-map">
          <img className="c-activity-map__image" src='http://placehold.it/250' alt=""/>
        </div>
      )
    }
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
      <span className="c-activity__stat-value">{props.value}{props.unit}</span>
    </div>
  )
}

function ActivityName(props){
  return(
    <div>
      <div className="c-activity__header">
        <div>
          <h3 className="c-activity__title">
            <Link to={"/activities/" + props.data.id}>{props.title}</Link>
          </h3>
          <span className='c-activity__time'>
            <Moment format="MMM DD, YYYY">{props.date}</Moment> • <Moment format="hh:mm a">{props.date}</Moment>
          </span>
        </div>
        <ActivityIsCommute commute={props.commute} />
      </div>
    </div>
  )
}

class Activity extends Component {

  render(){
    let activityDistance = Math.floor(this.props.data.distance/1000)
    let activityTotalElevationGain = Math.floor(this.props.data.total_elevation_gain)
    return(
      <div className="c-activity">
        <ActivityMap className="c-activity__map" mapPolyline={this.props.map}/>
        <div className="c-activity__meta">
          <ActivityName title={this.props.name} date={this.props.startdate} commute={this.props.commute} data={this.props.data}/>
          <div className="c-activity__stats">
            <ActivityStat label="distance" value={activityDistance} unit="km"/>
            <ActivityStat label="climb" value={activityTotalElevationGain} unit="m"/>
          </div>
        </div>
      </div>
    )
  }
}

export default Activity
