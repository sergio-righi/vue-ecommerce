import { env } from '@/utils'

export default (req: any, res: any, next: any) => {
  try {
    const { apikey } = req.headers
    const secretKey = env.get('api')
    if (apikey && apikey === secretKey) next()
    else throw new Error('401')
  } catch (err) {
    err === 401 ? res.status(401) : res.end()
  }
}
