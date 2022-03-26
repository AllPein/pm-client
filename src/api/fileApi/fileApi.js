import { ENV } from '@/utils/env'
import axios from 'axios'

const uploadFile = (fd, method) => axios.post(`https://api.cloudinary.com/v1_1/${ENV.CLOUD_NAME}/${method}/upload`, fd)

export {
  uploadFile
}