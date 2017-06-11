import React, { Component } from 'react';
import _ from 'lodash';
import Activity from '../components/activity';
import { CSSTransitionGroup } from 'react-transition-group';
import LoadingSpinner from '../components/loader'

class Activities extends Component{
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      pager: {},
      loading: false
    }

    this.setPager = this.setPager.bind(this)
  }

  componentWillMount(){
    this.setState({
      loading: true
    })
  }

  componentDidMount(){
    let userAccessToken = localStorage.getItem('access_token')
    let page = this.props.match.params.page || 1
    let activitiesFetchUrl = 'https://www.strava.com/api/v3/athlete/activities?page=' + page

    console.log(activitiesFetchUrl);

    fetch(activitiesFetchUrl, {
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
        loading: false
      })
    })
  }

  setPager() {
    let itemsOnPage = this.state.data.length
    if(itemsOnPage < 30) {
      console.log('last page');
    } else {
      console.log('not last page');
    }
  }

  render(){
    const activities = this.state.data.map((activity, index) => (
      <Activity key={index} data={activity} mapDimension='400x400'/>
    ))

    if(this.state.loading){
      return(
        <div>
          <h1>Activities</h1>
          <div className="o-flex o-flex-align--center o-flex-justify--center">
            <LoadingSpinner />
          </div>
        </div>
      )
    } else {
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
}

// class Paginator extends Component {
//
// }


export default Activities;
