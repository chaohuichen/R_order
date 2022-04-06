import axios from 'axios'

//for development call
// export const serverUrl = 'https://f43b-98-116-212-6.ngrok.io'

//for production call
export const serverUrl = 'https://www.fillupserve.com'
const api = axios.create({
  baseURL: `${serverUrl}/api/`,
})

export default api
