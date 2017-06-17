import React, { Component } from 'react';
import _ from 'lodash';
import Activity from '../components/activity';
import { CSSTransitionGroup } from 'react-transition-group';
import LoadingSpinner from '../components/loader';

const activitiesPerPage = 30;

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
    this.setState({
      loading: true
    })
  }

  fetchData = () => {
    let userAccessToken = localStorage.getItem('access_token')
    let page = this.props.match.params.page || 1
    let activitiesFetchUrl = 'https://www.strava.com/api/v3/athlete/activities?page='+ page

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
      if(json.length < activitiesPerPage){
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
      } else if(json.length === activitiesPerPage && this.props.match.params.page){
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

  componentDidMount() {
    this.fetchData()
  }

  componentWillReceiveProps() {
    this.fetchData()
  }

  render(){
    const activities = this.state.data.map((activity, index) => (
      <Activity key={index} data={activity} mapDimension='400x400'/>
    ))

    if(this.state.loading){
      return(

          <div className="o-flex o-flex-align--center o-flex-justify--center">
            <LoadingSpinner />
          </div>

      )
    } else {
      return (
        <div>
          <div>
            <CSSTransitionGroup
              transitionName="o-transition"
              transitionAppear={true}
              transitionAppearTimeout={500}
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>
              { activities }
            </CSSTransitionGroup>
            <Paginator pager={this.state.pager}/>
          </div>
        </div>
      )
    }
  }
}

function Paginator(props) {
  return(
    <ul className="c-paginator">
      <li className="c-paginator__link">
        <a className={ props.pager.currentPage === 1 ? 'disabled c-btn' : 'c-btn' } href={'/strava-dashboard/activities/page/' + props.pager.previousPage}>Previous</a>
      </li>
      <li className="c-paginator__link">
        <a className={ props.pager.isLastPage ? 'disabled c-btn' : 'c-btn' } href={'/strava-dashboard/activities/page/' + props.pager.nextPage}>Next</a>
      </li>
    </ul>
  )
}


export default Activities;
