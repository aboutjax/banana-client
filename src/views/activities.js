import React, { Component } from 'react';
import _ from 'lodash';
import Activity from '../components/activity';
import { CSSTransitionGroup } from 'react-transition-group';

class Activities extends Component{
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    }
  }

  componentWillMount(){
    let userAccessToken = localStorage.getItem('access_token')

    fetch('https://www.strava.com/api/v3/athlete/activities?page=1?per_page=20', {
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
        data: json
      })
    })
  }

  render(){
    const activities = this.state.data.map((activity, index) => (
      <Activity key={index} name={activity.name} startdate={activity.start_date} map={activity.map.summary_polyline} commute={activity.commute} data={activity}/>
    ))
    return (
      <div>
        <h1>Activities</h1>
        <div>
          <CSSTransitionGroup
          transitionName="o-transition"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          { activities }
        </CSSTransitionGroup>
        </div>
      </div>
    )
  }
}


export default Activities;
