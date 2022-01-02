import { i18n } from "./utils";
import { resolve } from "path";

// const JavaScriptObfuscator = require('webpack-obfuscator');

export default {
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "The Lazy Company - Ecommerce",
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
    "~/plugins/enum",
    "~/plugins/axios",
    "~/plugins/filter",
    "~/plugins/resolve",
    "~/plugins/service",
    "~/plugins/repository",
    "~/plugins/grater-vue",
    "~/plugins/vuex-persist.client",
    "~/plugins/multi-tab-state.client",
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
    // proxy: true,
    progress: false,
    baseUrl: process.env.BASE_URL || "http://localhost:3000/",
    headers: {
      common: {
        Authorization:
          process.env.API_TOKEN || "D2GZvPTl8c5GAQX8ZyvOlq72Jnukl5Tu",
      },
    },
  },

  alias: {
    utils: resolve(__dirname, "./utils"),
    scss: resolve(__dirname, "./assets/scss"),
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
    middleware: ["authorization", "authentitcation"],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // extend(config, { isDev, isClient }) {
    //   if (!isDev && isClient && config.plugins) {
    //     config.plugins.push(
    //       new JavaScriptObfuscator({
    //         rotateUnicodeArray: true, // must be true
    //         compact: true, // Compact Remove newline characters from the output obfuscation code.
    //         controlFlowFlattening: false, // This option greatly affects the performance of a 1.5x speed reduction. Enable code control flow flattening. Control flow flattening is the structural transformation of source code, which hinders program understanding.
    //         controlFlowFlatteningThreshold: 0.8,
    //         deadCodeInjection: true, // This option greatly increases the size of obfuscated code (up to 200%) This feature adds random dead code blocks (ie: code that will not be executed) to the obfuscated output, making it more difficult to reverse engineer.
    //         deadCodeInjectionThreshold: 0.5,
    //         debugProtection: true, // Debugging protection If you open the developer tools, you can freeze your browser.
    //         debugProtectionInterval: true, // If checked, the interval forced debugging mode is used on the "Console" tab, which makes it more difficult to use other functions of "Developer Tools". How does it work? A special code that calls the debugger; inserted repeatedly throughout the obfuscated source code.
    //         disableConsoleOutput: true, // Disable console.log, console.info, console.error and console.warn by replacing them with empty functions. This makes the use of the debugger more difficult.
    //         domainLock: [], // Lock the obfuscated source code so that it only runs on specific domains and / or subdomains. This makes it very difficult for someone to simply copy and paste the source code and run it elsewhere. Multiple domains and subdomains can lock the code to multiple domains or subdomains. For example, to lock it so that the code only runs on www.example.com Add www.example.com so that it runs on any subdomain of example.com, use .example.com.
    //         identifierNamesGenerator: 'hexadecimal', // Use this option to control the obfuscation of identifiers (variable names, function names, etc.).
    //         identifiersPrefix: '', // This option makes all global identifiers have a specific prefix.
    //         inputFileName: '',
    //         log: false,
    //         renameGlobals: false, // Don't start Enable global variable and function name confusion by declaration.
    //         reservedNames: [], // Disable obfuscation and generate identifiers that match the passed RegExp pattern. For example, if you add ^ someName, the obfuscator will ensure that all variables beginning with someName, the function name and function parameters will not be destroyed.
    //         reservedStrings: [], // Disable the conversion of string literals, which match the RegExp pattern passed. For example, if you add ^ some * string, the obfuscator will ensure that all strings beginning with certain strings are not moved to `stringArray`.
    //         rotateStringArray: true, //
    //         seed: 0, // By default (seed = 0), you will get a new result every time you obfuscate the code (ie: different variable names, different variables inserted into stringArray, etc.). If repeatable results are required, set the seed to a specific integer.
    //         selfDefending: false, // This option makes the output code resistant to formatting and variable renaming. If you try to use a JavaScript beautifier on obfuscated code, the code will no longer work, making it more difficult to understand and modify it. Compact code setup is required.
    //         sourceMap: false, // Make sure not to upload obfuscated source code with embedded source code, because it contains the original source code. Source mapping can help you debug obfuscated Java Script source code. If you want or need to debug in production, you can upload a separate source map file to a secret location and then point your browser to that location.
    //         sourceMapBaseUrl: '', // This embeds the source mapping of the source into the result of obfuscated code. This is useful if you only want to debug locally on your computer.
    //         sourceMapFileName: '',
    //         sourceMapMode: 'separate',
    //         stringArray: true, // Shift the stringArray array to a fixed and random (generated when code is confused) position. This makes it more difficult to match the order of deleted strings with their original positions. If the original source code is not small, it is recommended to use this option, because helper functions can attract attention.
    //         stringArrayEncoding: ['rc4'], // This option may slightly reduce the script speed. Use Base64 or RC4 to encode all string literals of stringArray and insert a special function to decode it back at runtime.
    //         stringArrayThreshold: 0.8, // You can use this setting to adjust the probability that string literals will be inserted into stringArray (from 0 to 1). This setting is useful in large code bases, because repeated calls to the stringArray function will reduce the speed of the code.
    //         target: 'browser', // You can set the target environment of the obfuscated code to one of the following: Browser, Browser No Eval, Node The current browser and node output are the same.
    //         transformObjectKeys: false, // Convert (obfuscate) object keys. For example, this code var a = {enabled: true}; when using this option for obfuscation, the enabled object key will be hidden: var a = {}; a [_0x2ae0 [('0x0')] = true ;. Ideally used with String Array settings.
    //         unicodeEscapeSequence: true,
    //       }, ['node_modules/**/*.js'])
    //     );
    //   }
    // }
  },
};
