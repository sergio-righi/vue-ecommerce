
const controller = {
  basket: '/basket/',
  books: '/books/',
  authors: '/authors/',
  checkout: '/checkout/',
  home: '/',
  order: '/order/',
  product: '/product/',
  session: {
    login: '/sign_in',
    subscribe: '/sign_up',
    password: '/forget_password',
    authorization: '/authorization'
  }
}

const Resolve = (localePath: Function) => ({

  basket: (...args: any[]) => {
    return localePath({ path: controller.basket + args.join('/') });
  },

  product: (...args: any[]) => {
    return localePath({ path: controller.product + args.join('/') });
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

  // authors module

  author: (...args: any[]) => localePath({ path: controller.authors + 'do/' + args.join('/') }),
  authors: (...args: any[]) => localePath({ path: controller.authors + args.join('/') }),

  // books module

  book: (...args: any[]) => localePath({ path: controller.books + 'do/' + args.join('/') }),
  books: (...args: any[]) => localePath({ path: controller.books + args.join('/') }),

  // authentication

  login: (...args: any[]) => localePath({ path: controller.session.login + args.join('/') }),
  subscribe: (...args: any[]) => localePath({ path: controller.session.subscribe + args.join('/') }),
  password: (...args: any[]) => localePath({ path: controller.session.password + args.join('/') }),
  authorization: (...args: any[]) => localePath({ path: controller.session.authorization + args.join('/') }),

  image: {
    cover: (name: string) => {
      return `${process.env.baseUrl}/cover/${name}.jpg`
    },

    root: (name: string) => {
      return `/${name}`
    }
  }

});

export const initializeResolve = (localePath: Function) => ({
  ...Resolve(localePath)
});