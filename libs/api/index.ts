import axios from 'axios'
import axiosRetry from 'axios-retry'
import { create } from 'apisauce'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as interceptors from './interceptors'

/**
 * Web api confgiration
 */
export const webApi = ({ auth, self }: any = {}) => {
  const baseApi = axios.create({
    baseURL: self ? '' : 'https://hrd-api.tofikhidayat.xyz/api/',
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
    },
  })
  baseApi.interceptors.request.use(
    async (config: any) => {
      const authToken = await AsyncStorage.getItem('--app-auth-token')
      config = await interceptors.uploadRequest(baseApi, config)
      config.headers.Authorization = `Bearer ${authToken}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  axiosRetry(baseApi, { retryDelay: axiosRetry.exponentialDelay })
  return create({
    axiosInstance: baseApi,
    timeout: 20000,
  })
}
