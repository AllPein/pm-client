import { apiRequest } from '@/utils/apiRequest'
import { ENV } from '@/utils/env'

const signUp = (userData) => apiRequest.post(`${ENV.BACKEND_URL}/auth/register`, userData)
const signIn = (userData) => apiRequest.post(`${ENV.BACKEND_URL}/auth/login`, userData)

export {
  signUp,
  signIn
}