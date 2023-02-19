import { apiRequest } from '@/utils/apiRequest'
import { ENV } from '@/utils/env'

const signUp = (userData) => apiRequest.post(`${ENV.BACKEND_URL}/register`, userData)
const signIn = (userData) => apiRequest.post(`${ENV.BACKEND_URL}/auth`, userData)

export {
  signUp,
  signIn
}