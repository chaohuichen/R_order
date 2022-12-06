import axios from 'axios'

//for development call
export const serverUrl = 'https://fillup-coffee.herokuapp.com'

//for production call
// export const serverUrl = 'https://www.fillupserve.com'
const api = axios.create({
  baseURL: `${serverUrl}/api/`,
})

export default api
