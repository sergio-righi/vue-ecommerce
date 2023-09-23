import { Context } from '@nuxt/types'

const controller = {
  basket: '/basket/',
  books: '/books/',
  authors: '/authors/',
  checkout: '/checkout/',
  home: '/',
  order: '/order/',
  product: '/product/'
}

const Resolve = (context: any) => ({

  basket: (...args: any[]) => {
    return context.localePath({ path: controller.basket + args.join('/') });
  },

  product: (...args: any[]) => {
    return context.localePath({ path: controller.product + args.join('/') });
  },

  checkout: (...args: any[]) => {
    return context.localePath({ path: controller.checkout + args.join('/') });
  },

  home: (...args: any[]) => {
    return context.localePath({ path: controller.home + args.join('/') });
  },

  order: (...args: any[]) => {
    return context.localePath({ path: controller.order + args.join('/') });
  },

  // authors module

  author: (...args: any[]) => context.localePath({ path: controller.authors + 'do/' + args.join('/') }),
  authors: (...args: any[]) => context.localePath({ path: controller.authors + args.join('/') }),

  // books module

  book: (...args: any[]) => context.localePath({ path: controller.books + 'do/' + args.join('/') }),
  books: (...args: any[]) => context.localePath({ path: controller.books + args.join('/') }),

  // authentication

  login: (callback: string) => context.$config.sso + '?callback=' + callback,
  logout: (callback: string) => context.$config.sso + 'logout?callback=' + callback,
  subscribe: (callback: string) =>
    context.$config.sso + 'register?callback=' + callback,
  password: (callback: string) =>
    context.$config.sso + 'forget-password?callback=' + callback,
  authorization: (callback: string) =>
    context.$config.sso + 'authorization?callback=' + callback,

  image: {
    cover: (name: string) => {
      return `/images/${name}.jpg`
      // return `${context.$config.api}cover/${name}.jpg`
    },

    root: (name: string) => {
      return `/${name}`
    }
  }

});

export const initializeResolve = (context: Context) => ({
  ...Resolve(context),
});