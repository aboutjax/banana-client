import * as firebase from 'firebase'

const config = {
  apiKey: "AIzaSyAT-v8o3B_cYtmaQOcOAaZypeXQC4W1lH8",
  authDomain: "banana-dd8f3.firebaseapp.com",
  databaseURL: "https://banana-dd8f3.firebaseio.com",
  projectId: "banana-dd8f3",
  storageBucket: "banana-dd8f3.appspot.com",
  messagingSenderId: "33006064885"
};

const fire = firebase.initializeApp(config);

export default fire;
