import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class Pagination extends Component {
  constructor(props){
    super(props);
    this.state = {
      activities: props.activitiesOnThisPage,
      currentPage: Number(props.match.params.page),
      activitesPerPage: 30,
      nextPage: Number(props.match.params.page) + 1,
    };
  }

  componentWillReceiveProps(){
    this.setState({
      nextPage: Number(this.props.match.params.page) + 1
    })
  }

  render(){
    const { actvities, currentPage, activitesPerPage, nextPage } = this.state;

    return(
      <div>
        <span>Next Page {nextPage}</span>
        <Link to={'/activities/page/' + nextPage}>Next Page {nextPage}</Link>
      </div>
    )
  }

}

export default Pagination;
