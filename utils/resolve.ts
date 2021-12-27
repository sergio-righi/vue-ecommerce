
const controller = {
    basket: '/basket/',
    book: '/book/',
    checkout: '/checkout/',
    home: '/',
    order: '/order/'
}

const basket = (...args: any[]) => {
    return controller.basket + args.join('/');
}

const book = (...args: any[]) => {
    return controller.book + args.join('/');
}

const checkout = (...args: any[]) => {
    return controller.checkout + args.join('/');
}

const home = (...args: any[]) => {
    return controller.home + args.join('/');
}

const order = (...args: any[]) => {
    return controller.order + args.join('/');
}

const image = {
    cover: (name: string) => {
        return `/covers/${name}.jpg`
    }
}

export const initializeResolve = {
    basket,
    book,
    checkout,
    home,
    order,
    image
};