import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

let userAccessToken;

class HandleRedirect extends Component {

  componentWillMount(){

    console.log('handleRedirect.js');
    // get token from url
    let setTokenFromUrl = () => {
      const search = location.search.substring(1)
      const query = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')

      userAccessToken = query.access_token
      localStorage.setItem('access_token', userAccessToken)
    }

    let getAccessToken = () => {
      if(localStorage.getItem('access_token')) {
        // found localstorage access token
        console.log('found localstorage access token');
        userAccessToken = localStorage.getItem('access_token')

      } else {
        // no localstorage access token
        console.log('no localstorage access token');
        setTokenFromUrl();
      }
    }

    getAccessToken();

  }

  componentDidMount() {
    window.location.reload()
  }

  render(){
    return(
      <Redirect to="/" />
    )
  }
}

export default HandleRedirect;
