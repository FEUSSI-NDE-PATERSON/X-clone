import React from 'react'
import Sidebar from '../components/Sidebar'
import Tweets from '../components/Tweets'
import Ex from '../components/Ex'

function Explore() {
  return (
    <div className=' relative flex bg-black'>
          <Sidebar />
          <Ex />
          <Tweets />
    </div>
  )
}

export default Explore