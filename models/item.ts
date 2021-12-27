
interface IItem {
    bookId?: string;
    count: number;
    price: number;
    discount: number;
}

class Item implements IItem {
    bookId?: string;
    count: number;
    price: number;
    discount: number;

    constructor(o: IItem = { count: 0, price: 0, discount: 0 }) {
        this.bookId = o.bookId;
        this.count = o.count;
        this.price = o.price;
        this.discount = o.discount;
    }

    canCreate() {
        return true;
    }

    canUpdate() {
        return true;
    }
}

export default Item;