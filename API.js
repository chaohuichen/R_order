import axios from 'axios'

//for development call
export const serverUrl = 'http://89c7-2603-7000-73e-59fd-00-100f.ngrok.io'
//for production call
// export const serverUrl = 'https://www.fillupserve.com'
const api = axios.create({
  baseURL: `${serverUrl}/api/`,
})

export default api
