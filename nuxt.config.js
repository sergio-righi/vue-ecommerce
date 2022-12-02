import { i18n } from "./utils";

export default {
  ssr: false,

  publicRuntimeConfig: {
    sso: process.env.SSO_URL,
    api: process.env.API_URL,
    auth: process.env.AUTH_URL,
    apiKey: process.env.API_KEY,
    vuexKey: process.env.VUEX_KEY,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "TheBookStore",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico",
        crossorigin: "anonymous",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/scss/default.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/axios.client",
    "~/plugins/auth.client",
    "~/plugins/enum.client",
    "~/plugins/filter.client",
    "~/plugins/service.client",
    "~/plugins/resolve.client",
    "~/plugins/grater-vue.client",
    "~/plugins/vuex-persist.client",
  ],

  pageTransition: "page",

  loading: { color: "white" },

  loadingIndicator: {
    name: "circle",
    color: "black",
    background: "white",
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["nuxt-i18n", "@nuxtjs/axios"],

  axios: {
    progress: false,
    baseUrl: process.env.API_URL,
  },

  i18n: {
    seo: true,
    lazy: true,
    langDir: "~/locales/",
    parsePages: false,
    vueI18nLoader: true,
    locales: [
      { code: "en-CA", iso: "en-CA", name: "English", file: "en-CA.json" },
      { code: "pt-BR", iso: "pt-BR", name: "Portuguese", file: "pt-BR.json" },
    ],
    vueI18n: i18n,
    defaultLocale: "en-CA",
    strategy: "prefix_and_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
  },

  router: {
    middleware: ["sso"],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
