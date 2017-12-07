import React from 'react';

const IconBookmark = (props) => {
  return(
    <div className={props.className}>
      <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><title>bookmark</title><path d="M11 4H5v7l2.4-1.8c.356-.267.844-.267 1.2 0L11 11V4zm-3 7.25L4.6 13.8c-.66.494-1.6.024-1.6-.8V4c0-1.17.82-2 2-2h6c1.18 0 2 .83 2 2v9c0 .824-.94 1.294-1.6.8L8 11.25z" fill-rule="nonzero"/></svg>
    </div>
  )
}

const IconArrowRight = (props) => {
  return(
    <div className={props.className}>
      <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><title>arrow--right</title><path d="M9.586 9H4c-.552 0-1-.448-1-1s.448-1 1-1h5.586L7.293 4.707c-.39-.39-.39-1.024 0-1.414.39-.39 1.024-.39 1.414 0l4 4c.39.39.39 1.024 0 1.414l-4 4c-.39.39-1.024.39-1.414 0-.39-.39-.39-1.024 0-1.414L9.586 9z" fill-rule="nonzero" /></svg>
    </div>
  )
}

const IconArrowLeft = (props) => {
  return(
    <div className={props.className}>
      <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><title>arrow--left</title><path d="M6.414 9H12c.552 0 1-.448 1-1s-.448-1-1-1H6.414l2.293-2.293c.39-.39.39-1.024 0-1.414-.39-.39-1.024-.39-1.414 0l-4 4c-.39.39-.39 1.024 0 1.414l4 4c.39.39 1.024.39 1.414 0 .39-.39.39-1.024 0-1.414L6.414 9z" fill-rule="nonzero" /></svg>
    </div>
  )
}

const IconBookmarkSolid = (props) => {
  return(
    <div className={props.className}>
      <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><title>bookmark--solid</title><path d="M8 10.25L5.6 12.8c-.66.494-1.6.024-1.6-.8V5c0-1.17.82-2 2-2h4c1.18 0 2 .83 2 2v7c0 .824-.94 1.294-1.6.8L8 10.25z" fill-rule="nonzero"/></svg>
    </div>
  )
}

const IconCheckLine = (props) => {
  return(
    <div className={props.className}>
      <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><title>check--line</title><path d="M4.75 7.435c-.365-.414-.997-.454-1.41-.09-.416.366-.455.998-.09 1.412l3 3.404c.405.46 1.126.45 1.518-.02l5-6c.354-.424.296-1.055-.128-1.408-.424-.354-1.055-.296-1.408.128L6.98 9.963 4.75 7.435z" fill-rule="nonzero" /></svg>
    </div>
  )
}

const IconProgress = (props) => {
  return(
    <div className={props.className}>
      <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><title>progress</title><path d="M9.657 5H6c-.552 0-1-.448-1-1s.448-1 1-1h6c.276 0 .526.112.707.293.18.18.293.43.293.707v6c0 .552-.448 1-1 1s-1-.448-1-1V6.485l-6.55 6.55c-.39.39-1.024.39-1.414 0-.39-.39-.39-1.023 0-1.414L9.656 5z" fill-rule="evenodd"/></svg>
    </div>
  )
}

const IconCloud = (props) => {
  return(
    <div className={props.className}>
      <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><title>publish</title><path d="M14 8.578c0-1.423-1.205-2.593-2.703-2.54C10.712 4.836 9.457 4 8 4 6.056 4 4.472 5.48 4.36 7.347 3.14 7.1 2 8.003 2 9.214c0 1.938 2.087 1.908 2.087 1.908h7.565S14 10.824 14 8.578z" fill-rule="evenodd" stroke-linejoin="round"/></svg>
    </div>
  )
}

const IconDownload = (props) => {
  return(
    <div className={props.className}>
      <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><title>download</title><path d="M7 9.586V4c0-.552.448-1 1-1s1 .448 1 1v5.586l2.293-2.293c.39-.39 1.024-.39 1.414 0 .39.39.39 1.024 0 1.414l-4 4c-.39.39-1.024.39-1.414 0l-4-4c-.39-.39-.39-1.024 0-1.414.39-.39 1.024-.39 1.414 0L7 9.586z" fillRule="nonzero"/></svg>
    </div>
  )
}

const IconChart = (props) => {
  return(
    <div className={props.className}>
      <svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g fillRule="non-zero" id="Group" transform="translate(1.000000, 8.000000)">
            <path d="M21,16 C18.465,16 16.2945,14.3906667 15.8415,12.1733333 L15.5655,10.8173333 C15.492,10.4546667 15.762,10.1093333 16.17,10.0413333 C16.5555,9.976 16.9665,10.2146667 17.0415,10.5786667 L17.3175,11.9346667 C17.6415,13.5186667 19.1895,14.6666667 21,14.6666667 C21.414,14.6666667 21.75,14.9653333 21.75,15.3333333 C21.75,15.7013333 21.414,16 21,16 Z" id="Shape"></path>
            <path d="M1.5,16 C1.086,16 0.75,15.7013333 0.75,15.3333333 C0.75,14.9653333 1.086,14.6666667 1.5,14.6666667 C3.3105,14.6666667 4.8585,13.5186667 5.1825,11.9346667 L6.975,3.17333333 C7.35,1.33333333 9.15,0 11.25,0 C12.198,0 13.101,0.268 13.8615,0.777333333 C14.193,0.997333333 14.259,1.416 14.01,1.71066667 C13.761,2.00533333 13.293,2.06266667 12.96,1.84266667 C12.462,1.50933333 11.871,1.33333333 11.25,1.33333333 C9.8745,1.33333333 8.6985,2.20666667 8.4525,3.41066667 L6.6585,12.1733333 C6.2055,14.3906667 4.035,16 1.5,16 Z" id="Shape"></path>
            <path d="M28.5,16 C25.965,16 23.7945,14.3906667 23.34,12.1733333 L21.5475,3.41066667 C21.3015,2.20666667 20.1255,1.33333333 18.75,1.33333333 C17.3745,1.33333333 16.1985,2.20666667 15.9525,3.41066667 L14.16,12.1733333 C13.7055,14.3906667 11.535,16 9,16 C8.586,16 8.25,15.7013333 8.25,15.3333333 C8.25,14.9653333 8.586,14.6666667 9,14.6666667 C10.8105,14.6666667 12.3585,13.5186667 12.6825,11.9346667 L14.475,3.17333333 C14.85,1.33333333 16.65,0 18.75,0 C20.85,0 22.65,1.33333333 23.025,3.172 L24.8175,11.9333333 C25.1415,13.5186667 26.6895,14.6666667 28.5,14.6666667 C28.914,14.6666667 29.25,14.9653333 29.25,15.3333333 C29.25,15.7013333 28.914,16 28.5,16 Z" id="Shape"></path>
        </g>
      </svg>
    </div>
  )
}

export {IconBookmark, IconArrowLeft, IconArrowRight, IconBookmarkSolid, IconCheckLine,IconProgress, IconCloud, IconDownload, IconChart}
