import React, { useState } from 'react'
import right1 from '../assets/Images/right1.jpg'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import GetAllUsers from '../Services/GetAllUsers'
import axios from 'axios'

const Recommendations = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [usersLimit, setUsersLimit] = useState(2)

  useEffect(() => {
    GetAllUsers(0).then((res) => {
      res.data.length = usersLimit
      setUsers(res.data)
    })
  }, [])

  const followUser = (e) => {
    if (e.target.textContent === 'Follow') {
      e.target.textContent = 'Following'
    } else {
      e.target.textContent = 'Follow'
    }
  }

  return (
    <div className='col-12 col-lg-3'>
      <div className='right-column'>
        <div className='card shadow-sm mb-4'>
          <div className='card-body'>
            <h6 className='card-title'>Sponsored</h6>
            <img src={right1} alt='card-img' className='card-img mb-3' />
            <p className='card-text text-justify'>
              {' '}
              <span className='h6'>
                It might be time to visit Iceland.
              </span>{' '}
              Iceland is so chill, and everything looks cool here. Also, we
              heard the people are pretty nice. What are you waiting for?
            </p>
            <a href='#' className='btn btn-outline-info card-link btn-sm'>
              Buy a ticket
            </a>
          </div>
        </div>

        <div className='card shadow-sm mb-4'>
          <div className='card-body'>
            {users.map((user) => (
              <div
                key={user._id}
                className='users-wrapper d-flex align-items-center justify-content-between mb-4'
              >
                <div className='d-flex align-items-center'>
                  <img
                    width='80px'
                    height='80px'
                    className='rounded-circle'
                    style={{
                      objectFit: 'cover',
                      cursor: 'pointer',
                      marginRight: 10,
                    }}
                    src={user.avatar}
                    alt=''
                    onClick={() => {
                      navigate(`/${user.username}`)
                    }}
                  />

                  <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      navigate(`/${user.username}`)
                    }}
                  >
                    <h6>{user.name}</h6>
                    <p>@{user.username}</p>
                  </div>
                </div>
                <button
                  id={user.id}
                  onClick={followUser}
                  className='btn btn-outline-info  btn-sm'
                >
                  Follow
                </button>
              </div>
            ))}
          </div>

          <div className='card-footer'>
            <p className='lead' style={{ fontSize: '18px' }}>
              Users of this website
            </p>
          </div>
        </div>

        <div className='card shadow-sm'>
          <div className='card-body'>
            <p>
              &copy; 2022 CopyRight <br />
              Developed by <a href='https://t.me/saydaleivs'>Saeed</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Recommendations
