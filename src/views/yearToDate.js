import React, { Component } from 'react';
import _ from 'lodash';
import LoadingSpinner from '../components/loader'
import {getCookie} from '../components/cookieHelper'
import CountUp, { startAnimation } from 'react-countup';
import Waypoint from 'react-waypoint';

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
    }
  }

  componentWillMount(){

    let userAccessToken = getCookie('access_token');

    fetch('https://www.strava.com/api/v3/athlete', {
      method: 'get',
      headers: {
        "content-type": "application/json",
        "authorization": "Bearer " + userAccessToken
      }
    }).then(function(response){
      return response.json();
    }).then( json => {

      this.setState({
        data: json
      })
    }).then( json => {

      let totalsApiUrl = 'https://www.strava.com/api/v3/athletes/' +  this.state.data.id + '/stats';
      fetch(totalsApiUrl, {
        method: 'get',
        headers: {
          "content-type": "application/json",
          "authorization": "Bearer " + userAccessToken
        }
      }).then(function(response){
        return response.json();
      }).then( json => {

        this.setState({
          ytdRideTotals: json.ytd_ride_totals,
          ytdRunTotals: json.ytd_run_totals,
          ytdSwimTotals: json.ytd_swim_totals,
          loading: false
        })
      })
    })

  }

  render(){
    let ytdRideCount = this.state.ytdRideTotals.count
    let ytdRideDistance = _.round(this.state.ytdRideTotals.distance / 1000 , 1)
    let ytdRideElevationGain = _.round(this.state.ytdRideTotals.elevation_gain, 1)
    let ytdRideMovingTime = _.round(this.state.ytdRideTotals.moving_time / 60 / 60, 1)

    let mountEverestUnit = _.round(this.state.ytdRideTotals.elevation_gain / 8848, 2)

    if(!this.state.loading) {
      return (
        <div className="c-ytd">
          <div className="c-ytd__stats">
            <div className="c-ytd__section c-ytd__section--intro">

              <div className="c-ytd__intro">
                <h1 className="c-ytd__intro__year">20<br/>18</h1>
                <h1 className="c-ytd__intro__title">Year<br/>in<br/>Review</h1>
              </div>

              <ScrollHint />
            </div>
            <YearToDateStat
              value={ytdRideDistance} unit='kilometers'
              type='ride'
              title='This year, you clocked'
            />
            <YearToDateStat
              value={ytdRideElevationGain} unit='meters'
              type='ride'
              title='You climbed'
              description={'That translates to climbing Mt Everest ' + mountEverestUnit + ' times!'}
            />
            <YearToDateStat
              value={ytdRideMovingTime} unit='hours'
              type='ride'
              title='You sat in the saddle for'
            />
          </div>
        </div>
      )
    } else {
      return (
        <LoadingSpinner />
      )
    }


  }
}

class YearToDateStat extends Component {
  constructor(props){
    super(props)

    this.state = {
      value: 0,
      counted: false
    }
  }

  _handleWaypointEnter = () => {
    if(!this.state.counted){
      startAnimation(this.myCountUp)
      this.setState({value: this.props.value, counted: true})
    }
  }

  render(){

    return(
      <div className={"c-ytd__section c-ytd__section--" + this.props.type}>
        <Waypoint bottomOffset='20%' onEnter={this._handleWaypointEnter} />
        <div className="c-ytd__stat">
          <h3 className="c-ytd__stat__title">{this.props.title}</h3>
          <h1 className="c-ytd__stat__value">
            <CountUp separator="," start={0} duration={2} end={this.state.value} ref={(countUp) => {
              this.myCountUp = countUp;
            }}/>
          </h1>
          <h3 className="c-ytd__stat__unit">{this.props.unit}</h3>
          {this.props.description ? <h3 className="c-ytd__stat__description">{this.props.description}</h3> : null}
        </div>
      </div>
    )
  }
}

function YearToDateStat(props){
  return(
    <strong>{props.value ? props.value : null}</strong>
  )
}

function CircleSvg(){
  return(
    <svg className="c-ytd__circle" width="724px" height="724px" viewBox="0 0 724 724" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g id="product" strokeWidth="1" fill="none">
            <circle id="Oval" fill="none" stroke="#FFFFFF" strokeWidth="41" cx="362" cy="362" r="341"></circle>
        </g>
    </svg>
  )
}

function ScrollHint(){
  return(
    <svg className="c-ytd__scroll-hint" viewBox="0 0 539 65" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g id="Page-2" stroke="none" fill="none" fill-rule="evenodd">
            <path d="M144,32.2686567 C245,32.2686567 239.499145,2.70616862e-15 314.5,0 C389.500855,-3.60822483e-15 413,45.2089552 465.5,45.2089552 C518,45.2089552 539,48.5 539,56.6268657 C539,62.2089552 539,65 539,65 L-2.27373675e-13,65 C-2.27373675e-13,65 -2.27373675e-13,62.2089552 -2.27373675e-13,56.6268657 C-2.27373675e-13,36 43,32.2686567 144,32.2686567 Z" id="Rectangle" fill="#FFC236"></path>
        </g>
    </svg>
  )
}

function PatternSVG(){
  return(

    <svg className="c-ytd__pattern" viewBox="0 0 375 117" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g id="Page-2" stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd">
            <g transform="translate(0.000000, -71.000000)" stroke="#FFFFFF" strokeWidth="2">
                <path d="M9,491.5 C9,336 241.5,-67 555.5,-67" id="Path-2" transform="translate(282.250000, 212.250000) rotate(37.000000) translate(-282.250000, -212.250000) "></path>
            </g>
        </g>
    </svg>
  )
}

function TypeIcon(){
  return(

    <svg width="84px" height="53px" viewBox="0 0 84 53" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g id="product" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
            <g id="Artboard-Copy-8" transform="translate(-678.000000, -95.000000)" strokeWidth="3">
                <g id="Group-2" transform="translate(657.000000, 97.000000)">
                    <g id="bicycle-mountain" transform="translate(23.000000, 0.000000)">
                        <g id="Group">
                            <path d="M23.6930984,25.6026678 C29.1132339,31.0560849 29.1132339,39.8978052 23.6930984,45.3511874 C18.2729629,50.8046045 9.48520249,50.8046045 4.06510165,45.3511874 C-1.35503388,39.8977703 -1.35503388,31.05605 4.06510165,25.6026678 C9.48523719,20.1492508 18.2729976,20.1492508 23.6930984,25.6026678" id="Shape" stroke="#202428"></path>
                            <path d="M75.5012632,25.473019 C80.9213988,30.9264361 80.9213988,39.7681564 75.5012632,45.2215386 C70.0811277,50.6749556 61.2933673,50.6749556 55.8732665,45.2215386 C50.4531309,39.7681215 50.4531309,30.9264012 55.8732665,25.473019 C61.293402,20.0196019 70.0811624,20.0196019 75.5012632,25.473019" id="Shape" stroke="#202428"></path>
                            <polyline id="Shape" stroke="#FFFFFF" points="36.1940905 35.3506826 55.9128219 8.65787999 29.2545405 17.8917883 13.640553 35.3471915 36.1940905 35.3471915 24.9173218 7.41854637"></polyline>
                            <polyline id="Shape" stroke="#FFFFFF" points="65.6871781 35.3471915 53.5429656 2.1819254 60.4825156 0.43638508"></polyline>
                            <path d="M20.580103,5.67300604 L30.989428,5.67300604" id="Shape" stroke="#FFFFFF"></path>
                        </g>
                    </g>
                </g>
            </g>
        </g>
    </svg>
  )
}

export default YearToDate;
