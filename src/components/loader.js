import React, { Component } from "react";

class LoadingSpinner extends Component {
  componentDidMount() {
    let path = document.querySelector(".c-loader__svg-stroke");

    let pathLength = path.getTotalLength();

    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength * 2;
  }

  render() {
    return (
      <div className="c-loading_spinner-wrap">
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="c-loader__svg-stroke"
            d="M14 2C7.37258 2 2 7.37258 2 14C2 20.6274 7.37258 26 14 26C20.6274 26 26 20.6274 26 14C26 10.6249 24.6066 7.57515 22.3636 5.39478"
            stroke="#FFC236"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }
}

export default LoadingSpinner;
