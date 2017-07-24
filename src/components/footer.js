import React from 'react';
import {IconStravaApi} from './icons/icons'

let assetSrc = ''

if(process.env.NODE_ENV === 'development'){
  assetSrc = '';
} else {
  assetSrc = '';
}

function Footer() {
  return(
    <footer className="c-footer">

        <IconStravaApi className="c-icon c-footer__power-by-strava"/>
        <span className="c-footer__credits">
          Made with <span aria-label="coffee" role="img">☕️</span> by <a className="c-link" href="https://jackylee.co">Jacky Lee</a>
        </span>

    </footer>
  )
}

export default Footer
