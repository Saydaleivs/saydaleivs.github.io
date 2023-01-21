import axios from 'axios'

export default function GetPosts() {
  return axios.get('https://social-media-saeed2.onrender.com/api/posts')
}
