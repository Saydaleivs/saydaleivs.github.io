import axios from 'axios'
import React, { useState, useRef } from 'react'

export const PublishPost = () => {
  const mediaContainer = useRef()
  const userId = localStorage.getItem('userID')

  const [postData, setPostData] = useState({
    date: new Date().toLocaleString([], {
      timeStyle: 'short',
      dateStyle: 'medium',
    }),
    description: '',
    image: '',
    authorId: userId,
  })

  const sendPostData = async (e) => {
    e.preventDefault()
    try {
      axios
        .post('https://social-media-saeed2.onrender.com/api/posts', postData)
        .then(() => {
          location.reload()
        })
        .catch((err) => console.log(err))
    } catch (err) {
      console.log(err)
    } finally {
      setPostData({
        ...postData,
        image: '',
        description: '',
      })
    }
  }

  const handleChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    })
  }

  function generateImgPreview(file) {
    let reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onload = () => setPostData({ ...postData, image: reader.result })
  }

  function removeCreatePostImg() {
    setPostData({ ...postData, image: '' })
  }

  function handleAddImg(e) {
    const file = e.target.files[0]

    if (!isValidImage(file)) {
      postData.image = ''
      return
    }

    generateImgPreview(file)
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

  return (
    <div className='middle-column'>
      <div className='card'>
        <form
          id='create-post-form'
          className='create-post__form'
          onSubmit={sendPostData}
        >
          <div className='create-post__text-wrap'>
            <textarea
              aria-label='Write something about you...'
              name='description'
              style={{ outline: 'none' }}
              id='create-post-txt'
              onInput={(e) => {
                e.target.parentNode.dataset.replicatedValue = e.target.value
              }}
              onChange={handleChange}
              value={postData.description}
              placeholder='Write something about you...'
            ></textarea>
          </div>
          <div
            ref={mediaContainer}
            className='create-post__media-wrap'
            id='create-post-media-wrap'
          >
            <figure className='create-post__media-item'>
              <button
                type='button'
                style={{
                  display: postData.image === '' ? 'none' : 'inline-block',
                  width: '15px',
                  height: '15px',
                  backgroundImage:
                    'url(https://raw.githubusercontent.com/Javieer57/create-post-component/43c8008a45b699957d2070cc23362f1953c65d78/icons/close.svg)',
                  backgroundPosition: 'center',
                }}
                onClick={removeCreatePostImg}
                aria-label='delete image'
              ></button>
              <img src={postData.image} alt='' />
            </figure>
          </div>

          <div className='create-post__buttons'>
            <div className='create-post__assets-buttons'>
              <button
                type='button'
                aria-label='Add an image to the post'
                className='create-post__asset-btn'
                htmlFor='create-post-media'
                onClick={() => {
                  document.querySelector('input').click()
                }}
              >
                <img
                  className='icon'
                  src='https://raw.githubusercontent.com/Javieer57/create-post-component/43c8008a45b699957d2070cc23362f1953c65d78/icons/camera-tumblr.svg'
                  alt=''
                />
                Photo
                <input
                  type='file'
                  name='image'
                  id='create-post-media'
                  onInput={handleAddImg}
                  accept='.png, .jpg, .jpeg, .gif'
                />
              </button>
              <button
                type='button'
                aria-label='Add a video to the post'
                className='create-post__asset-btn'
                htmlFor='create-post-media'
                disabled
              >
                <img
                  className='icon'
                  src='https://raw.githubusercontent.com/Javieer57/create-post-component/43c8008a45b699957d2070cc23362f1953c65d78/icons/quote-tumblr.svg'
                  alt=''
                />
                Quote
              </button>
              <button
                type='button'
                aria-label='Add a video to the post'
                className='create-post__asset-btn'
                htmlFor='create-post-media'
                disabled
              >
                <img
                  className='icon'
                  src='https://raw.githubusercontent.com/Javieer57/create-post-component/43c8008a45b699957d2070cc23362f1953c65d78/icons/link-tumblr.svg'
                  alt=''
                />
                Link
              </button>
              <button
                type='button'
                aria-label='Add a video to the post'
                className='create-post__asset-btn'
                htmlFor='create-post-media'
                disabled
              >
                <img
                  className='icon'
                  src='https://raw.githubusercontent.com/Javieer57/create-post-component/43c8008a45b699957d2070cc23362f1953c65d78/icons/chat-tumblr.svg'
                  alt=''
                />
                Chat
              </button>
              <button
                type='button'
                aria-label='Add a video to the post'
                className='create-post__asset-btn'
                htmlFor='create-post-media'
                disabled
              >
                <img
                  className='icon'
                  src='https://raw.githubusercontent.com/Javieer57/create-post-component/43c8008a45b699957d2070cc23362f1953c65d78/icons/audio-tumblr.svg'
                  alt=''
                />
                Audio
              </button>
              <button
                type='button'
                aria-label='Add a video to the post'
                className='create-post__asset-btn'
                htmlFor='create-post-media'
                disabled
              >
                <img
                  className='icon'
                  src='https://raw.githubusercontent.com/Javieer57/create-post-component/43c8008a45b699957d2070cc23362f1953c65d78/icons/video-tumblr.svg'
                  alt=''
                />
                Video
              </button>
            </div>
            <button
              className='create-post__submit'
              type='submit'
              name='createPostSubmitBtn'
              id='create-post-submit-btn'
              disabled={postData.description === ''}
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
