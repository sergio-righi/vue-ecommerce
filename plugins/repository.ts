import { Plugin } from '@nuxt/types'
import { initializeRepository } from "@/db";

declare module 'vue/types/vue' {
    // this.$repository inside Vue components
    interface Vue {
        $repository: any
    }
}

declare module '@nuxt/types' {
    // nuxtContext.app.$repository inside asyncData, fetch, plugins, middleware, nuxtServerInit
    interface NuxtAppOptions {
        $repository: any
    }
    // nuxtContext.$repository
    interface Context {
        $repository: any
    }
}

declare module 'vuex/types/index' {
    // this.$repository inside Vuex stores
    interface Store<S> {
        $repository: any
    }
}

const repository: Plugin = (context, inject) => {
    inject('repository', initializeRepository(context.$axios, context.$service))
}

export default repository