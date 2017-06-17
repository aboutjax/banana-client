import React, { Component } from 'react';

let authUrl = 'https://strava-auth.herokuapp.com';

if(process.env.NODE_ENV === 'development'){
  authUrl = 'http://localhost:3000';
} else {
  authUrl = 'https://strava-auth.herokuapp.com';
}
class Login extends Component {
  render() {

    return(
      <a className="c-btn c-btn--primary" href={authUrl}>Log In With Strava</a>
    )
  }
}

export default Login;
