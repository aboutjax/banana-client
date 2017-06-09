import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class Pagination extends Component {
  componentWillMount() {
    this.props.onChangePage(pageOfItems)
  }
    render(){

      let pager = this.props.pager

      if(pager.isLastPage) {
        return(
          <div>
            <Link onClick= to={"/activities/page/2"}>Previous</Link>
          </div>
        )
      } else {
        return(
          <div>
            <Link to={"/activities/page/3"}>Next</Link>
          </div>
        )
      }
    }
}

export default Pagination;
