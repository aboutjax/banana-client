import React, { Component } from 'react';

let authUrl = 'https://strava-auth.herokuapp.com';
let assetSrc = ''

if(process.env.NODE_ENV === 'development'){
  authUrl = 'http://localhost:3000';
  assetSrc = '';
} else {
  authUrl = 'https://strava-auth.herokuapp.com';
  assetSrc = '/banana';
}
class Login extends Component {
  render() {

    return(
      <a href={authUrl}>
        <img alt="" src={ assetSrc + "/img/btn_strava_connectwith_orange.svg"}/>
      </a>
    )
  }
}

export default Login;
