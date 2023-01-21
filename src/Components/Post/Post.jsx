import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PublishPost } from '../PublishPost'
import GetPosts from '../../Services/GetPosts'
import './Post.css'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

const Post = () => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState()
  const [isLiked, setIsLiked] = useState(false)
  const [isPublished, setIsPublished] = useState(false)
  const userId = localStorage.getItem('userID')

  useEffect(() => {
    GetPosts().then((res) => setPosts(res.data))
  }, [isLiked, isPublished])

  function addLike(e) {
    axios
      .post(
        'https://social-media-saeed2.onrender.com/api/posts/like',
        {
          postId: e.currentTarget.id,
        },
        { headers: { token: document.cookie } }
      )
      .catch((err) => console.error(err))
      .finally(() => setIsLiked(!isLiked))
  }

  return (
    <div className='col-12 col-lg-6 '>
      <PublishPost />

      <section style={{ marginTop: '20px' }} id='posts-container'>
        {posts?.map((post) => (
          <article key={post._id} className='post'>
            <div className='post__content'>
              <header className='post__header'>
                <div
                  className='d-flex align-items-center'
                  onClick={() => {
                    navigate(`/${post.author.username}`)
                  }}
                >
                  <img
                    className='post__avatar'
                    src={post.author.avatar}
                    alt=''
                    style={{ objectFit: 'cover', cursor: 'pointer' }}
                  />
                  <p className='post__user'>@{post.author.username}</p>
                </div>

                <div className='post__meta'>
                  <p className='post__reblogs'>
                    {post.likes.usersLiked.length}
                  </p>

                  <button
                    style={{ cursor: 'pointer' }}
                    className='post__header-btn'
                    id={post._id}
                    onClick={addLike}
                  >
                    {post.likes.usersLiked.includes(userId) ? (
                      <FontAwesomeIcon
                        icon={faHeart}
                        style={{
                          fontSize: 25,
                          color: 'red',
                          marginTop: 4,
                        }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faHeart}
                        style={{
                          fontSize: 25,
                          color: '#888',
                          marginTop: 4,
                        }}
                      />
                    )}
                  </button>
                </div>
              </header>

              <div className='post__body'>
                <img className='post__img' src={post.image} alt='' />
                <p className='post__text'>{post.description}</p>
              </div>

              <div className='post__footer'>
                <span>{post.date}</span>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}

export default Post
