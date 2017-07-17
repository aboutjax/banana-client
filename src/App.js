import React, {Component} from 'react';
import './index.css';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import fire from './components/firebase'
import {getCookie} from './components/cookieHelper'

// Views
import Activities from './views/activities';
import Nav from './components/nav';
import HandleRedirect from './views/handleRedirect';
import ActivityDetail from './views/activityDetail';
import FavouriteActivities from './views/favouriteActivities';
import MyYear from './views/yearToDate';
import Home from './views/home';
import Footer from './components/footer';

class App extends Component {

  constructor() {
    super();
    this.state = {
      loggedIn: false
    }
  }

  componentDidMount() {
    let userAccessToken = getCookie('access_token')

    fire.auth().onAuthStateChanged(user => {
      if(user && userAccessToken) {
        this.setState({
           loggedIn: true,
           userUid: user.uid
         })
      } else {
        this.setState({ loggedIn: false })
      }
    })
  }

  render(){
    if(this.state.loggedIn) {
      return(

          <div className="App o-wrapper o-app">
            <Nav type="private" authState={this.state.loggedIn}/>

            <div className='o-content'>

              <Switch>
                <Route path="/handle_redirect" exact component={HandleRedirect}/>
                <Route path='/' exact render={routeProps => <Activities {...routeProps} userUid={this.state.userUid}/>} />
                <Route path="/activities/page/:page" component={Activities}/>
                <Route path='/activities/:id' exact render={routeProps => <ActivityDetail {...routeProps} userUid={this.state.userUid}/>} />
                <Route path='/favourites' render={routeProps => <FavouriteActivities {...routeProps} userUid={this.state.userUid}/>} />
                <Route path='/myyear' render={routeProps => <MyYear {...routeProps} userUid={this.state.userUid}/>} />
                <Route component={NoMatch}/>
              </Switch>

            </div>
            <Footer/>
          </div>



      )
    } else {
      return(
        <div className="App o-wrapper o-app">
          <div>
            {/* <Nav type="public" authState={this.state.loggedIn}/> */}
          </div>

          <div className='o-content'>
              <Route path="/" exact component={Home} />
              <Route path="/handle_redirect" exact component={HandleRedirect}/>
              <Route path="/favourites" exact component={Home}/>
          </div>
        </div>
      )

    }

  }
}

function NoMatch() {
  return <Redirect to="/" />
}

export default App;
