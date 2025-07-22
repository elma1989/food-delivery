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
        this.calc;
    }
}

export class Cart{
    //  #region Attibutes
    sum = 0;
    euroSum = '0,00 €';
    delivery = 5;
    euroDelivery = '5,00 €';
    total = 0;
    euroTotal = '5,00 €';
    cartItems = []
    // #endregion

    constructor() {
        this.renderSum();
    }

    // #region Methods
    calc() {
        if (this.cartItems.length > 0) {
            this.sum = 0;

            this.cartItems.forEach(item =>{
                this.sum += item.value;
            });
            this.delivery = (this.sum < 20) ? 5 : 0;
            this.total = this.sum + this.delivery;

            this.euroSum = new Intl.NumberFormat('de-DE', {style:'currency', currency:'EUR'}).format(this.sum);
            this.euroDelivery = new Intl.NumberFormat('de-DE', {style:'currency', currency:'EUR'}).format(this.delivery);
            this.euroTotal = new Intl.NumberFormat('de-DE', {style:'currency', currency:'EUR'}).format(this.total);
        }
    }

    // #Render
    renderSum() {
        const refTable = document.querySelectorAll('.cart-content table')[1];
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
}