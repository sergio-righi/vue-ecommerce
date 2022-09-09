import Cookies from 'js-cookie'

export default function ({ $axios, $config, store }: any, inject: any) {
  const token = Cookies.get('refresh_token');
  const sso = $axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*',
        Authorization: [$config.apiKey, token]
          .filter(Boolean)
          .join('&')
      }
    }
  })

  sso.setBaseURL($config.auth)
  inject('sso', sso)
}