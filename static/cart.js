export class Cart {
    euroSum;
    euroDelivery;
    euroTotal;
    constructor() {
        this.items = [];
        this.sum = 0;
        this.delivery = 5;
        this.total = 5;
        this.currency();
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
        this.calcSum();
    }
    // #region Calc
    calcSum() {
        let sum = 0;
        for (let i = 0; i < this.items.length; i++) {
            sum += this.items[i].item.price * this.items[i].amount;
        }
        this.sum = sum;
        this.delivery = (sum < 20) ? 5 : 0;
        this.total = sum + this.deliveryCosts;
        this.currency()
    }

    currency() {
        this.euroSum = new Intl.NumberFormat('de-DE', {style:'currency', currency:'EUR'}).format(this.sum);
        this.euroDelivery = new Intl.NumberFormat('de-DE', {style:'currency', currency:'EUR'}).format(this.delivery);
        this.eurTotal = new Intl.NumberFormat('de-DE', {style:'currency', currency:'EUR'}).format(this.total);
    }
    // #endregion
    // #region
}

class CartItem {
    amount = 1;
    constructor (item) {
        this.item = item;
    }
}