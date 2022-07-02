import axios from 'axios'

//for development call
// export const serverUrl = 'https://b57f-108-21-245-133.ngrok.io'

//for production call
export const serverUrl = 'https://www.fillupserve.com'
const api = axios.create({
  baseURL: `${serverUrl}/api/`,
})

export default api
