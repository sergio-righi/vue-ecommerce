import { Plugin } from '@nuxt/types'
import { initializeEnum } from 'utils/mapper'

declare module 'vue/types/vue' {
    // this.$enum inside Vue components
    interface Vue {
        $enum: any
    }
}

declare module '@nuxt/types' {
    // nuxtContext.app.$enum inside asyncData, fetch, plugins, middleware, nuxtServerInit
    interface NuxtAppOptions {
        $enum: any
    }
    // nuxtContext.$enum
    interface Context {
        $enum: any
    }
}

declare module 'vuex/types/index' {
    // this.$enum inside Vuex stores
    interface Store<S> {
        $enum: any
    }
}

const enumerable: Plugin = (context, inject) => {
    inject('enum', initializeEnum)
}

export default enumerable