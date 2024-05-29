import React from 'react'
import loadinggif from '../assets/282.gif'

const Loading = () => {
  return (
    <div className="flex gap-4 p-4 flex-wrap justify-center">
    {/* <img className="w-10 h-20 animate-spin" src="https://www.svgrepo.com/show/491270/loading-spinner.svg" alt="Loading icon" /> */}
    <img className="" src={loadinggif} alt="Loading icon" />
  </div>
  )
}

export default Loading
