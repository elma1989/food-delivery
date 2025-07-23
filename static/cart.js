import { Template } from './templates.js'

export class CartItem{
    value;
    euroValue;
    constructor(dish, amount) {
        this.dish = dish;
        this.amount = amount;
        this.calc();
    }

    // #region Mathods
    calc() {
        this.value = this.dish.price * this.amount;
        this.euroValue = new Intl.NumberFormat('de-DE', {style:'currency', currency:'EUR'}).format(this.value);
    }

    incAmount() {
        this.amount++;
        this.calc();
    }

    decAmount() {
        this.amount--;
        this.calc();
    }
}

export class Cart{
    //  #region Attibutes
    sum = 0;
    euroSum;
    delivery = 5;
    euroDelivery;
    total = 0;
    euroTotal;
    cartItems = [];
    orderReady = false;
    // #endregion

    constructor() {
        this.currency();
        this.renderSum();
    }

    // #region Methods
    // #region Primary
    calc() {
        this.sum = 0;
        if (this.cartItems.length > 0) {
            this.sum = 0;

            this.cartItems.forEach(item =>{
                this.sum += item.value;
            });
            this.delivery = (this.sum < 20) ? 5 : 0;
            this.total = this.sum + this.delivery;
        } else {
            this.delivery = 0;
            this.total = 0
        }
    }

    currency() {
        this.euroSum = new Intl.NumberFormat('de-DE', {style:'currency', currency:'EUR'}).format(this.sum);
        this.euroDelivery = new Intl.NumberFormat('de-DE', {style:'currency', currency:'EUR'}).format(this.delivery);
        this.euroTotal = new Intl.NumberFormat('de-DE', {style:'currency', currency:'EUR'}).format(this.total);
    }

    refresh() {
        this.calc();
        this.currency();
        this.clickOrderBtn();
        this.renderItems();
        this.clickIncBtn();
        this.clickDecBtn();
        this.clickDelBtn();
        this.renderSum();
    }

    addItem(item) {
        let isIn = false;
        const cartItem = new CartItem(item, 1);
        if (this.cartItems.length == 0) {
            this.cartItems.push(cartItem);
        } else {
            let i = 0;
            for (i; i < this.cartItems.length; i++) {
                if (this.cartItems[i].dish.dishName == cartItem.dish.dishName) {
                    isIn = true;
                    break;
                }
            }

            if (isIn) {
                    this.cartItems[i].incAmount();
                } else {
                    this.cartItems.push(cartItem);
                }
        }
        this.refresh();
    }

    removeItem(index) {
        this.cartItems.splice(index, 1);
        this.refresh();
    }

    empty() {
        for (let i = 0; i < this.cartItems.length; i++) {
            this.removeItem(i);
        }
        this.refresh();
    }

    decItem(index) {
        this.cartItems[index].decAmount();
        if (this.cartItems[index].amount == 0) {
            this.removeItem(index);
        }
    }

    order() {
        this.renderSummaryItems();
        this.renderSummarySum();
        this.clickSummary();
        this.clickOverlay();
        this.empty();
    }

    view() {
        document.querySelector('.cart-wrapper').style.display = 'flex';
        window.scrollTo(0,0);
    }

    unview() {
        if (window.innerWidth <= 1100) {
            document.querySelector('.cart-wrapper').style.display = 'none';
        }
    }
    // #endregion

    // #region Render
    renderItems() {
        const refTable = document.querySelectorAll('.cart-content table')[0];
        refTable.innerHTML = '';
        if (this.cartItems.length > 0) {
            this.cartItems.forEach (item => {
                const tr = document.createElement('tr');
                tr.innerHTML = Template.singleItem(item);
                refTable.appendChild(tr);
            })
        }
    }

    renderSum() {
        const refTable = document.querySelectorAll('.cart-content table')[0];
        const sumTr = document.createElement('tr');
        const deliveryTr = document.createElement('tr');
        const totalTr = document.createElement('tr');

        sumTr.innerHTML = Template.singleItemEntry('Summe', this.euroSum);
        deliveryTr.innerHTML = Template.singleItemEntry('Versand', this.euroDelivery);
        totalTr.innerHTML = Template.singleItemEntry('Gesamt', this.euroTotal);
        totalTr.classList.add('total');

        refTable.appendChild(sumTr);
        refTable.appendChild(deliveryTr);
        refTable.appendChild(totalTr);
    }

    renderSummaryItems() {
        const refTable = document.querySelector('.summary table');
        refTable.innerHTML = '';
        if (this.cartItems.length > 0) {
            this.cartItems.forEach(item => {
                const tr = document.createElement('tr');
                tr.innerHTML = Template.summarySingleItem(item);
                refTable.appendChild(tr);
            });
            document.querySelector('.overlay').classList.remove('d-none');
        }
    }

    renderSummarySum() {
        const refTable = document.querySelector('.summary table');
        const sumTr = document.createElement('tr');
        const deliveryTr = document.createElement('tr');
        const totalTr = document.createElement('tr');

        sumTr.innerHTML = Template.summarySingleEntry('Summe', this.euroSum);
        deliveryTr.innerHTML = Template.summarySingleEntry('Versand', this.euroDelivery);
        totalTr.innerHTML = Template.summarySingleEntry('Gesamt', this.euroTotal);
        totalTr.classList.add('total');

        refTable.appendChild(sumTr);
        refTable.appendChild(deliveryTr);
        refTable.appendChild(totalTr);
    }
    // #endregion

    // #region Event
    clickOrderBtn() {
        const refOrderBtn = document.querySelector('.order-btn');

        if (this.sum > 10) {
            if (!this.orderReady) {
                this.orderReady = true;
                refOrderBtn.classList.add('order-ready');
                refOrderBtn.addEventListener('click', () => {
                    this.order();
                });
            }
        } else {
            if (this.orderReady) {
                this.orderReady = false;
                refOrderBtn.classList.remove('order-ready');
                refOrderBtn.removeEventListener('click', this.order);
            }
        }
    }

    clickIncBtn() {
        const incBtns = document.querySelectorAll('.inc');
        if (this.cartItems.length > 0) {
            incBtns.forEach((btn, index) => {
                btn.addEventListener('click', () => {
                    this.cartItems[index].incAmount();
                    this.refresh();
                });
            });
        }
    }

    clickDecBtn() {
        const decBtns = document.querySelectorAll('.dec');
        if (this.cartItems.length > 0) {
            decBtns.forEach((btn, index) => {
                btn.addEventListener('click', () => {
                    this.decItem(index);
                })
            })
        }
    }

    clickDelBtn() {
        const delBtns = document.querySelectorAll('.del');
        if (this.cartItems.length > 0) {
            delBtns.forEach((btn, index) => {
                btn.addEventListener('click', () => {
                    this.removeItem(index);
                });
            });
        }
    }

    clickSummary() {
        document.querySelector('.summary').addEventListener('click', (e) => {
            e.stopPropagation();
        }) 
    }

    clickOverlay() {
        const refOverlay = document.querySelector('.overlay');
        refOverlay.addEventListener('click', () => {
            refOverlay.classList.add('d-none');
        });
    }
}