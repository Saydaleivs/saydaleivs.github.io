import React, { useEffect, useState } from 'react'
import { AboutBox } from './AboutBox'
import GetUser from '../Services/GetUser'
import { useNavigate } from 'react-router-dom'

const SideProfile = ({ sendDataToParent }) => {
  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useState({
    name: 'Loading...',
    username: 'guest',
    followers: [],
    followings: [],
    avatar:
      'https://www.nicepng.com/png/full/136-1366211_group-of-10-guys-login-user-icon-png.png',
  })

  useEffect(() => {
    GetUser()
      .then((res) => {
        setUserInfo(res.data)
      })
      .catch((ex) => console.log(ex))
  }, [])

  return (
    <div className='col-12 col-lg-3'>
      <div className='left-column'>
        <div className='card card-left1 mb-4'>
          <div className='card-body text-center '>
            <img
              style={{
                objectFit: 'cover',
                background: '#fff',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/profile')}
              src={userInfo.avatar}
              width='120px'
              height='120px'
              className='rounded-circle mt-n5'
            />
            <h5 className='card-title mt-2'>{userInfo.name}</h5>
            <h6 color='#333' className='card-title mt-2'>
              {`@${userInfo.username}`}
            </h6>
            <p className='card-text text-justify mb-2'>{userInfo.bio}</p>
            <ul className='list-unstyled nav justify-content-around'>
              <a href='#' className='text-dark text-decoration-none'>
                <li className='nav-item'>
                  Followers <br /> <strong>{userInfo.followers.length}</strong>
                </li>
              </a>
              <a href='#' className='text-dark text-decoration-none'>
                <li className='nav-item '>
                  Following <br /> <strong>{userInfo.followings.length}</strong>
                </li>
              </a>
            </ul>
          </div>
        </div>

        <AboutBox
          workplace={userInfo.workplace}
          address={userInfo.address}
          hobbies={userInfo.hobbies}
        />

        <button
          style={{
            width: '100%',
            border: '1px solid #333',
            height: '35px',
            backgroundColor: '#0d6efd',
            color: '#fff',
            border: 'none',
          }}
          onClick={() => {
            navigate('/editProfile')
          }}
        >
          Edit Profile
        </button>
      </div>
    </div>
  )
}

export default SideProfile
