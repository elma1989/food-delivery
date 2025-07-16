export class Cart {
    constructor() {
        this.items = [];
    }
    // #region Methods
    addItem (dish) {
        let isInItems = false;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].item.dishName == dish.dishName) {
                this.items[i].amount++;
                isInItems = true;
                break;
            }
        }
        if (!isInItems) {
            this.items.push(new CartItem(dish));
        }
        console.log(this.items);
    }
    // #region
}

class CartItem {
    amount = 1;
    constructor (item) {
        this.item = item;
    }
}