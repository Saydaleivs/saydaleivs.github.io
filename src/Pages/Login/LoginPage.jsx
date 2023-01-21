import React, { useRef, useState } from 'react'
import {} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const LoginPage = () => {
  const navigate = useNavigate()
  const container = useRef()

  const [userLoginInfo, setUserLoginInfo] = useState({
    username: '',
    password: '',
  })

  const [userSignupInfo, setUserSignupInfo] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  // Sending Login and Signup info to server
  const sendingSignup = async (e) => {
    e.preventDefault()

    if (userSignupInfo.password === userSignupInfo.confirmPassword) {
      delete userSignupInfo.confirmPassword
      await axios
        .post(
          'https://social-media-saeed2.onrender.com/api/user/register',
          userSignupInfo
        )
        .then((res) => {
          document.cookie = res.data.token
          localStorage.setItem('userID', res.data.userId)
          navigate('/editProfile')
          location.reload()
        })
        .catch((err) => {
          if (err.response.data.code === 11000)
            alert('This email has already been used')

          alert(err.response.data)
          console.log(err.response.data)
        })

      setUserSignupInfo({
        ...userSignupInfo,
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
    } else {
      alert('Confirm password correctly please!!!!')
    }
  }

  const sendingLogin = async (e) => {
    e.preventDefault()

    await axios
      .post(
        'https://social-media-saeed2.onrender.com/api/user/login',
        userLoginInfo
      )
      .then((res) => {
        document.cookie = res.data.token
        localStorage.setItem('userID', res.data.userId)
        navigate('/home')
        location.reload()
      })
      .catch((err) => {
        setUserLoginInfo({
          ...userLoginInfo,
          password: '',
        })
        alert(err.response.data)
      })
  }

  // Handle functions help us to handle input when it changes
  const handleLoginChange = (e) => {
    const value = e.target.value
    setUserLoginInfo({
      ...userLoginInfo,
      [e.target.name]: value,
    })
  }

  const handleSignupChange = (e) => {
    const value = e.target.value
    setUserSignupInfo({
      ...userSignupInfo,
      [e.target.name]: value,
    })
  }

  // Animations
  const toggle = () => {
    container.current.classList.toggle('sign-in')
    container.current.classList.toggle('sign-up')
  }
  setTimeout(() => {
    container.current.classList.add('sign-in')
  }, 200)

  return (
    <div id='container' ref={container} className='wrapper'>
      <div className='row'>
        <div className='col align-items-center flex-col sign-up'>
          <div className='form-wrapper align-items-center'>
            <div className='form sign-up'>
              <form action='' onSubmit={sendingSignup}>
                <div className='input-group'>
                  <i className='bx bxs-user'></i>
                  <input
                    type='text'
                    name='name'
                    placeholder='Name'
                    value={userSignupInfo.name}
                    onChange={handleSignupChange}
                    required
                  />
                </div>
                <div className='input-group'>
                  <i className='bx bxs-user'></i>
                  <input
                    type='text'
                    name='username'
                    placeholder='Username'
                    value={userSignupInfo.username}
                    onChange={handleSignupChange}
                    required
                  />
                </div>
                {/*  */}

                {/*  */}
                <div className='input-group'>
                  <i className='bx bx-mail-send'></i>
                  <input
                    type='email'
                    name='email'
                    value={userSignupInfo.email}
                    onChange={handleSignupChange}
                    placeholder='Email'
                    pattern='^[-+.\w]{1,64}@[-.\w]{1,64}\.[-.\w]{2,6}$'
                    required
                  />
                </div>
                <div className='input-group'>
                  <i className='bx bxs-lock-alt'></i>
                  <input
                    type='password'
                    name='password'
                    value={userSignupInfo.password}
                    onChange={handleSignupChange}
                    placeholder='Password'
                    required
                  />
                </div>
                <div className='input-group'>
                  <i className='bx bxs-lock-alt'></i>
                  <input
                    type='password'
                    name='confirmPassword'
                    value={userSignupInfo.confirmPassword}
                    onChange={handleSignupChange}
                    placeholder='Confirm password'
                    required
                  />
                </div>
                <button type='submit'>Sign up</button>
              </form>
              <p>
                <span>Already have an account? </span>
                <b onClick={toggle} className='pointer'>
                  Sign in here
                </b>
              </p>
            </div>
          </div>
        </div>
        <div className='col align-items-center flex-col sign-in'>
          <div className='form-wrapper align-items-center'>
            <div className='form sign-in'>
              <form action=''>
                <div className='input-group'>
                  <i className='bx bxs-user'></i>
                  <input
                    name='username'
                    value={userLoginInfo.username}
                    onChange={handleLoginChange}
                    type='text'
                    placeholder='Username'
                  />
                </div>
                <div className='input-group'>
                  <i className='bx bxs-lock-alt'></i>
                  <input
                    name='password'
                    value={userLoginInfo.password}
                    onChange={handleLoginChange}
                    type='password'
                    placeholder='Password'
                  />
                </div>
                <button onClick={sendingLogin}>Sign in</button>
              </form>
              <p>
                <span>Don't have an account ? </span>
                <b onClick={toggle} className='pointer'>
                  Sign up here
                </b>
              </p>
            </div>
          </div>
          <div className='form-wrapper'></div>
        </div>
      </div>
      <div className='row content-row'>
        <div className='col align-items-center flex-col'>
          <div className='text sign-in'>
            <h2>Welcome User!</h2>
          </div>
          <div className='img sign-in'></div>
        </div>
        <div className='col align-items-center flex-col'>
          <div className='img sign-up'></div>
          <div className='text sign-up'>
            <h2>Join with us</h2>
          </div>
        </div>
      </div>
    </div>
  )
}
