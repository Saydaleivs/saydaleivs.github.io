import axios from 'axios'

export default function GetAllUsers(limit) {
  return axios.get(
    `https://social-media-saeed2.onrender.com/api/users/limited?limit=${limit}`,
    {
      headers: {
        token: document.cookie,
      },
    }
  )
}
