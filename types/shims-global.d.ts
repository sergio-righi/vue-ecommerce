import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $t: any
    $tc: any
    $i18n: any
    $enum: any
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $enum: any
    $resolve: any
    $service: any
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $enum: any
    $resolve: any
    $service: any
  }
  interface Context {
    i18n: any
    $enum: any
    $resolve: any
    $service: any
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $enum: any
    $resolve: any
    $service: any
  }
}