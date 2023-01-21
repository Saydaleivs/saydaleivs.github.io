import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AboutBox } from '../../Components/AboutBox'
import Banner from '../../Components/Banner'

export const Profile = () => {
  const username = useParams()
  const [user, setUser] = useState({
    followings: [],
    followers: [],
  })

  useEffect(() => {
    axios
      .get(`https://social-media-saeed2.onrender.com/api/user/${username.id}`)
      .then((res) => {
        setUser(res.data)
      })
  }, [])

  return (
    <>
      <Banner
        avatar={user.avatar}
        name={user.name}
        username={user.username}
        bio={user.bio}
        followings={user.followings.length}
        followers={user.followers.length}
      />

      <AboutBox
        workplace={user.workplace}
        address={user.address}
        hobbies={user.hobbies}
      />
    </>
  )
}
