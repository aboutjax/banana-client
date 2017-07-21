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
      <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><title>download</title><path d="M7 9.586V4c0-.552.448-1 1-1s1 .448 1 1v5.586l2.293-2.293c.39-.39 1.024-.39 1.414 0 .39.39.39 1.024 0 1.414l-4 4c-.39.39-1.024.39-1.414 0l-4-4c-.39-.39-.39-1.024 0-1.414.39-.39 1.024-.39 1.414 0L7 9.586z" fill-rule="nonzero"/></svg>
    </div>
  )
}

export {IconBookmark, IconArrowLeft, IconArrowRight, IconBookmarkSolid, IconCheckLine,IconProgress, IconCloud, IconDownload}
