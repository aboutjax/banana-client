import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class Sidebar extends Component {
  render() {

    return (
      <div className="c-sidebar">
        <SidebarProfile firstname={this.props.data.firstname} lastname={this.props.data.lastname} imgUrl={this.props.data.profile} data={this.props.data}/>
        <ul className="c-sidebar__nav">
          <Navitem label="Home" link="/"/>
          <Navitem label="Activities" link="/activities"/>
          <Navitem label="Clubs" link="/clubs"/>
        </ul>
      </div>
    )
  }
}

class Navitem extends Component {
  render() {
    return (
      <li className="c-sidebar__nav-item">
        <NavLink exact to={this.props.link} activeClassName="active">
          {this.props.label}
        </NavLink>
      </li>
    )
  }
}

class SidebarProfile extends Component {

  render() {
    return (
      <div>
        <img className="c-sidebar__photo t-bottom-spacing--l" src={this.props.imgUrl} alt=""/>
        <h3 className="c-sidebar__name">{this.props.firstname} {this.props.lastname}</h3>
        <span className="c-sidebar__location">{this.props.data.city}, {this.props.data.country}</span>

      </div>
    )

  }
}

export default Sidebar;
