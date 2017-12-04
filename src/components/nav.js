import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink, Link} from 'react-router-dom';
import Login from '../views/login';
import {getCookie, deleteCookie} from '../components/cookieHelper'
import fire from './firebase'
import {IconBookmarkSolid} from '../components/icons/icons'

class Nav extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {},
    }
  }

  componentDidMount() {

    if(this.props.authState) {
      let userAccessToken = getCookie('access_token')

      fetch('https://www.strava.com/api/v3/athlete', {
        method: 'get',
        headers: {
          "content-type": "application/json",
          "authorization": "Bearer " + userAccessToken
        }
      }).then(function(response){
        return response.json();
      }).then( json => {
        this.setState({
          data: json,
        })
      })
    } else {
      // do nothing
    }
  }

  render() {

    if(this.props.type === 'private') {
      return (
        <div className="c-navigation">
          <ul className="c-navigation__nav o-flex o-flex-justify--space-between">
            <Link to="/">
              <h4 className="c-navigation__logo"><span aria-label="banana"  role="img">🍌</span> banana</h4>
            </Link>
            <div className="o-flex">
              {/* <NavLink className="c-navigation__nav-item" activeClassName="active" exact to="/myyear">
                <IconProgress/>
              </NavLink> */}
              <NavLink className="c-navigation__nav-item" activeClassName="active" exact to="/favourites">
                <IconBookmarkSolid />
                <div className="c-tooltip">Favourites</div>
              </NavLink>
            </div>
          </ul>
          <NavigationProfile data={this.state.data}/>
        </div>
      )
    } else {
      return (
        <div className="c-navigation">
          <NavLink activeClassName="active" exact to="/">
            <h4 className="c-navigation__logo"><span aria-label="banana"  role="img">🍌</span> banana</h4>
          </NavLink>
          <Login/>
        </div>
      )

    }

  }
}

class NavigationProfile extends Component {

  constructor() {
    super();
    this.state = {
      showDropdown: false
    }
  }


  logout = () => {
    deleteCookie('access_token');
    fire.auth().signOut().then(function() {
      // Sign-out successful.
      window.location.assign('/');
    }).catch(function(error) {
      // An error happened.
    });
  }

  showDropdown = () => {
    this.setState({
      showDropdown: !this.state.showDropdown
    })
  }

  setMapStyle = (mapStyle) => {
    let userPrefRef = fire.database().ref('users/strava:1105155/userPreference');

    console.log(userPrefRef);

    userPrefRef.set({
      mapStyle: mapStyle
    })

  }

  render() {
    return (
      <div className="c-navigation__profile">
        <a onClick={this.showDropdown}>
          <img className="c-navigation__profile-image" src={this.props.data.profile} alt=''/>
        </a>
        <ul className={this.state.showDropdown ? 'show c-navigation__dropdown' : 'c-navigation__dropdown'}>
          <li className="c-navigation__dropdown-info">
            <h3 className="c-navigation__dropdown-name">{this.props.data.firstname} {this.props.data.lastname}</h3>
            <h3 className="c-navigation__dropdown-location">{this.props.data.country}, {this.props.data.city}</h3>
          </li>
          <a onClick={this.logout}><li className="c-navigation__dropdown-link">Log Out</li></a>
          <a onClick={() => this.setMapStyle('dark')}><li className="c-navigation__dropdown-link">Dark Map</li></a>
        </ul>
      </div>
    )

  }
}

NavigationProfile.propTypes = {
  data: PropTypes.object
}

Nav.propTypes = {
  type: PropTypes.string
}

export default Nav;
