import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import logo from '../assets/Images/brand-white.png'
import avatar from '../assets/Images/avatar-dhg.png'
import GetUser from '../Services/GetUser'
import { useEffect } from 'react'
import axios from 'axios'

const TheNavbar = () => {
  const [user, setUser] = useState({})
  useEffect(() => {
    GetUser().then((user) => {
      setUser(user.data)
    })
  }, [])

  const loggedOut = () => {
    localStorage.clear()
    document.cookie = 'empty'
    location.reload()
    // axios.get('https://social-media-saeed2.onrender.com/api/user/left', {
    //   headers: {
    //     token: document.cookie,
    //   },
    // })
  }

  return (
    <nav
      className='navbar navbar-expand-md navbar-dark mb-4'
      style={{ backgroundColor: '#3097D1', padding: '0 22px' }}
    >
      <Link to='/home'>
        <img
          src={logo}
          alt='logo'
          className='img-fluid'
          width='80px'
          height='100px'
        />
      </Link>

      <button
        className='navbar-toggler'
        data-toggle='collapse'
        data-target='#responsive'
      >
        <span className='navbar-toggler-icon'></span>
      </button>

      <div
        className='collapse navbar-collapse'
        id='responsive'
        style={{ justifyContent: 'space-between' }}
      >
        <div>
          <ul className='navbar-nav mr-auto text-capitalize'>
            <li className='nav-item'>
              <Link to='/home' className='nav-link active'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/profile' className='nav-link'>
                Profile
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/editProfile' className='nav-link'>
                Edit Profile
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/users' className='nav-link'>
                Users
              </Link>
            </li>

            <li className='nav-item'>
              <a href='#' className='nav-link d-md-none'>
                Growl
              </a>
            </li>
            <li className='nav-item'>
              <a href='#' className='nav-link d-md-none'>
                Logout
              </a>
            </li>
          </ul>
        </div>

        <div
          className='d-flex align-items-center justify-content-between'
          style={{ width: '240px' }}
        >
          <Link
            className='login-trigger'
            href='#'
            data-target='#login'
            data-toggle='modal'
            to='/login'
            onClick={loggedOut}
          >
            Sign out
          </Link>
          <FontAwesomeIcon icon={faBell} size='lg' color='white' />
          <Link to='/profile'>
            <img
              style={{ cursor: 'pointer', objectFit: 'cover' }}
              src={user.avatar}
              alt=''
              className='rounded-circle ml-3 d-none d-md-block'
              width='32px'
              height='32px'
            />
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default TheNavbar
