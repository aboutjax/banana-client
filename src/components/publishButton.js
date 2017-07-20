import React, {Component} from 'react';
import fire from '../components/firebase'
import {IconCloud,IconCheckLine} from '../components/icons/icons'

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
          console.log('activity is in public stream');
          this.setState({
            isPublic: true,
          })
        } else {
          console.log('not matched');
        }
      })
      this.setState({ loading: false })
    })
  }

  removeFromPublicStream = () => {


    let publicActivitiesRef = fire.database().ref('users/' + this.props.userUid + '/publicActivities');
    let activityId = this.props.activityId

    if(this.state.isPublic) {
      publicActivitiesRef.once('value', snapshot => {
        snapshot.forEach(child => {
          let publicActivityId = child.child('activityId').val()

          if(publicActivityId === activityId) {
            console.log('remove from public stream');
            child.ref.remove()
          }
        })
      })

      this.setState({
        isPublic: false
      })
    }

  }

  addToPublicStream = () => {

    let publicActivitiesRef = fire.database().ref('users/' + this.props.userUid + '/publicActivities');
    let activityId = this.props.activityId
    let newPublicActivity = publicActivitiesRef.push()

    if(!this.state.isPublic) {
      console.log('add to public stream');
      newPublicActivity.set({
        activityId: activityId,
        activityData: this.props.data,
        altitudeStream: this.props.altitudeStream || null,
        distanceStream: this.props.distanceStream || null,
        latLngStream: this.props.latLngStream || null,
        velocityStream: this.props.velocityStream || null,
        cadenceStream: this.props.cadenceStream || null,
        heartrateStream: this.props.heartrateStream || null
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
    if(this.state.loading) {
      return(
        <button disabled className="c-btn c-btn--favourite" onClick={this.addToPublicStream}><IconCloud className="c-icon"/> <span>Publish</span></button>
      )
    } else {
      return(
        <div>
          {this.state.isPublic
            ?
            <div className="o-flex o-flex-align--center">
              <button className="c-btn c-btn--favourite is-favourite" onClick={this.removeFromPublicStream}><IconCheckLine className="c-icon"/> <span>Published</span></button>
              <a className="c-link t-left-spacing" target="_blank" href={"/public/" + this.props.userUid + "/" +  this.props.activityId}> Open Public Link</a>
            </div>
            :
            <button className="c-btn c-btn--favourite" onClick={this.addToPublicStream}><IconCloud className="c-icon"/> <span>Publish</span></button>


          }

        </div>
      )
    }
  }
}

export default PublishButton
