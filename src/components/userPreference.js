import React, {Component} from 'react';
import fire from '../components/firebase'

class UserPreference extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true
    }
  }

  checkStatus = () => {

    let userPreferenceRef = fire.database().ref('users/' + this.props.userUid + '/userPreference');

    userPreferenceRef.once('value', snapshot => {
      console.log(snapshot);
      snapshot.forEach(child => {
        let userPreference = child.val()
        console.log(userPreference);
      })
      this.setState({ loading: false })
    })
  }

  render(){
    return null
  }
}

export default UserPreference
