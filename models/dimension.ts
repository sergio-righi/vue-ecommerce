
interface IDimension {
    width?: number;
    height?: number;
    depth?: number;
    weight?: number;
    length?: number;
}

class Dimension implements IDimension {
    width?: number;
    height?: number;
    depth?: number;
    weight?: number;
    length?: number;

    constructor(o: IDimension = {}) {
        this.width = o.width;
        this.height = o.height;
        this.depth = o.depth;
        this.weight = o.weight;
        this.length = o.length;
    }
}

export default Dimension;
