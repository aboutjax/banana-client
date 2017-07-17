import React, { Component } from 'react';
import Activity from '../components/activity';
import { CSSTransitionGroup } from 'react-transition-group';
import LoadingSpinner from '../components/loader';
import {getCookie} from '../components/cookieHelper'
import fire from '../components/firebase'
import _ from 'lodash';
import {IconArrowRight, IconArrowLeft} from '../components/icons/icons'

const activitiesPerPage = 30;

class Activities extends Component{
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      pager: {},
      loading: true,
      userUid: props.userUid
    }
  }

  componentWillMount(){
    this.setState({
      loading: true
    })
  }


  // Check favourites state from Firebase
  checkFavouriteStatus = () => {



  }

  fetchData = () => {

    let userAccessToken = getCookie('access_token');
    let page = this.props.match.params.page || 1
    let activitiesFetchUrl = 'https://www.strava.com/api/v3/athlete/activities?page='+ page

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

  componentWillReceiveProps() {


    let favouritesList = []
    let favouritesRef = fire.database().ref('users/' + this.state.userUid + '/favourites');

    favouritesRef.once('value', snapshot => {
      snapshot.forEach(child => {
        let favouriteActivityId = child.child('activityId').val()
        favouritesList.push(favouriteActivityId)
      })

      this.setState({
        loading: false,
        favouritesList: favouritesList
      })
    })

  }

  componentDidMount() {
    this.fetchData()


  }

  render(){
    const activitiesData = this.state.data;
    const activities = activitiesData.map((activity, index) => {
      let isFavourite;

        if(this.state.favouritesList) {
          isFavourite = _.includes(this.state.favouritesList, String(activity.id))
        }

        return(
            <Activity favourite={isFavourite} key={index} data={activity} mapDimension='400x400'/>
        )
    })

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
            <div className="c-page-header">
              <h1>All Activities</h1>
            </div>
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
      <li className="c-paginator__link t-right-spacing--xs">
        <a className={ props.pager.currentPage === 1 ? 'disabled c-btn' : 'c-btn' } href={'/banana/activities/page/' + props.pager.previousPage}><IconArrowLeft/></a>
      </li>
      <li className="c-paginator__link t-left-spacing--xs">
        <a className={ props.pager.isLastPage ? 'disabled c-btn' : 'c-btn' } href={'/banana/activities/page/' + props.pager.nextPage}><IconArrowRight/></a>
      </li>
    </ul>
  )
}


export default Activities;
