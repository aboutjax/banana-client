import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
  componentDidMount(){
    localStorage.removeItem('access_token')
  }

  render() {
    return (
      <div>
        <span>You have been logged out</span>
        <Redirect to="/login"/>
      </div>
    )
  }
}

export default Logout;
