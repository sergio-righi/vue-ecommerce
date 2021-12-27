import { Plugin } from '@nuxt/types'
import { initializeService } from "@/services";

declare module 'vue/types/vue' {
    // this.$service inside Vue components
    interface Vue {
        $service: any
    }
}

declare module '@nuxt/types' {
    // nuxtContext.app.$service inside asyncData, fetch, plugins, middleware, nuxtServerInit
    interface NuxtAppOptions {
        $service: any
    }
    // nuxtContext.$service
    interface Context {
        $service: any
    }
}

declare module 'vuex/types/index' {
    // this.$service inside Vuex stores
    interface Store<S> {
        $service: any
    }
}

const service: Plugin = (context, inject) => {
    inject('service', initializeService(context.store))
}

export default service