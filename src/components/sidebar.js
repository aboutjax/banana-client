import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


class Sidebar extends Component {
  render(){
    let authUrl = (process.env.REACT_APP_SERVER_URL || "https://strava-auth.herokuapp.com")

    return(
      <ul className="c-sidebar">
        <Navitem label="Home" link="/" />
        <Navitem label="Clubs" link="/clubs" />
        <Navitem label="Activities" link="/activities" />
        <li className='c-sidebar__nav-item'><a href={authUrl}>Log In With Strava</a></li>
      </ul>
    )
  }
}

class Navitem extends Component {
  render() {
    return(
      <li className="c-sidebar__nav-item"><NavLink exact to={this.props.link} activeClassName="active"> {this.props.label} </NavLink></li>
    )
  }
}


export default Sidebar;
