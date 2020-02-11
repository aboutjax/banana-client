import React, { Component } from "react";
import Moment from "react-moment";
import FavouriteButton from "../components/favouriteButton";
import PublishButton from "../components/publishButton";

class ActivityHeader extends Component {
  render() {
    return (
      <div>
        <div className="c-page-header">
          <h3 className="o-activity-detail-name">{this.props.data.name}</h3>
          <a
            rel="noopener noreferrer"
            target="_blank"
            className="o-activity-detail-time"
            href={"https://strava.com/activities/" + this.props.data.id}
          >
            <span>
              <Moment format="MMM DD, YYYY">
                {this.props.data.start_date}
              </Moment>
              <span> at </span>
              <Moment format="hh:mm a">{this.props.data.start_date}</Moment>
            </span>
          </a>
          <div className="t-top-spacing--l o-flex">
            <div className="t-right-spacing">
              <FavouriteButton
                userUid={this.props.userUid}
                activityId={this.props.activityId}
                data={this.props.data}
              />
            </div>
            <div>
              <PublishButton
                userUid={this.props.userUid}
                activityId={this.props.activityId}
                data={this.props.data}
                altitudeStream={this.props.altitudeStream}
                cadenceStream={this.props.cadenceStream}
                distanceStream={this.props.distanceStream}
                heartrateStream={this.props.heartrateStream}
                wattsStream={this.props.wattsStream}
                latLngStream={this.props.latLngStream}
                velocityStream={this.props.velocityStream}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ActivityHeader;
