import React, {Component} from 'react';
import Moment from 'react-moment';

class ActivityHeaderPublic extends Component {
  render(){
    return(
      <div>
        <div className="c-page-header c-page-header--center-aligned">
          <AthleteProfile athleteData={this.props.athleteData} />
          <h3 className="o-activity-detail-name">{this.props.data.name}</h3>
          <a target="_blank" className="o-activity-detail-time" href={"https://strava.com/activities/" + this.props.data.id}>
          <span>
            <Moment format="MMM DD, YYYY">{this.props.data.start_date}</Moment>
            <span> at </span>
            <Moment format="hh:mm a">{this.props.data.start_date}</Moment>
          </span>
          </a>
        </div>
      </div>
    )
  }
}


function AthleteProfile(props) {
  return(
    <div className="c-athlete-profile">
      <img alt="profile" src={props.athleteData.profile} className="c-athlete-profile__image"/>
    </div>
  )
}

export default ActivityHeaderPublic
