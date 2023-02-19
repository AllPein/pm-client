import { apiRequest } from '@/utils/apiRequest'
import { ENV } from '@/utils/env'

const fetchUser = () => apiRequest.get(`${ENV.BACKEND_URL}/user/`)
const updateUser = (newData) => apiRequest.patch(`${ENV.BACKEND_URL}/user/`, newData)
const fetchUsers = (filter) => apiRequest.get(`${ENV.BACKEND_URL}/user/search/${filter}`)

export {
  fetchUser,
  updateUser,
  fetchUsers
}