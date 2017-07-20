import React from 'react';
import Login from '../views/login';

let assetSrc = ''

if(process.env.NODE_ENV === 'development'){
  assetSrc = '';
} else {
  assetSrc = '';
}

function Homepage() {
  return(
    <div className="c-homepage">

        <div className="c-homepage__hero-message">
          <div>
            <h1 className="c-homepage__hero-header"><span aria-label="banana"  role="img">🍌</span></h1>
            <h1 className="c-homepage__hero-header">
              <span className="c-homepage__logo__emoji">banana</span>
            </h1>
            <p className="c-homepage__hero-subheader">Visualize your Strava activities.</p>
            <Login />
          </div>
        </div>
        <div className="c-homepage__hero-image">
          <img className="c-homepage__hero-image__image" alt="" src={ assetSrc + "/img/hero_image-min.png"}/>
        </div>

    </div>
  )
}

export default Homepage
