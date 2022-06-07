
const controller = {
  basket: '/basket/',
  book: '/book/',
  checkout: '/checkout/',
  home: '/',
  order: '/order/',
  session: {
    login: 'sign_in',
    subscribe: 'sign_up',
    password: 'forget_password',
    authorization: 'authorization'
  }
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

  order: (...args: any[]) => {
    return localePath({ path: controller.order + args.join('/') });
  },

  // authentication

  login: (...args: any[]) => localePath({ path: controller.session.login + args.join('/') }),
  subscribe: (...args: any[]) => localePath({ path: controller.session.subscribe + args.join('/') }),
  password: (...args: any[]) => localePath({ path: controller.session.password + args.join('/') }),
  authorization: (...args: any[]) => localePath({ path: controller.session.authorization + args.join('/') }),

  image: {
    cover: (name: string) => {
      return `http://localhost:4000/cover/${name}.jpg`
    },
    root: (name: string) => {
      return `/${name}`
    }
  }

});

export const initializeResolve = (localePath: Function) => ({
  ...Resolve(localePath)
});