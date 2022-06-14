import React from 'react'

function Loading({ center }) {
  // eslint-disable-next-line react/self-closing-comp
  return <div className={center ? 'loading loading-center' : 'loading'}></div>
}

export default Loading
