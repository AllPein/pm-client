import { apiRequest } from '@/utils/apiRequest'
import { ENV } from '@/utils/env'

const fetchProjects = () => apiRequest.get(`${ENV.BACKEND_URL}/projects`)
const fetchProject = (code) => apiRequest.get(`${ENV.BACKEND_URL}/projects/${code}`)

export {
  fetchProject,
  fetchProjects
}