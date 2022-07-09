import { Plugin, Context } from '@nuxt/types'
import { initializeResolve } from '@/utils/resolve'

const resolve: Plugin = (context: Context, inject: any) => {
  inject('resolve', initializeResolve(context))
}

export default resolve
