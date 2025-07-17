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
                this.incItem(i);
                isInItems = true;
                break;
            }
        }
        if (!isInItems) {
            this.items.push(new CartItem(dish));
        }
        this.calcSum();
    }

    incItem (index) {
        this.items[index].incAmount();
        this.calcSum();
    }

    decItem (index) {
        this.items[index].decAmount();
        if (this.items[index].amount == 0) {
            this.delItem(index);
        }
        this.calcSum();
    }

    delItem (index) {
        this.items.splice(index, 1);
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
        this.total = sum + this.delivery;
        this.orderReady = (sum > 10) ? false : true;
        this.currency()
        this.renderCartContentWrapper();
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
        this.renderItems();
    }

    renderItems() {
        const refCartTable = document.querySelector('.cart-content table');
        if (this.items.length > 0) {
            this.items.forEach (item => {
                const tr = document.createElement('tr');
                tr.innerHTML += Template.singleItem(item);
                refCartTable.appendChild(tr);
            });
            this.addCartItemActions();
        }    
    }
    // #endregion
    // #region Event
    addCartItemActions() {
        const incBtns = document.querySelectorAll('.inc');
        const decBtns = document.querySelectorAll('.dec');
        const delBtns = document.querySelectorAll('.del');
        
        incBtns.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                this.incItem(i);
            });
        });
        decBtns.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                this.decItem(i);
            });
        });
        delBtns.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                this.delItem(i);
            });
        });
    }
    // #endregion
    // #region
}

class CartItem {
    amount = 1;
    value;
    euroValue
    constructor (item) {
        this.item = item;
        this.calcValue();
    }
    // #region Methods
    calcValue () {
        this.value = this.item.price * this.amount;
        this.currency();
    }

    currency () {
        this.euroValue = new Intl.NumberFormat('de-DE', {style:'currency', currency:'EUR'}).format(this.value);
    }

    incAmount () {
        this.amount++;
        this.calcValue();
    }

    decAmount () {
        this.amount--;
        this.calcValue();
    }
    // endregion
}