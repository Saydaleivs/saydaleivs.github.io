import React from 'react'
import SideProfile from '../Components/SideProfile'
import Post from '../Components/Post/Post'
import Recommendations from '../Components/Recommendations'
import { Loader } from '../Components/Loader'

export const MainPage = () => {
  return (
    <>
      <div className='container'>
        <div className='row' style={{ justifyContent: 'center' }}>
          <SideProfile />
          {/* <Post />
          <Recommendations /> */}
        </div>
      </div>
    </>
  )
}
