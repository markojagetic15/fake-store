import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, ResponseType } from 'axios'
import { toast } from 'react-toastify'

// Extend AxiosRequestConfig to include retry and retryDelay
interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  retry?: number
  retryDelay?: number
}

// Extend the InternalAxiosRequestConfig to include retry and retryDelay
declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    retry?: number
    retryDelay?: number
  }
}

export class HttpAdapter {
  handleAPIError() {
    toast.error('Your request did not go through. Please try again later.')
  }

  handleNoInternet() {
    if (navigator.onLine) return false
    toast.warning("You don't have an internet connection.")
    return true
  }

  async axiosFetch(axiosConfig: AxiosRequestConfigWithRetry): Promise<AxiosResponse | undefined> {
    axios.interceptors.response.use(
      (response) => response,
      async (err: AxiosError) => {
        const config = err.config as AxiosRequestConfigWithRetry
        if (!config || config.retry === undefined) {
          return Promise.reject(err)
        }

        // Retry while Network timeout or Network Error
        if (!(err.message.includes('timeout') || err.message.includes('Network Error'))) {
          return Promise.reject(err)
        }

        config.retry -= 1
        const delayRetryRequest = new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve()
          }, config.retryDelay || 1000)
        })
        await delayRetryRequest
        return axios(config)
      },
    )

    try {
      const response = await axios(axiosConfig)
      if (response.status >= 200 && response.status < 300) return response

      if (response.status >= 300) this.handleAPIError()
    } catch (e: unknown) {
      const error = e as AxiosError
      if (this.handleNoInternet()) console.error('Error when fetching', error)
      return undefined
    }
  }

  axiosConfig({
    method,
    url,
    data,
    headers,
    onUploadProgress,
    onDownloadProgress,
    responseType,
  }: AxiosRequestConfigWithRetry): AxiosRequestConfigWithRetry {
    return {
      method,
      url,
      data,
      responseType,
      headers,
      onUploadProgress,
      onDownloadProgress,
      withCredentials: true,
      retry: 10,
      retryDelay: 1000,
    }
  }

  async fetchResponse(data: AxiosRequestConfig): Promise<AxiosResponse | undefined> {
    return this.axiosFetch(this.axiosConfig(data))
  }

  async GET(url: string, responseType?: ResponseType): Promise<AxiosResponse | undefined> {
    return await this.fetchResponse({ method: 'get', url, responseType })
  }

  async POST(
    url: string,
    data: unknown,
    headers?: AxiosRequestConfig['headers'],
  ): Promise<AxiosResponse | undefined> {
    return await this.fetchResponse({
      method: 'post',
      url,
      data,
      headers,
    })
  }

  async PATCH<T>(url: string, data: T): Promise<AxiosResponse | undefined> {
    try {
      return await axios.patch(url, data)
    } catch (error) {
      console.error('Error performing PATCH request', error)
      return undefined
    }
  }

  async DELETE(url: string): Promise<AxiosResponse | undefined> {
    return await this.fetchResponse({ method: 'delete', url })
  }
}
