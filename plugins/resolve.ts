import { Plugin } from '@nuxt/types'
import { initializeResolve } from 'utils/resolve'

const resolve: Plugin = (context: any, inject: any) => {
    inject('resolve', initializeResolve(context.localePath));
}

export default resolve