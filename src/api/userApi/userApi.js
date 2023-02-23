import { apiRequest } from '@/utils/apiRequest'
import { ENV } from '@/utils/env'

const fetchUser = () => apiRequest.get(`${ENV.BACKEND_URL}/user/`)
const updateUser = (newData) => apiRequest.patch(`${ENV.BACKEND_URL}/user/${newData.id}`, newData)
const updateAnotherUser = (newData) => apiRequest.post(`${ENV.BACKEND_URL}/admin/users`, newData)
const fetchUsers = (filter) => apiRequest.get(`${ENV.BACKEND_URL}/admin/users/search${filter?.length ? `/${filter}` : ''}`)
const fetchUsersInProject = (filter, projectId) => 
  apiRequest.get(`${ENV.BACKEND_URL}/user/search?searchParam=${filter}&projectId=${projectId}`)

export {
  fetchUser,
  updateUser,
  updateAnotherUser,
  fetchUsers,
  fetchUsersInProject,
}