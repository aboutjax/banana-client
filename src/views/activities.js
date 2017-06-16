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
  }

  componentWillMount(){
    console.log('mounting');
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
      if(json.length < 30){
        this.setState({
          data: json,
          loading: false,
          pager: {
            isLastPage: true,
            isFirstPage: false,
            nextPage: null,
            currentPage: Number(this.props.match.params.page),
            previousPage: Number(this.props.match.params.page) - 1
          }
        })
      } else if(json.length === 30 && this.props.match.params.page){
        this.setState({
          data: json,
          loading: false,
          pager: {
            isLastPage: false,
            isFirstPage: false,
            nextPage: Number(this.props.match.params.page) + 1,
            currentPage: Number(this.props.match.params.page),
            previousPage: Number(this.props.match.params.page) - 1
          }
        })
      } else {
        this.setState({
          data: json,
          loading: false,
          pager: {
            isLastPage: false,
            isFirstPage: true,
            nextPage: 2,
            currentPage: 1,
            previousPage: null
          }
        })
      }
    })
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
            <ul className="c-paginator">
              <li className="c-paginator__link">
                <a className={ this.state.pager.currentPage === 1 ? 'disabled c-btn' : 'c-btn' } href={'/strava-dashboard/activities/page/' + this.state.pager.previousPage}>Previous</a>
              </li>
              <li className="c-paginator__link">
                <a className={ this.state.pager.isLastPage ? 'disabled c-btn' : 'c-btn' } href={'/strava-dashboard/activities/page/' + this.state.pager.nextPage}>Next</a>
              </li>
            </ul>
          </div>
        </div>
      )
    }
  }
}


export default Activities;
