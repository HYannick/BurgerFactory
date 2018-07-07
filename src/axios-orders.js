import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://react-burgery.firebaseio.com/'
})

export default instance