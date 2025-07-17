import { Template } from './templates.js';

export class Cart {
    euroSum;
    euroDelivery;
    euroTotal;
    constructor() {
        this.items = [];
        this.sum = 0;
        this.delivery = 5;
        this.total = 5;
        this.orderReady = false;
        this.currency();
        this.renderCartContentWrapper();
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
        this.renderCartContentWrapper();
    }
    // #region Calc
    calcSum() {
        let sum = 0;
        for (let i = 0; i < this.items.length; i++) {
            sum += this.items[i].item.price * this.items[i].amount;
        }
        this.sum = sum;
        this.delivery = (sum < 20) ? 5 : 0;
        this.total = sum + this.delivery;
        this.orderReady = (sum > 10) ? false : true;
        this.currency()
    }

    currency() {
        this.euroSum = new Intl.NumberFormat('de-DE', {style:'currency', currency:'EUR'}).format(this.sum);
        this.euroDelivery = new Intl.NumberFormat('de-DE', {style:'currency', currency:'EUR'}).format(this.delivery);
        this.euroTotal = new Intl.NumberFormat('de-DE', {style:'currency', currency:'EUR'}).format(this.total);
    }
    // #endregion
    // #region Render
    renderCartContentWrapper() {
        const refCartContent = document.querySelector('.cart-content');
        refCartContent.innerHTML = Template.cartContent(this.euroSum, this.euroDelivery, this.euroTotal);
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