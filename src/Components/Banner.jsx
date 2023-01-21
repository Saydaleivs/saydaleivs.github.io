import React from 'react'
import avatar from '../assets/Images/avatar-dhg.png'

const Banner = (props) => {
  return (
    <div className='banner'>
      <div className='banner-title d-flex flex-column justify-content-center align-items-center'>
        <img
          style={{ objectFit: 'cover', background: '#fff' }}
          src={props.avatar}
          alt='img'
          className='rounded-circle'
          width='80px'
          height='80px'
        />
        <h3 className='text-light'>{props.name}</h3>
        <h6 color='#333' className='text-light'>
          @{props.username}
        </h6>
        <p className='text-light'>{props.bio}</p>
        <ul
          className='list-unstyled nav justify-content-between'
          style={{ width: 150 }}
        >
          <a href='#' className='text-dark text-decoration-none'>
            <li style={{ color: '#fff' }} className='nav-item'>
              Followers <br /> <strong>{props.followers}</strong>
            </li>
          </a>
          <a href='#' className='text-dark text-decoration-none'>
            <li style={{ color: '#fff' }} className='nav-item '>
              Following <br /> <strong>{props.followings}</strong>
            </li>
          </a>
        </ul>
      </div>
    </div>
  )
}

export default Banner
