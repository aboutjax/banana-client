import React, {Component} from 'react';
import fire from '../components/firebase'
import {IconBookmarkSolid,IconCheckLine} from '../components/icons/icons'

class PublishButton extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isPublic: false,
      loading: true,
    }
  }

  checkStatus = () => {

    let publicActivitiesRef = fire.database().ref('users/' + this.props.userUid + '/publicActivities');
    let activityId = this.props.activityId

    publicActivitiesRef.once('value', snapshot => {
      snapshot.forEach(child => {
        let publicActivityId = child.child('activityId').val()

        if(publicActivityId === activityId){
          console.log('matched public');
          this.setState({
            isPublic: true,
          })
        }
      })
      this.setState({ loading: false })
    })
  }

  addToPublicStream = () => {


    let publicActivitiesRef = fire.database().ref('users/' + this.props.userUid + '/publicActivities');
    let activityId = this.props.activityId

    if(this.state.isPublic) {
      publicActivitiesRef.once('value', snapshot => {
        snapshot.forEach(child => {
          let publicActivityId = child.child('activityId').val()

          if(publicActivityId === activityId) {
            console.log('remove from firebase');
            child.ref.remove()
          }
        })
      })

      this.setState({
        isPublic: false
      })
    }

  }

  removeFromPublicStream = () => {

    let publicActivitiesRef = fire.database().ref('users/' + this.props.userUid + '/favourites');
    let activityId = this.props.activityId
    let newPublicActivity = publicActivitiesRef.push()

    if(!this.state.isPublic) {
      console.log('save to firebase');
      newPublicActivity.set({
        activityId: activityId,
        activityData: this.props.data
      })

      this.setState({
        isPublic: true
      })
    }

  }

  componentDidMount() {
    this.checkStatus()
  }

  render() {
    return(
      <div>
        {this.state.isPublic
          ?
          <button className="c-btn c-btn--favourite is-favourite" onClick={this.removeFromPublicStream}><IconCheckLine className="c-icon"/> <span>Unpublish</span></button>
          :
          <button className="c-btn c-btn--favourite" onClick={this.addToPublicStream}><IconBookmarkSolid className="c-icon"/> <span>Publish</span></button>
         }
      </div>
    )
  }

}

export default PublishButton
