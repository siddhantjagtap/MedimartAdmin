import React from 'react'
import loadinggif from '../assets/282.gif'

const Loading = () => {
  return (
    <div className="flex gap-4 p-4 flex-wrap justify-center">
    <img src={loadinggif} alt="Loading icon" />
  </div>
  )
}

export default Loading
