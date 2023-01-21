import axios from 'axios'

export default function GetUser() {
  // const userId = JSON.parse(localStorage.getItem('userID'))

  return axios.post('https://social-media-saeed2.onrender.com/api/user', '', {
    headers: { token: document.cookie },
  })
}
