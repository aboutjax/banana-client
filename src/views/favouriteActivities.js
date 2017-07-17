import React, { Component } from 'react';
import _ from 'lodash';
import Activity from '../components/activity';
import fire from '../components/firebase'
import LoadingSpinner from '../components/loader';
import { CSSTransitionGroup } from 'react-transition-group';

class FavouriteActivities extends Component {
  constructor(){
    super();
    this.state = {
      data: [],
      loading: true
    }
  }
  componentDidMount(){

      let allFavourites = []

      let favouritesRef = fire.database().ref('users/' + this.props.userUid + '/favourites');
      favouritesRef.once('value', snapshot => {

        snapshot.forEach(child => {
          allFavourites.push(child.val())

        })
        this.setState({ data: allFavourites, loading: false })
      })

  }

  render() {

    const activitiesData = this.state.data
    const activitiesDataReversed = activitiesData.reverse()
    const activities = activitiesDataReversed.map( (activity, index) => {

        return(

            <Activity key={index} data={activity.activityData} mapDimension='400x400'/>

        )
    })

    if(!this.state.loading) {

      return (
        <div>
          <div className="c-page-header">
            <h1>Favourites</h1>
          </div>
          <CSSTransitionGroup
            transitionName="o-transition"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            { activities }
          </CSSTransitionGroup>
        </div>

      )
    } else {
      return(
        <div className="o-flex o-flex-align--center o-flex-justify--center">
          <LoadingSpinner />
        </div>
      )
    }

  }
}

export default FavouriteActivities
