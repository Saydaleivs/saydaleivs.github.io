import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainPage } from './Pages/MainPage'
import { EditProfile } from './Pages/EditProfile/EditProfile'
import { MyProfile } from './Pages/MyProfile/MyProfile'
import { Profile } from './Pages/Profile/Profile'
import TheNavbar from './Components/TheNavbar'
import { LoginPage } from './Pages/Login/LoginPage'
import axios from 'axios'
import './assets/Styles/Styles.css'
import { ShowLikers } from './Components/ShowLikers'
import { Users } from './Pages/Users/Users'

export const App = () => {
  const [userState, setUserState] = useState(false)

  function checkUser() {
    if (!document.cookie) {
      return
    }
    return axios
      .get('https://social-media-saeed2.onrender.com/api/user/check', {
        headers: {
          token: document.cookie,
        },
      })
      .then(() => {
        setUserState(true)
      })
      .catch((err) => {
        // console.log(err)
        setUserState(false)
      })
  }

  useEffect(() => {
    checkUser()
  }, [])

  // document.onvisibilitychange = function () {
  //   if (document.visibilityState === 'hidden') {
  //     axios.get('https://social-media-saeed2.onrender.com/api/user/left', {
  //       headers: {
  //         token: document.cookie,
  //       },
  //     })
  //   } else {
  //     axios.get('https://social-media-saeed2.onrender.com/api/user/online', {
  //       headers: {
  //         token: document.cookie,
  //       },
  //     })
  //   }
  // }

  return (
    <>
      {userState ? (
        <BrowserRouter>
          <TheNavbar />
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/home' element={<MainPage />} />
            <Route path='/profile' element={<MyProfile />} />
            <Route path='/editProfile' element={<EditProfile />} />
            <Route path='/users' element={<Users />} />
            <Route path='/:id' element={<Profile />} />
            <Route path='/post/:id' element={<ShowLikers />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      )}
    </>
  )
}
