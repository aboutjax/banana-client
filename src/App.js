import React, {Component} from 'react';
import './index.css';
import {Route} from 'react-router-dom';
import fire from './components/firebase'

// Views
import Activities from './views/activities';
import Nav from './components/nav';
import HandleRedirect from './views/handleRedirect';
import ActivityDetail from './views/activityDetail';
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
    fire.auth().onAuthStateChanged(user => {
      if(user) {
        this.setState({ loggedIn: true })
      } else {
        this.setState({ loggedIn: false })
      }
    })
  }

  render(){
    if(this.state.loggedIn) {
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
