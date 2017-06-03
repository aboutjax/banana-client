import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


class Sidebar extends Component {
  render(){

    return(
      <ul className="c-sidebar">
        <Navitem label="Home" link="/" />
        <Navitem label="Activities" link="/activities" />
        <Navitem label="Clubs" link="/clubs" />
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
