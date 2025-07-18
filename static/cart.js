import { Template } from './templates.js';

export class Cart {
    euroSum;
    euroDelivery;
    euroTotal;
    constructor(user, url) {
        this.items = [];
        this.sum = 0;
        this.delivery = 5;
        this.total = 5;
        this.orderReady = false;
        this.view = false;
        this.user = user;
        this.url = url;
        this.currency();
    }
    // #region Methods
    async sendOrder() {
        const payload = [];
        const refMain = document.querySelector('.render-main');
        const auth = `Bearer ${this.user.token}`

        this.items.forEach(item => {
            payload.push({
                name: item.item.dishName,
                amount: item.amount
            });
        });

        try {
            const response = await fetch(`${this.url}users/${this.user.id}/deliveries`, {
                method: 'POST',
                headers: {
                    "Content-Type":"application/json",
                    "Authorization": auth
                },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                this.renderSumary();
                this.closeSummaryEvent();
            } else {
                let msg = ''
                switch (response.status) {
                    case 401: 
                        mag = 'Der Nutzer ist nicht authorisiert.'
                        break;
                    case 403:
                        msg = 'Benutzer ist nicht eingeloggt.'
                        break;
                    case 404:
                        msg = 'Datenbank wurde nicht gefunden!.'
                }
                refMain.innerHTML = msg;
            }
        } catch (error) {
            console.error(error);
        }
    }
    // #region Item
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

    emptyCart () {
        if (this.items.length > 0) {
            this.items.forEach((item, i) => {
                this.delItem(i);
            });
        }
    }
    // #endregion
    // #region Calc
    calcSum() {
        let sum = 0;
        for (let i = 0; i < this.items.length; i++) {
            sum += this.items[i].item.price * this.items[i].amount;
        }
        this.sum = sum;
        this.delivery = (sum < 20) ? 5 : 0;
        this.total = sum + this.delivery;
        this.orderReady = (sum > 10) ? true : false;
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
        const cartWrapper = document.querySelector('.cart-wrapper')
        const refCartContent = document.querySelector('.cart-content');
        const refCartBtn = document.querySelector('.cart-btn');
        refCartContent.innerHTML = Template.cartContent(this.euroSum, this.euroDelivery, this.euroTotal);

        this.renderItems();
        this.readyToOrder();
        this.clickCartBtn();
        this.clickCart();

        if (this.items.length > 0 && (window.innerWidth > 1100 || this.view)) {
            cartWrapper.classList.remove('d-none');
        } else {
            cartWrapper.classList.add('d-none');
        }

        if (this.items.length > 0) {
            refCartBtn.classList.remove('d-none');
        } else {
            refCartBtn.classList.add('d-none');
        }
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

    renderSumary() {
        const refOverlay = document.querySelector('.overlay');
        const cartWrapper = document.querySelector('.cart-wrapper');
        const refSummary = document.querySelector('.summary');
        refSummary.innerHTML = Template.summary();
        const refSumTable = document.querySelector('.summary table');
        this.items.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = Template.summarySingleItem(item);
            refSumTable.appendChild(tr);
        });

        const delivery = document.createElement('tr');
        delivery.innerHTML = Template.summarySingleEntry('Versand', this.euroDelivery);
        refSumTable.appendChild(delivery);

        const total = document.createElement('tr');
        total.innerHTML = Template.summarySingleEntry('Gesamt', this.euroTotal);
        total.classList.add('total');
        refSumTable.appendChild(total);

        cartWrapper.classList.add('d-none');
        refOverlay.classList.remove('d-none');
    }
    // #endregion
    // #region Event
    addCartItemActions() {
        const incBtns = document.querySelectorAll('.inc');
        const decBtns = document.querySelectorAll('.dec');
        const delBtns = document.querySelectorAll('.del');
        
        incBtns.forEach((btn, i) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.incItem(i);
            });
        });
        decBtns.forEach((btn, i) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(e);
                this.decItem(i);
            });
        });
        delBtns.forEach((btn, i) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.delItem(i);
            });
        });
    }

    readyToOrder() {
        const orderBtn = document.querySelector('.order-btn');

        if (this.orderReady) {
            orderBtn.classList.add('order-ready');
            orderBtn.addEventListener('click', () => {
                this.sendOrder();
            });
        } else {
            orderBtn.classList.remove('order-ready');
        }
    }

    closeSummaryEvent() {
        const refOverlay = document.querySelector('.overlay');
        const refSummary = document.querySelector('.summary');

        refSummary.addEventListener('click', (e) => {
            e.stopPropagation();
            this.emptyCart();
        });
        refOverlay.addEventListener('click', () => {
            refOverlay.classList.add('d-none');
        })
    }

    clickCartBtn() {
        const refCartBtn = document.querySelector('.cart-btn');
        refCartBtn.addEventListener('click', () => {
            this.view = true;
            this.renderCartContentWrapper();
            window.scrollTo(0,0);
        });
    }

    clickCart() {
        const refCartWrapper = document.querySelector('.cart-wrapper');
        if (window.innerWidth <= 1100) {
            refCartWrapper.addEventListener('click', () => {
            this.view = false;
            this.renderCartContentWrapper();
        })
        }
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