import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import GetUser from '../../Services/GetUser'

export const EditProfile = () => {
  const [userInfo, setUserInfo] = useState({})
  const [usersInfo, setUsersInfo] = useState({})
  const username = useRef()
  const password = useRef()

  useEffect(() => {
    GetUser().then((res) => {
      setUserInfo(res.data)
    })
  }, [])

  // handling all edits and update the profile
  const handleEdits = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    })
  }

  const sendEditedData = (e) => {
    e.preventDefault()

    const editedUser = {
      username: userInfo.username,
      avatar: userInfo.avatar,
      workplace: userInfo.workplace,
      address: userInfo.address,
      hobbies: userInfo.hobbies,
      bio: userInfo.bio,
      _id: userInfo._id,
    }

    axios
      .post('https://social-media-saeed2.onrender.com/api/edit', editedUser)
      .then(() => {
        location.replace('http://localhost:5173/home')
      })
      .catch((err) => console.log(err))
  }

  const deleteAccount = (e) => {
    e.preventDefault()

    axios
      .get(
        `https://social-media-saeed2.onrender.com/api/user/delete/${userInfo._id}`
      )
      .then((res) => {
        location.reload()
      })
      .catch((err) => console.log(err))
  }

  // Preview selected image
  function handleAddImg(e) {
    const file = e.target.files[0]

    if (!isValidImage(file)) {
      userInfo.image = ''
      return
    }

    generateImgPreview(file)
  }

  function generateImgPreview(file) {
    let reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onload = () => setUserInfo({ ...userInfo, avatar: reader.result })
  }

  // Validation image
  function isValidFileSize(file) {
    if (file.size > 1048576) {
      alert('Please upload an image smaller than 1MB')
    }
    return file.size < 1048576
  }

  function isValidImage(file) {
    let isValid = isValidFileSize(file) && isValidFileSize(file)
    return isValid
  }

  if (userInfo._id)
    return (
      <div
        className=''
        style={{ height: '85vh', display: 'flex', alignItems: 'center' }}
      >
        <form onSubmit={sendEditedData} className='edit-form'>
          <div className=''>
            <button
              type='button'
              onClick={(e) => e.currentTarget.childNodes[1].click()}
              style={{ borderRadius: 50, border: 'none' }}
            >
              <div
                className='edit-avatar'
                style={{
                  backgroundImage: `url(${userInfo.avatar})`,
                  backgroundSize: 'cover',
                  borderRightColor: '#f5f8fa',
                  backgroundPosition: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <h5
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.35)',
                    color: '#fff',
                    fontSize: '1.5rem',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    marginBottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  Edit avatar
                </h5>
              </div>
              <input
                className='edit-file-input'
                type='file'
                name='image'
                id='create-post-media'
                onInput={handleAddImg}
                accept='.png, .jpg, .jpeg, .gif'
              />
            </button>
          </div>
          <div className='input-group' style={{ width: '77%' }}>
            <label htmlFor='username' className='edit-input-label'>
              Username
            </label>
            <input
              className='edit-input'
              name='username'
              ref={username}
              type='text'
              onChange={handleEdits}
              value={userInfo.username}
              placeholder='Username'
            />
          </div>
          {/* 
          <div className="input-group" style={{ width: "77%" }}>
            <label htmlFor="password" className="edit-input-label">
              Password
            </label>
            <input
              className="edit-input"
              name="password"
              onChange={handleEdits}
              ref={password}
              value={userInfo.password}
              type="password"
              placeholder="Password"
            />
          </div> */}
          <div className='input-group' style={{ width: '77%' }}>
            <label htmlFor='workplace' className='edit-input-label'>
              Where do you work ?
            </label>
            <input
              className='edit-input'
              name='workplace'
              value={userInfo.workplace}
              onChange={handleEdits}
              type='text'
              placeholder='Work'
            />
          </div>
          <div className='input-group' style={{ width: '77%' }}>
            <label htmlFor='city' className='edit-input-label'>
              Where do you live (city) ?
            </label>
            <input
              className='edit-input'
              name='address'
              value={userInfo.address}
              onChange={handleEdits}
              type='text'
              placeholder='Address'
            />
          </div>

          <div className='input-group' style={{ width: '77%' }}>
            <label htmlFor='hobbies' className='edit-input-label'>
              What is your hobbies ?
            </label>
            <input
              className='edit-input'
              name='hobbies'
              value={userInfo.hobbies}
              onChange={handleEdits}
              type='text'
              placeholder='Hobbies'
            />
          </div>

          <div className='input-group' style={{ width: '77%' }}>
            <label htmlFor='bio' className='edit-input-label'>
              Bio for profile
            </label>

            <textarea
              style={{
                resize: 'none',
                padding: '10px 30px',
                width: '100%',
                height: '140px',
                backgroundColor: '#f5f8fa',
                borderRadius: '0.5rem',
                border: 'none',
              }}
              className='edit-input'
              name='bio'
              value={userInfo.bio}
              onChange={handleEdits}
              type='text'
              placeholder='Bio'
            ></textarea>
          </div>

          <div className='input-group' style={{ width: '77%' }}>
            <button className='edit-btn' type='submit'>
              Edit
            </button>
          </div>

          <div className='input-group' style={{ width: '77%' }}>
            <button
              className='delete-btn'
              onClick={deleteAccount}
              type='button'
            >
              Delete account
            </button>
          </div>
        </form>
      </div>
    )
}
