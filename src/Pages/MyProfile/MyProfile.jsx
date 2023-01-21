import React, { useEffect, useState } from 'react'
import { AboutBox } from '../../Components/AboutBox'
import Banner from '../../Components/Banner'
import GetUser from '../../Services/GetUser'

export const MyProfile = () => {
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    GetUser().then((res) => {
      setUserInfo(res.data)
    })
  }, [])

  if (userInfo._id)
    return (
      <>
        <Banner
          avatar={userInfo.avatar}
          name={userInfo.name}
          username={userInfo.username}
          bio={userInfo.bio}
          followings={userInfo.followings.length}
          followers={userInfo.followers.length}
        />
        <AboutBox
          friends={userInfo.friends}
          workplace={userInfo.workplace}
          address={userInfo.address}
          hobbies={userInfo.hobbies}
        />
      </>
    )
}
