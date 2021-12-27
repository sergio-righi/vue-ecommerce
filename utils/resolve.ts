
const controller = {
    basket: '/basket/',
    book: '/book/',
    home: '/'
}

const basket = (...args: any[]) => {
    return controller.basket + args.join('/');
}

const book = (...args: any[]) => {
    return controller.book + args.join('/');
}

const home = (...args: any[]) => {
    return controller.home + args.join('/');
}

const image = {
    cover: (name: string) => {
        return `/covers/${name}.jpg`
    }
}

export const initializeResolve = {
    basket,
    book,
    home,
    image
};