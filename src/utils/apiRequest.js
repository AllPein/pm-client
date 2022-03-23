import axios from 'axios'
import { authProvider } from '@/application/Auth/authProvider'
import { MimeType } from '@/enums/MimeType'
import { RequestHeader } from '@/enums/RequestHeader'
import { RequestMethod } from '@/enums/RequestMethod'
import { ResponseStatus } from '@/enums/ResponseStatus'

class ApiRequest {
  static cancelToken = axios.CancelToken
  static instance = axios.create({
    baseURL: '',
    headers: ApiRequest.defaultHeaders
  })

  static defaultHeaders = {
    [RequestHeader.ACCEPT]: MimeType.APPLICATION_JSON,
    [RequestHeader.CONTENT_TYPE]: MimeType.APPLICATION_JSON
  }

  static progressRequest = async (url, data, token, { onSuccess, onError, onProgress }) => {
    const cancelTokenSource = ApiRequest.cancelToken.source()

    try {
      const response = await ApiRequest.instance.request({
        url,
        method: RequestMethod.POST,
        data,
        cancelToken: cancelTokenSource.token,
        onUploadProgress: (e) => {
          if (onProgress) {
            e.percent = e.total > 0 ? (e.loaded / e.total) * 100 : 0
            e.cancelToken = cancelTokenSource
            onProgress(e)
          }
        }
      })
      onSuccess && onSuccess(response)
    } catch (e) {
      !(e instanceof axios.Cancel) && onError && onError()
    }

    return Promise.resolve(() => cancelTokenSource.cancel())
  }

  static formPost (url, formData, { onSuccess, onError, onProgress }) {
    return ApiRequest.progressRequest(url, formData, undefined, {
      onSuccess,
      onError,
      onProgress
    })
  }

  static #getAuthHeaders = () => {
    let authHeaders = {}
    const token = authProvider.getAccessToken()
    if (token) {
      authHeaders = {
        [RequestHeader.AUTHORIZATION]: `Bearer ${token}`
      }
    }
    return authHeaders
  }

  static __init__ () {
    ApiRequest.instance.interceptors.request.use(
      async (config) => {
        const authHeaders = ApiRequest.#getAuthHeaders()

        const headers = {
          ...ApiRequest.defaultHeaders,
          ...authHeaders
        }

        config.headers = {
          ...headers,
          ...config.headers
        }

        return config
      },
      (error) => Promise.reject(error)
    )

    ApiRequest.instance.interceptors.response.use(
      (config) => config.data,
      async (error) => {
        if (error.response?.status === ResponseStatus.UNAUTHORIZED) {
          await authProvider.signIn()
        }
        return Promise.reject(error)
      }
    )

    ApiRequest.instance.formPost = ApiRequest.formPost
  }
}

ApiRequest.__init__()
const apiRequest = ApiRequest.instance

export {
  apiRequest
}
