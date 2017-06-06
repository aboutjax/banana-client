import React, { Component } from 'react';

let authUrl;
if(process.env.REACT_APP_SERVER_URL){
  authUrl = process.env.REACT_APP_SERVER_URL;
  console.log('developement mode');
} else {
  authUrl = "https://strava-auth.herokuapp.com";
  console.log('production mode');
}

class Login extends Component {
  render(){
    return(
      <a className="c-btn" href={authUrl}>Log In With Strava</a>
    )
  }
}

export default Login;
