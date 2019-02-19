import React, { Component } from "react";
import _ from "lodash";
import LoadingSpinner from "../components/loader";
import { getCookie } from "../components/cookieHelper";
import CountUp, { startAnimation } from "react-countup";
import Waypoint from "react-waypoint";

class YearToDate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: [],
      totals: [],
      ytdRideTotals: {},
      ytdRunTotals: {},
      ytdSwimTotals: {}
    };
  }

  componentWillMount() {
    let userAccessToken = getCookie("access_token");

    fetch("https://www.strava.com/api/v3/athlete", {
      method: "get",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + userAccessToken
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(json => {
        this.setState({
          data: json
        });
      })
      .then(json => {
        let totalsApiUrl =
          "https://www.strava.com/api/v3/athletes/" +
          this.state.data.id +
          "/stats";
        fetch(totalsApiUrl, {
          method: "get",
          headers: {
            "content-type": "application/json",
            authorization: "Bearer " + userAccessToken
          }
        })
          .then(function(response) {
            return response.json();
          })
          .then(json => {
            this.setState({
              ytdRideTotals: json.ytd_ride_totals,
              ytdRunTotals: json.ytd_run_totals,
              ytdSwimTotals: json.ytd_swim_totals,
              loading: false
            });
          });
      });
  }

  render() {
    let ytdRideDistance = _.round(this.state.ytdRideTotals.distance / 1000, 1);
    let ytdRideElevationGain = _.round(
      this.state.ytdRideTotals.elevation_gain,
      1
    );
    let ytdRideMovingTime = _.round(
      this.state.ytdRideTotals.moving_time / 60 / 60,
      1
    );

    let mountEverestUnit = _.round(
      this.state.ytdRideTotals.elevation_gain / 8848,
      2
    );

    if (!this.state.loading) {
      return (
        <div className="c-ytd">
          <div className="c-ytd__stats">
            <div className="c-ytd__section c-ytd__section--intro">
              <div className="c-ytd__intro">
                <h1 className="c-ytd__intro__year">
                  20
                  <br />
                  19
                </h1>
                <h1 className="c-ytd__intro__title">
                  Year
                  <br />
                  in
                  <br />
                  Review
                </h1>
              </div>

              <ScrollHint />
            </div>
            <YearToDateStat
              value={ytdRideDistance}
              unit="kilometers"
              type="ride"
              title="This year, you clocked"
            />
            <YearToDateStat
              value={ytdRideElevationGain}
              unit="meters"
              type="ride"
              title="You climbed"
              description={
                "That translates to climbing Mt Everest " +
                mountEverestUnit +
                " times!"
              }
            />
            <YearToDateStat
              value={ytdRideMovingTime}
              unit="hours"
              type="ride"
              title="You sat in the saddle for"
            />
          </div>
        </div>
      );
    } else {
      return <LoadingSpinner />;
    }
  }
}

class YearToDateStat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      counted: false
    };
  }

  _handleWaypointEnter = () => {
    if (!this.state.counted) {
      startAnimation(this.myCountUp);
      this.setState({ value: this.props.value, counted: true });
    }
  };

  render() {
    return (
      <div className={"c-ytd__section c-ytd__section--" + this.props.type}>
        <Waypoint bottomOffset="20%" onEnter={this._handleWaypointEnter} />
        <div className="c-ytd__stat">
          <h3 className="c-ytd__stat__title">{this.props.title}</h3>
          <h1 className="c-ytd__stat__value">
            <CountUp
              separator=","
              start={0}
              duration={2}
              end={this.state.value}
              ref={countUp => {
                this.myCountUp = countUp;
              }}
            />
          </h1>
          <h3 className="c-ytd__stat__unit">{this.props.unit}</h3>
          {this.props.description ? (
            <h3 className="c-ytd__stat__description">
              {this.props.description}
            </h3>
          ) : null}
        </div>
      </div>
    );
  }
}

function ScrollHint() {
  return (
    <svg
      className="c-ytd__scroll-hint"
      viewBox="0 0 539 65"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Page-2" stroke="none" fill="none" fill-rule="evenodd">
        <path
          d="M144,32.2686567 C245,32.2686567 239.499145,2.70616862e-15 314.5,0 C389.500855,-3.60822483e-15 413,45.2089552 465.5,45.2089552 C518,45.2089552 539,48.5 539,56.6268657 C539,62.2089552 539,65 539,65 L-2.27373675e-13,65 C-2.27373675e-13,65 -2.27373675e-13,62.2089552 -2.27373675e-13,56.6268657 C-2.27373675e-13,36 43,32.2686567 144,32.2686567 Z"
          id="Rectangle"
          fill="#FFC236"
        />
      </g>
    </svg>
  );
}

export default YearToDate;
