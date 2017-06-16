import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

class Sidebar extends Component {

  constructor() {
    super();
    this.state = {
      data: {},
    }
  }

  logout = () => {
    localStorage.removeItem('access_token')
    window.location.reload()
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
      <div className="c-sidebar">
        <SidebarProfile firstname={this.state.data.firstname} lastname={this.state.data.lastname} imgUrl={this.state.data.profile} data={this.state.data}/>
        <ul className="c-sidebar__nav">
          <li className="c-sidebar__nav-item">
            <NavLink activeClassName="active" exact to="/">Home</NavLink>
          </li>
          <li className="c-sidebar__nav-item">
            <NavLink activeClassName="active" to="/activities">Activities</NavLink>
          </li>
          <li className="c-sidebar__nav-item c-sidebar__nav-item--logout">
            <a href="#" onClick={this.logout}>Log Out</a>
          </li>
        </ul>
      </div>
    )
  }
}

class SidebarProfile extends Component {

  render() {
    return (
      <div>
        <img className="c-sidebar__photo t-bottom-spacing" src={this.props.imgUrl ? this.props.imgUrl : "http://placehold.it/50/ffffff/ffffff"} alt=""/>
        <h3 className="c-sidebar__name">{this.props.firstname} {this.props.lastname}</h3>
        <span className="c-sidebar__location">{this.props.data.city}, {this.props.data.country}</span>

      </div>
    )

  }
}

export default Sidebar;
