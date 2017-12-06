import React, { Component } from 'react';

class LoadingSpinner extends Component {
  componentDidMount(){
    let path = document.querySelector(".c-loader__svg-stroke");

    let pathLength = path.getTotalLength()

    path.style.strokeDasharray = pathLength
    path.style.strokeDashoffset = pathLength * 2
  }

  render(){
    return(
      <div className='c-loading_spinner-wrap'>
        <svg width="34px" height="30px" viewBox="0 0 34 30" version="2.0">
            <g stroke="#FFC236" fill="none" fillRule="evenodd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path className="c-loader__svg-stroke" d="M2 15 8 15 12.5 1.5 21.5 28.5 26 15 32 15"></path>
            </g>
        </svg>
      </div>
    )
  }
}

export default LoadingSpinner
