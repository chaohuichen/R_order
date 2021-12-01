import axios from 'axios'

//for development call
// export const serverUrl = 'http://975d-2603-7000-73e-59fd-00-100f.ngrok.io'

// export const serverUrl = 'http://f018-216-158-137-35.ngrok.io/'

//for production call
export const serverUrl = 'https://www.fillupserve.com'
const api = axios.create({
  baseURL: `${serverUrl}/api/`,
})

export default api
