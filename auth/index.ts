import { Context } from '@nuxt/types'
import { NuxtAxiosInstance } from '@nuxtjs/axios'

export const initializeAuth = (context: Context): NuxtAxiosInstance => {

  const auth = context.$axios.create({
    baseURL: context.$config.auth
  });

  auth.onRequest((config: any) => {
    config.headers.apikey = context.$config.apiKey
  })

  auth.onError((error: any) => {
    if (error.response === undefined) {
      console.log('Network Error: Please refresh and try again.')
      throw error
    }
    throw error
  })

  return auth;
};