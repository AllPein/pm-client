import { apiRequest } from '@/utils/apiRequest'
import { ENV } from '@/utils/env'

const fetchUser = () => apiRequest.get(`${ENV.BACKEND_URL}/user`)

export {
  fetchUser
}