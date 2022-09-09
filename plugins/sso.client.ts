import Cookies from 'js-cookie'

export default function ({ $axios, $config, store }: any, inject: any) {
  const token = Cookies.get('refresh_token');
  const sso = $axios.create({
    withCredentials: true,
    baseURL: $config.auth,
    headers: {
      common: {
        Accept: 'text/plain, */*',
        Authorization: [$config.apiKey, token]
          .filter(Boolean)
          .join('&')
      }
    }
  })

  inject('sso', sso)
}