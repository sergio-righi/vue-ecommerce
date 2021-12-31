import { Plugin } from '@nuxt/types'
import { initializeResolve } from 'utils/resolve'

declare module 'vue/types/vue' {
    // this.$resolve inside Vue components
    interface Vue {
        $resolve: any
    }
}

declare module '@nuxt/types' {
    // nuxtContext.app.$resolve inside asyncData, fetch, plugins, middleware, nuxtServerInit
    interface NuxtAppOptions {
        $resolve: any
    }
    // nuxtContext.$resolve
    interface Context {
        $resolve: any
    }
}

declare module 'vuex/types/index' {
    // this.$resolve inside Vuex stores
    interface Store<S> {
        $resolve: any
    }
}

const resolve: Plugin = (context: any, inject: any) => {
    inject('resolve', initializeResolve(context.localePath));
}

export default resolve