import { apiRequest } from '@/utils/apiRequest'
import { ENV } from '@/utils/env'

const fetchProjects = () => apiRequest.get(`${ENV.BACKEND_URL}/projects`)
const fetchProject = (code) => apiRequest.get(`${ENV.BACKEND_URL}/project/${code}`)
const createProject = (data) => apiRequest.post(`${ENV.BACKEND_URL}/pm/`, data)
const updateProject = (data) => apiRequest.patch(`${ENV.BACKEND_URL}/project`, data)
const addParticipant = (data) => apiRequest.post(`${ENV.BACKEND_URL}/project/add-participant`, data)
const updateParticipant = (data) => apiRequest.post(`${ENV.BACKEND_URL}/project/change-role`, data)
const fetchProjectTime = (code) => apiRequest.get(`${ENV.BACKEND_URL}/project/${code}/commits`)

export {
  fetchProject,
  fetchProjects,
  addParticipant,
  fetchProjectTime,
  updateParticipant,
  updateProject,
  createProject
}