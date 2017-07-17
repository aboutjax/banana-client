import React, { Component } from 'react';
import _ from 'lodash';
import Activity from '../components/activity';
import fire from '../components/firebase'
import LoadingSpinner from '../components/loader';
import { CSSTransitionGroup } from 'react-transition-group';
import {IconBookmarkSolid,IconCheckLine} from '../components/icons/icons'

let assetSrc = ''

if(process.env.NODE_ENV === 'development'){
  assetSrc = '';
} else {
  assetSrc = '/banana';
}

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
        <div className="o-favourite-activities">
          <div className="c-page-header">
            <h1>Favourites</h1>
          </div>

          {this.state.data.length > 0
            ?
            <CSSTransitionGroup
              transitionName="o-transition"
              transitionAppear={true}
              transitionAppearTimeout={500}
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>
              { activities }
            </CSSTransitionGroup>
            :
            <EmptyFavourites />
          }
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

function EmptyFavourites() {
  return(
    <div className="c-empty">
      <p className="c-empty__message">No favourite activities</p>
      {/* <img src={ assetSrc + "/img/how_to_favourite.png"} /> */}
    </div>
  )
}

class EmptyFavouritesAnimation extends Component {

  constructor(){
    super()
    this.state = {
      isFavourite: false,
    }
  }

  selfToggleState = () => {
    setInterval(
      () => {
        this.setState({ isFavourite: !this.state.isFavourite})
      }, 500
    );
  }

  componentDidMount() {
    this.selfToggleState();
  }

  render() {
    return(
      <div className="c-animation-empty-favourites">
        <button className={this.state.isFavourite ? "c-btn c-btn--favourite" : "c-btn c-btn--favourite is-favourite"}><IconBookmarkSolid className="c-icon"/> <span>{this.state.isFavourite ? "Favourite" : 'Favourited'}</span></button>
      </div>
    )
  }

}

export default FavouriteActivities
