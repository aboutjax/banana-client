import React from 'react';

let assetSrc = ''

if(process.env.NODE_ENV === 'development'){
  assetSrc = '';
} else {
  assetSrc = '/banana';
}

function Footer() {
  return(
    <footer className="c-footer">

        <img className="c-footer__power-by-strava" src={ assetSrc + "/img/api_logo_pwrdBy_strava_horiz_white.svg"}/>
        <span>
          Made with ☕️ by Jacky Lee
        </span>

    </footer>
  )
}

export default Footer
