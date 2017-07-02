import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {setCookie} from '../components/cookieHelper'
import * as firebase from 'firebase';
import fire from '../components/firebase'

let userAccessToken;
let firebaseToken;

let setTokensFromUrl = () => {
  const search = window.location.search.substring(1)
  const query = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')

  userAccessToken = query.access_token
  firebaseToken = query.firebase_token
}

let signInWithFirebase = (token) => {
  fire.auth().signInWithCustomToken(token).catch(function(error){
    // Handle error
    console.log(error.code);
    console.log(error.message);
  })
}

class HandleRedirect extends Component {

  componentWillMount(){

    // read tokens from url
    setTokensFromUrl();

    // save access token to cookies
    setCookie('access_token', userAccessToken, 7)

    // sign in with firebase token
    signInWithFirebase(firebaseToken);

    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        console.log('logged in with firebase', user.uid);
      } else {
      }
    })

  }

  render(){
    return(
      <Redirect to="/" />
    )
  }
}

export default HandleRedirect;
