import React, {Component} from 'react';
import './index.css';
import {Route} from 'react-router-dom';
import {getCookie} from './components/cookieHelper'

// Views
import Activities from './views/activities';
import Nav from './components/nav';
import HandleRedirect from './views/handleRedirect';
import ActivityDetail from './views/activityDetail';
import Home from './views/home';
import Footer from './components/footer';

let userIsLoggedIn;
let access_token = getCookie('access_token');
if(access_token) {
  userIsLoggedIn = true
} else {
  userIsLoggedIn = false
}

class App extends Component {

  render(){
    if(userIsLoggedIn) {
      return(

          <div className="App o-wrapper o-app">
            <Nav type="private"/>

            <div className='o-content'>

              <Route path="/handle_redirect" exact component={HandleRedirect}/>
              <Route path="/" exact component={Activities} />
              <Route path="/activities/page/:page" component={Activities}/>
              <Route path="/activities/:id" exact component={ActivityDetail}/>

            </div>
            <Footer/>
          </div>



      )
    } else {
      return(
        <div className="App o-wrapper o-app">
          <div></div>

          <div className='o-content'>
            <Route path="/" exact component={Home} />
            <Route path="/activities" exact component={Home}/>
            <Route path="/activities/:id" exact component={ActivityDetail}/>
            <Route path="/handle_redirect" exact component={HandleRedirect}/>
          </div>
        </div>
      )

    }

  }
}

export default App;
