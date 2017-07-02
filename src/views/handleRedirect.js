import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {setCookie} from '../components/cookieHelper'

let userAccessToken;

let setTokenFromUrl = () => {
  const search = window.location.search.substring(1)
  const query = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')

  userAccessToken = query.access_token
  setCookie('access_token', userAccessToken, 7)
}


class HandleRedirect extends Component {

  componentWillMount(){

    // get token from url
    setTokenFromUrl();
    window.location.reload()
    window.location.assign("/banana")

  }

  render(){
    return(
      <Redirect to="/" />
    )
  }
}

export default HandleRedirect;
