import React from 'react';
import _ from 'lodash';
import LoadingSpinner from '../components/loader'
import Login from '../views/login';

function Homepage() {
  return(
    <div className="c-homepage">

        <div className="c-homepage__hero-message">
          <div>
            <h1 className="c-homepage__hero-header">🍌</h1>
            <h1 className="c-homepage__hero-header">
              <span className="c-homepage__logo__emoji">banana</span>
            </h1>
            <p>Visualize your Strava activities.</p>
            <Login />
          </div>
        </div>
        <div className="c-homepage__hero-image">
          <img className="c-homepage__hero-image__image" src="/img/hero_image.png"/>
        </div>

    </div>
  )
}

export default Homepage
