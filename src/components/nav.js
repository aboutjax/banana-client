import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

class Nav extends Component {

  constructor() {
    super();
    this.state = {
      data: {},
    }
  }

  componentWillMount() {

    let userAccessToken = localStorage.getItem('access_token')

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
  }

  render() {

    return (
      <div className="c-navigation">
        <ul className="c-navigation__nav">
          <li className="c-navigation__nav-item">
            <NavLink activeClassName="active" exact to="/">Home</NavLink>
          </li>
        </ul>
        <NavigationProfile data={this.state.data}/>
      </div>
    )
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
    localStorage.removeItem('access_token')
    window.location.reload()
  }

  showDropdown = () => {
    this.setState({
      showDropdown: !this.state.showDropdown
    })
  }

  render() {
    return (
      <div className="c-navigation__profile">
        <a href="#" onClick={this.showDropdown}>
          <img className="c-navigation__profile-image" src={this.props.data.profile} alt=''/>
        </a>
          <ul className={this.state.showDropdown ? 'show c-navigation__dropdown' : 'c-navigation__dropdown'}>
            <li className="c-navigation__dropdown-info">
              <h3 className="c-navigation__dropdown-name">{this.props.data.firstname} {this.props.data.lastname}</h3>
              <h3 className="c-navigation__dropdown-location">{this.props.data.country}, {this.props.data.city}</h3>
            </li>
            <a href="#" onClick={this.logout}><li className="c-navigation__dropdown-link">Log Out</li></a>
          </ul>
      </div>
    )

  }
}

export default Nav;
