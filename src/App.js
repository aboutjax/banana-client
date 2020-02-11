import React, { Component } from "react";
import "./index.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { fire } from "./components/firebase";
import { getCookie } from "./components/cookieHelper";

// Views
import Activities from "./views/activities";
import Nav from "./components/nav";
import HandleRedirect from "./views/handleRedirect";
import ActivityDetail from "./views/activityDetail";
import PublicActivityDetail from "./views/publicActivityDetail";
import FavouriteActivities from "./views/favouriteActivities";
import MyYear from "./views/yearToDate";
import Home from "./views/home";
import Footer from "./components/footer";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      userMeasurementPreference: null
    };
  }

  componentDidMount() {
    let userAccessToken = getCookie("access_token");
    let accessTokenExpiresAt = getCookie("token_expires_at");
    let refreshToken = getCookie("refresh_token");

    let currentTime = Date.now() / 1000;

    if (!userAccessToken && !accessTokenExpiresAt && !refreshToken) {
    } else if (!userAccessToken) {
      console.log("fetch token");
      this.setState({ loggedIn: false });
    } else if (parseInt(accessTokenExpiresAt) < currentTime) {
      console.log("refresh token");
      this.setState({ loggedIn: false });
    } else {
      console.log("access token exists, fetch data");
      this.setState({ loggedIn: true });
    }

    fire.auth().onAuthStateChanged(user => {
      if (user && userAccessToken) {
        this.setState({
          loggedIn: true,
          userUid: user.uid
        });
      } else {
        this.setState({ loggedIn: false });
      }
    });

    // fetch('https://www.strava.com/api/v3/athlete', {
    //   method: 'get',
    //   headers: {
    //     "content-type": "application/json",
    //     "authorization": "Bearer " + userAccessToken
    //   }
    // }).then(function(response){
    //   return response.json();
    // }).then( json => {
    //   this.setState({
    //     userMeasurementPreference: json.measurement_preference
    //   })
    // })
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <div className="App o-app">
          <Nav type="private" authState={this.state.loggedIn} />

          <div className="o-content">
            <Switch>
              <Route path="/handle_redirect" exact component={HandleRedirect} />
              <Route
                path="/year-review"
                render={routeProps => (
                  <MyYear {...routeProps} userUid={this.state.userUid} />
                )}
              />
              <Route path="/activities/page/:page" component={Activities} />
              <Route
                path="/activities/:id"
                exact
                render={routeProps => (
                  <ActivityDetail
                    {...routeProps}
                    userUid={this.state.userUid}
                  />
                )}
              />
              <Route
                path="/public/:athleteUID/:activity"
                exact
                component={PublicActivityDetail}
              />
              <Route
                path="/favourites"
                render={routeProps => (
                  <FavouriteActivities
                    {...routeProps}
                    userUid={this.state.userUid}
                  />
                )}
              />
              <Route
                path="/"
                exact
                render={routeProps => (
                  <Activities {...routeProps} userUid={this.state.userUid} />
                )}
              />
              <Route component={NoMatch} />
            </Switch>
          </div>
          <Footer />
        </div>
      );
    } else {
      return (
        <div className="App o-wrapper o-app">
          <div>
            {/* <Nav type="public" authState={this.state.loggedIn}/> */}
          </div>

          <div className="o-content">
            <Switch>
              <Route path="/activities/page/:page" component={Activities} />
              <Route path="/2017review" component={NoMatch} />
              <Route path="/handle_redirect" exact component={HandleRedirect} />
              <Route path="/favourites" exact component={Home} />
              <Route
                path="/public/:athleteUID/:activity"
                exact
                component={PublicActivityDetail}
              />
              <Route path="/" exact component={Home} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </div>
      );
    }
  }
}

function NoMatch() {
  return <Redirect to="/" />;
}

export default App;
