import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000
})

api.interceptors.request.use(config => {
  return config
})

api.interceptors.response.use(
  res => res,
  err => {
    return Promise.reject(err)
  }
)

export default api
