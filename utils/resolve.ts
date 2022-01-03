
const controller = {
  basket: '/basket/',
  book: '/book/',
  checkout: '/checkout/',
  home: '/',
  login: '/sign_in/',
  subscribe: '/sign_up/',
  order: '/order/'
}

const Resolve = (localePath: Function) => ({

  basket: (...args: any[]) => {
    return localePath({ path: controller.basket + args.join('/') });
  },

  book: (...args: any[]) => {
    return localePath({ path: controller.book + args.join('/') });
  },

  checkout: (...args: any[]) => {
    return localePath({ path: controller.checkout + args.join('/') });
  },

  home: (...args: any[]) => {
    return localePath({ path: controller.home + args.join('/') });
  },

  login: (...args: any[]) => {
    return localePath({ path: controller.login + args.join('/') });
  },

  subscribe: (...args: any[]) => {
    return localePath({ path: controller.subscribe + args.join('/') });
  },

  order: (...args: any[]) => {
    return localePath({ path: controller.order + args.join('/') });
  },

  image: {
    cover: (name: string) => {
      return `/covers/${name}.jpg`
    },
    root: (name: string) => {
      return `/${name}`
    }
  }

});

export const initializeResolve = (localePath: Function) => ({
  ...Resolve(localePath)
});