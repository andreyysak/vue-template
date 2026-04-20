import api from '@/services/api/client.js'

export const getUser = () => api.get('/user')
