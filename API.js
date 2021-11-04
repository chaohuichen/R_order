import axios from 'axios'

//for development call
export const serverUrl = 'https://ab5b-216-158-137-35.ngrok.io'
//for production call
// export const serverUrl = 'https://www.fillupserve.com'
const api = axios.create({
  baseURL: `${serverUrl}/api/`,
})

export default api
